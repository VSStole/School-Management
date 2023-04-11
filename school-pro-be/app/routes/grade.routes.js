const express = require('express');
const gradeController = require("../controllers/grade.controller.js");
 const router = express.Router();

router.get('/', gradeController.getAllGrade);

router.post('/', gradeController.postGrade);

router.put('/:id', gradeController.putGrade);

router.delete('/:id', gradeController.deleteGrade);

module.exports = router;