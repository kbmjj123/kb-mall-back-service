const userRouter = require('./userRouter');

module.exports = app => {
    app.use('/users', userRouter)
}