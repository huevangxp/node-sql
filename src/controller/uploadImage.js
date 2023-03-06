const path = require('path')
const multer = require('multer')



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
  });

exports.upload = multer({
    storage: storage
});

let storages = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
exports.uploads = multer({ storages: storages });

let storageFile = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './upload/')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
exports.uploadFile = multer({ storage: storageFile });