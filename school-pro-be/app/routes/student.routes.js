const express = require('express');
const studentController = require("../controllers/student.controller.js");
//const router = require("express").Router();
const router = express.Router();

router.get('/', studentController.getAllStudent);

router.post('/', studentController.postStudent);

router.put('/:id', studentController.putStudent);

router.delete('/:id', studentController.deleteStudent);

module.exports = router;

