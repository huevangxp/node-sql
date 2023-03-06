const userController = require('../controller/userController');
const {upload} = require('../controller/uploadImage')

module.exports = (app) => {
    app.post('/register', upload.single('file') , userController.register)
    app.post('/user', userController.getUser)
    app.get('/user',userController.selectUser)
    app.get('/user/:id',userController.selectOneUser)
}