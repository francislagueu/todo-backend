const express = require('express');
const Middleware = require('../middlewares/use.middleware');
const Error = require('../middlewares/error.middleware');
const UserRoute = require('../routes/user.route');
const listRoute = require('../routes/list.route');

module.exports = async () => {
    const app = express();
    const port = process.env.PORT;

    Middleware(app, express);
    require('../passport/passport');
    app.use('/users', UserRoute);
    app.use('/lists', listRoute);

    app.use(Error.NotFoundError);
    app.use(Error.ErrorHandler);

    await app.listen(port);
    console.log(`Application running at http://localhost:${port}`);
};
