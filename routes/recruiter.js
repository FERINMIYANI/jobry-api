var express = require('express');
const multer = require('multer')
var router = express.Router();
let recruiterController = require('../Controller/recruiterController')
let seekerController = require('../Controller/seekerController')
let adminController = require('../Controller/adminController')


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
  }
})

const upload = multer({ storage: storage })



// -----------------------------------------------------account--------------------------------------

router.post('/addrecruiter', recruiterController.addRecruiter);
router.post('/updaterecruiter', upload.single('logo'), recruiterController.updateRecruiter);
router.get('/deleterecruiter', recruiterController.deleteRecruiter);

// ------------------------------------job-----------------------------------

router.post('/postjob', recruiterController.postJob)
router.post('/updatejob', recruiterController.updateJob)
router.get('/deletejob', recruiterController.deleteJob)

module.exports = router;