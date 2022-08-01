var express = require('express');
const multer = require('multer')
var router = express.Router();
let seekerController = require('../Controller/seekerController')
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

router.post('/login', authController.loginEmployer)

router.post('/addSeeker', authController.protectEmployer, upload.single('image'), seekerController.addSeeker)
router.post('/updateSeeker', authController.protectEmployer, upload.single('image'), seekerController.updateSeeker)
router.get('/deleteSeeker', authController.protectEmployer, seekerController.deleteSeeker)

router.get('/seeker', authController.protectEmployer, seekerController.seeker)

router.post('/placebid', authController.protectEmployer, seekerController.placeBid)

router.post('/changepassword', authController.protectEmployer, seekerController.changePassword)

module.exports = router;