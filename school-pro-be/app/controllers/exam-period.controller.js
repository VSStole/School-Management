const Examperiod=require('../models/exam-period.model');

exports.getAllExamperiod = async (req, res, next) => {
  try {
    const [allExamperiod] = await Examperiod.fetchAll();
    res.status(200).json(allExamperiod);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postExamperiod = async (req, res, next) => {
  try {
    const postResponse = await Examperiod.post(req.body.name, req.body.startexam, req.body.finishexam, req.body.quarter);
    res.status(201).json(postResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.putExamperiod = async (req, res, next) => {
  try {
    const putResponse = await Examperiod.update(req.body.id, req.body.name, req.body.startexam, req.body.finishexam, req.body.quarter );
    res.status(200).json(putResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteExamperiod = async (req, res, next) => {
  try {
    const deleteResponse = await Examperiod.delete(req.params.id);
    res.status(200).json(deleteResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};