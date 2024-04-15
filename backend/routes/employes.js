const express = require("express");
const router = express.Router();
const employeController = require('../controllers/employes.controller');

const { validateToken } = require('../middlewares/validateToken');

/* Optener todos los empleados. */
router.get("/", validateToken, employeController.getEmployes);

// Crear un empleado nuevo
router.post("/crearEmpleado", validateToken, employeController.createEmployes);

// codigo para editar a un empleado
router.put("/updateEmpleado/:id", validateToken, employeController.updateEmployes );

/* Eliminar empleado. */
router.delete("/eliminarEmpleado/:id", validateToken, employeController.deleteEmployes);

module.exports = router;