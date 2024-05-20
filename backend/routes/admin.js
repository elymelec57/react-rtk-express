var express = require('express');
var router = express.Router();

const { validateTokenAdmin } = require('../middlewares/validateTokenAdmin');
const adminController = require('../controllers/admin.controller');

const user = require('../models').User;
const employes = require('../models').Employe;

router.get('/login', adminController.viewLogin);

router.post('/login', adminController.loginAdmin);

router.get('/logout',adminController.logout);

router.get('/dahsboard', validateTokenAdmin, adminController.index);

router.get('/usuarios', validateTokenAdmin,  adminController.getUsers);

router.get('/empleados', validateTokenAdmin, adminController.getEmployes);
  
router.get('/register', adminController.viewRegister);

router.post('/register', adminController.registerAdmin);

router.get('/user/delete/:id', validateTokenAdmin, adminController.deleteUser);

router.get('/employe/delete/:id', validateTokenAdmin, adminController.deleteEmployes);

router.get('/user/edit/:id', validateTokenAdmin, adminController.EditUser);

router.get('/employe/edit/:id', validateTokenAdmin, adminController.editEmploye);

router.post('/user/update', validateTokenAdmin, adminController.updateUser);

router.post('/employe/update', validateTokenAdmin, adminController.updateEmploye);

module.exports = router;