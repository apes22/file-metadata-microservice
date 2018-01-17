const router = require('express').Router();
const path = require('path');
const bodyParser = require('body-parser');
const multer  = require('multer');
const upload = multer({dest: './public/uploads/',
                      limits: {fileSize: 10000000, files:1},
                      });

/*https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Sending_forms_through_JavaScript*/
/* https://www.terlici.com/2015/05/16/uploading-files-locally.html*/
/* https://pqina.nl/filepond/ */
/* http://www.dropzonejs.com/#installation */
router.route('/get-file-size/')
// req.body will hold the text fields, if there were any 
.post( upload.single('file'), function (req, res, next) {
  // req.file is the `avatar` file 
  let fileInfo = {
    "file_name": req.file.originalname,
    "file_size": `${req.file.size} bytes`
  };
  res.json(fileInfo);
})

module.exports = router;