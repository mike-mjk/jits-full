const path = require('path');
const express = require('express');

const _ = require('lodash');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = Promise;

const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

//config file was in my original server, unclear how this will work in this starter
const config = require('./config');

const app = express();
//following two lines were in my original server, unclear how to integrate
app.use(bodyParser.json());
// app.use(express.static('build'));

// API endpoints go here!
// Routes ------------------------------------
const Video = require('./models/model_video');
const User = require('./models/user');

app.get('/api/getuser', function(req, res) {
    User.findOne({ username: req.query.id })
    .then(user => {
        console.log(user);
        res.json(user);
    });
});

//like related routes
app.get('/api/islikedbyme', requireAuth, function(req, res) {
    User.findOne({ username: req.user.username })
        .then((user) => {
            const isLiked = (req.query.id in user.likedVideos);   
            res.json(isLiked);
        });

});
//devquestion run find video and find user simultaneously??
//devquestion the "lodashed video" has an undefined: true key value pair
app.get('/api/addtoliked', requireAuth, function(req, res) {
    Video.findOne({ id: req.query.id })
    .then(video => {
        //
        User.update(
            {username: req.user.username },
            {$set: {displayName: 'd mike'}}, 
            function(err, result) {
                if (err) {
                    console.log('err');
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err, req, res)
                    });
                }
            }
        );
        // User.findOne({ username: req.user.username })
        // .then(user => {

        //     video = _.mapKeys(video, 'id');
        //     delete video[req.query.id]._id;
        //     user.likedVideos[req.query.id] = video[req.query.id]
        //     // console.log('user.likedVideos', user.likedVideos);

        //     console.log('updated', updated);
        //     user.update({ likedVideos: }, function(err, result) {
        //         if (err) {
        //             console.log('err');
        //             return res.status(400).send({
        //                 message: errorHandler.getErrorMessage(err, req, res)
        //             });
        //         }
        //     })
        //     // user.markModified('likedVideos');
        //     // user.save();
        //     res.json('video was liked');
        // })
    });
});



app.get('/api/removefromliked', requireAuth, function(req, res) {
    Video.findOne({ id: req.query.id })
        .then(video => {
            User.findOne({ username: req.user.username })
                .then(user => {
                    // video = _.mapKeys(video, 'id');
                    // delete video[req.query.id]._id;
                    delete user.likedVideos[req.query.id]
                    console.log('user', user);
                    // user.likedVideos[req.query.id] = video[req.query.id]
                    user.markModified('likedVideos');
                    user.save();
                    res.json('video was removed from liked videos');
                })
        });
});



app.get('/api/numberoflikes', function(req, res) {
    Video.findOne({ id: req.query.id })
        .then((video) => {
            res.json(video.likes)
        });
});

app.get('/api/incrementlikes', function(req, res) {
    Video.findOne({ id: req.query.id })
        .then((video) => {
          video.likes = video.likes + 1;
          //is video.save async???
          video.save();
          res.json(video.likes);
        });
});

app.get('/api/decrementlikes', function(req, res) {
    Video.findOne({ id: req.query.id })
        .then((video) => {
          video.likes = video.likes - 1;
          //is video.save async???
          video.save();
          res.json(video.likes);
        });
});

//auth routes
//route to get users display name
app.get('/api/displayName', requireAuth, function(req, res) {
    User.findOne({ username: req.user.username })
    .then((user) => {
        res.json({displayName: user.displayName, username: user.username});   
    });
    // res.json(req.user.username);

});

app.get('/api/username', requireAuth, function(req, res) {
    User.findOne({ username: req.user.username })
    .then((user) => {
        res.json(user.username);   
    });
});

app.get('/api/getusernamedisplaynameobj', function(req, res) {
    User.find({})
    .then(users => {
        let usernameDisplayNameObj = {};
        users.map(user => {
          usernameDisplayNameObj[user.username] = user.displayName;
        });
        res.json(usernameDisplayNameObj);
    });
});


app.post('/api/signinserver', requireSignin, Authentication.signin);
app.post('/api/signupserver', Authentication.signup);

app.get('/api/authcheck', requireAuth, function(req,res) {
    console.log('authcheck hit');
    res.json('logged in');
});

//not auth routes
app.get('/api/videos', function(req, res){
    console.log('/api/videos hit in server');
    Video.find().sort({ _id: 'desc' }).exec(function(err, videos) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.json(videos);
    });
});


app.post('/api/videos', function(req, res){
    Video.create({
        id: req.body.id,
        title: req.body.title,
        channelTitle: req.body.channelTitle,
        thumbnail: req.body.thumbnail,
        description: req.body.description,
        tags: req.body.tags,
        addedBy: req.body.addedBy,
        likes: 0,
        category: req.body.category

    }, function(err, video) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(201).json(video);
    });
});

app.put('/api/videos/:id/:field', function(req, res) {
    if (req.params.field == 'description') {
        Video.findOne({ id: req.params.id }, function (err, video){
          video.userDescription = req.body.description;
          video.save();
});
    }
    res.status(201).json({updated: true});
});

app.get('/api/videos/:id', function(req, res) {
    Video.findOne({id: req.params.id}, function(err, video) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(201).json(video);
    });
});

app.delete('/api/videos/:id', function(req, res) {
    console.log('delete ran');
    Video.remove({id: req.params.id}, function(err, item) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(201).json(item);
    });
});
//This was for using mustache... commmented while moving to react. delete later.
// app.get('/api/watch/:id', function(req, res){
//     res.render('video.html', {
//         videoID: req.params.id,
//         curly: "{{"
//     });
// });
//-------------------------------------------------


// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
app.get(/^(?!\/api(\/|$))/, (req, res) => {
    const index = path.resolve(__dirname, '../client/build', 'index.html');
    res.sendFile(index);
});
//, function(err)
mongoose.connect(config.DATABASE_URL);
 // {
 //    // if (err && callback) {
 //        // return callback(err);
 //    // }
// });

let server;
function runServer(port=3090) {
    return new Promise((resolve, reject) => {
        server = app.listen(port, () => {
            resolve();
        }).on('error', reject);
    });
}

function closeServer() {
    return new Promise((resolve, reject) => {
        server.close(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}

if (require.main === module) {
    runServer();
}

module.exports = {
    app, runServer, closeServer
};
