const router = require('express').Router();


const { AuthController, HospitalController, PatientController, OrderController, CabController,DoctorController,CategoryController } = require('Controllers');
const { authMiddleware } = require('Middleware');

// Auth Routes
router.post('/login', AuthController.login);
router.post('/signup', AuthController.signup);

router.use(authMiddleware);

// Hospital Controllers
router.get('/hospital', HospitalController.getHospitalListing);
router.get('/hospital/nearyby', HospitalController.getNearyByHospitals);
router.get('/hospital/:hospitalId', HospitalController.getHospitalById);
router.post('/hospital', HospitalController.addHospital);

// Patient Controller
router.get('/patient', PatientController.getUserPatient);
router.post('/patient', PatientController.addPatient);
router.post('/patient/cab', PatientController.addPatientCab);

// Doctor Controller
router.post('/doctor',DoctorController.addDoctor);

// Cab Controller
router.post('/cab', CabController.addCab);

// Order Controller
router.post('/create-order',OrderController.createOrder);
router.post('/complete-order',OrderController.completeOrder);
router.get('/get-order-by-type',OrderController.getOrderByType);
router.get('/current-active-order',OrderController.getCurrentActiveOrder);

// Category Controller
router.get('/category',CategoryController.getCategoryListing);
router.post('/category',CategoryController.addCategory);

// Cab Controller
router.post('/cab',CabController.addCab);

module.exports = router;
