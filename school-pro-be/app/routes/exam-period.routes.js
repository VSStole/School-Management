const express = require('express');
const examperiodController = require("../controllers/exam-period.controller.js");
 const router = express.Router();

router.get('/', examperiodController.getAllExamperiod);

router.post('/', examperiodController.postExamperiod);

router.put('/:id', examperiodController.putExamperiod);

router.delete('/:id', examperiodController.deleteExamperiod);

module.exports = router;
