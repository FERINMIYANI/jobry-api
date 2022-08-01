var express = require('express');
const multer = require('multer')
var router = express.Router();
let recruiterController = require('../Controller/recruiterController')
let authController = require('../Controller/authController')


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

// ------------------------------------------------------------------------LOGIN------------------------------------

router.post('/login', authController.loginRecruiter)
router.post('/changepassword', authController.protectRecruiter)

// -----------------------------------------------------account--------------------------------------

router.post('/addrecruiter', authController.protectRecruiter, recruiterController.addRecruiter);
router.post('/updaterecruiter', authController.protectRecruiter, upload.single('logo'), recruiterController.updateRecruiter);
router.get('/deleterecruiter', authController.protectRecruiter, recruiterController.deleteRecruiter);

// ------------------------------------job-----------------------------------

router.post('/postjob', authController.protectRecruiter, recruiterController.postJob)
router.post('/updatejob', authController.protectRecruiter, recruiterController.updateJob)
router.get('/deletejob', authController.protectRecruiter, recruiterController.deleteJob)

module.exports = router;