var express = require('express');
const multer = require('multer')
var router = express.Router();
let authController = require('../Controller/authController')
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

// router.get('/', function (req, res, next) {
//   res.render('index', { title: "Express" })
// })

router.post('/login', authController.loginAdmin)

router.get('/allrecruiter', authController.protectAdmin, adminController.allRecruiter)
router.get('/allseeker', authController.protectAdmin, adminController.allSeeker)

router.get('/alljobs', authController.protectAdmin, adminController.allJobs)

router.post('/addadmin', authController.protectAdmin, adminController.addAdmin)
router.get('/deleteadmin', authController.protectAdmin, adminController.deleteAdmin)

module.exports = router;