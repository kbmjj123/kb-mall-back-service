const userRouter = require('./user-router');
const commonRouter = require('./common-router');
const fileUploadRouter = require('./file-upload-router');

module.exports = app => {
    app.use('/', commonRouter);
    app.use('/users', userRouter);
    app.use('/files', fileUploadRouter);
}