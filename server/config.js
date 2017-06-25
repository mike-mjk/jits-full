exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV === 'production' ?
                            'mongodb://mikeavida:password@ds115071.mlab.com:15071/heroku_m7klh9np' :
                            'mongodb://localhost/jiu-jitsu-dev');
exports.PORT = process.env.PORT || 8080;
