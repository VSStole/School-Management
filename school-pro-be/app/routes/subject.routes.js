const express = require('express');
const subjectController = require("../controllers/subject.controller.js");
//const router = require("express").Router();
const router = express.Router();

router.get('/', subjectController.getAllSubject);

router.post('/', subjectController.postSubject);

router.put('/:id', subjectController.putSubject);

router.delete('/:id', subjectController.deleteSubject);

module.exports = router;

