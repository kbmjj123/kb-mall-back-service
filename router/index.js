const userRouter = require('./user-router');
const commonRouter = require('./common-router');
const fileUploadRouter = require('./file-upload-router');
const productRouter = require('./product-router');
const orderRouter = require('./order-router');

module.exports = app => {
    app.use('/', commonRouter);
    app.use('/users', userRouter);
    app.use('/files', fileUploadRouter);
    app.use('/products', productRouter);
    app.use('/orders', orderRouter);
}