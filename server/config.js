exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV === 'production' ?
                            'mongodb://mikeavida:password@@ds137882.mlab.com:37882/heroku_qh2rggxx' :
                            'mongodb://localhost/jiu-jitsu-dev');
exports.PORT = process.env.PORT || 8080;
