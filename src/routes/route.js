const express = require('express');
const multer = require('multer');

const { CreateUser, otpVerification, UserLogIn } = require('../controller/userController')
const { AddProduct,GetAllProducts  ,UpdateProduct,DeleteProduct } = require('../controller/productController')
const { AdminLogIn, AdminOTPVerification ,} =require('../controller/AdminController')
const { validUser, validUserLog } = require('../middewale/AllAuth')


const router = express.Router();

const storage = multer.memoryStorage(); 
const upload = multer({ storage });
  

router.post('/CreateUser', upload.single('profileImg'), validUser, CreateUser)
router.post('/otpVerification/:userId', otpVerification)
router.post('/UserLogIn', validUserLog, UserLogIn)
router.post('/AdminLogIn', validUserLog, AdminLogIn)
router.post('/AdminOTPVerification/:id', AdminOTPVerification)

router.post("/AddProduct", upload.single("Car_img"), AddProduct);
router.get("/GetAllProducts", GetAllProducts);
router.put("/UpdateProduct/:productId", upload.single("Car_img"), UpdateProduct);
router.delete("/DeleteProduct/:productId", DeleteProduct);

router.all('/*', (req, res) => { return res.status(404).send({ status: false, msg: 'Invalid URL' }) })

module.exports = router;



