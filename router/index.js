const userRouter = require('./user-router');
const commonRouter = require('./common-router');

module.exports = app => {
    app.use('/', commonRouter);
    app.use('/users', userRouter)
}