const Exam=require('../models/exam.model.js');

exports.getAllExam = async (req, res, next) => {
  try {
    const [allExam] = await Exam.fetchAll();
    res.status(200).json(allExam);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postExam = async (req, res, next) => {
  try {
    const postResponse = await Exam.post(req.body.subject,req.body.profesor,req.body.student,req.body.examperiod,req.body.city,req.body.dateOfExam);
    res.status(201).json(postResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
 exports.putExam = async (req, res, next) => {
  try {
    const putResponse = await Exam.update(req.body.id, req.body.subject, req.body.profesor, req.body.student, req.body.examperiod, req.body.city, req.body.dateOfExam);
    res.status(200).json(putResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteExam = async (req, res, next) => {
  try {
    const deleteResponse = await Exam.delete(req.params.id);
    res.status(200).json(deleteResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};