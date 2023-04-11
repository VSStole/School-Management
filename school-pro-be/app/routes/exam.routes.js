const express = require('express');
const examController = require("../controllers/exam.controller.js");
 const router = express.Router();

router.get('/',examController.getAllExam);

router.post('/',examController.postExam);

router.put('/:id',examController.putExam);

router.delete('/:id',examController.deleteExam);

module.exports = router;
