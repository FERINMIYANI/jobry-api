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


router.get('/allrecruiter', adminController.allRecruiter)
router.get('/allseeker', adminController.allSeeker)

router.get('/alljobs', adminController.allJobs)

router.post('/addadmin', adminController.addAdmin)
router.get('/deleteadmin', adminController.deleteAdmin)

module.exports = router;