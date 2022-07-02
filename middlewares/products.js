const multer = require('multer');
const whiteList = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/products');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (whiteList.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed'));
    }
  },
});

const uploadImageMiddleware = upload.single('image');

module.exports = uploadImageMiddleware;
