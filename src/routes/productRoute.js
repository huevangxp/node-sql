const productController = require('../controller/productController')
const {upload, uploads, uploadFile} = require('../controller/uploadImage')

module.exports = (app) => {
    app.get('/product', productController.getProduct);
    app.post('/upload-image', upload.single('file'), productController.uploadImage);
    app.post('/upload-images', upload.array('files'), productController.uploadArrayImages);
    app.get('/image', productController.getImage);
    app.post('/document', uploadFile.single('document') ,productController.document);
}