exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                      'mongodb://shane:weickum23@ds149049.mlab.com:49049/user';
exports.PORT = process.env.PORT || 8080;

exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL ||
                            'mongodb://shane:weickum23@ds149049.mlab.com:49049/user';

