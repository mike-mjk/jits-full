const path = require('path');
const express = require('express');

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
// app.use(bodyParser.json());
// app.use(express.static('build'));

// API endpoints go here!
// Routes ------------------------------------
const Video = require('./models/model_video');
//added /api to all of these routes
app.get('/api/videos', function(req, res){
    Video.find().sort({ _id: 'desc' }).exec(function(err, videos) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.json(videos);
    });
});

app.post('/api/signinserver', requireSignin, Authentication.signin);
app.post('/api/signupserver', Authentication.signup);

app.post('/api/videos', function(req, res){
    Video.create({
        id: req.body.id,
        title: req.body.title,
        channelTitle: req.body.channelTitle,
        thumbnail: req.body.thumbnail,
        description: req.body.description,
        tags: req.body.tags
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
//
mongoose.connect(config.DATABASE_URL, function(err) {
    if (err && callback) {
        return callback(err);
    }

    // app.listen(config.PORT, function() {
    //     console.log('Listening on localhost:' + config.PORT);
    //     if (callback) {
    //         callback();
    //     }
    // });
});

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
