const express = require('express');
const profesorController = require("../controllers/profesor.controller.js");
 const router = express.Router();

router.get('/', profesorController.getAllProfesor);

router.post('/', profesorController.postProfesor);

router.put('/:id', profesorController.putProfesor);

router.delete('/:id', profesorController.deleteProfesor);

module.exports = router;

