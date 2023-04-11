 const Grade=require('../models/grade.model');

exports.getAllGrade = async (req, res, next) => {
  try {
    const [allGrade] = await Grade.fetchAll();
    res.status(200).json(allGrade);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postGrade = async (req, res, next) => {
  try {
    const postResponse = await Grade.post(req.body.student,req.body.subject,req.body.profesor,req.body.grade);
    res.status(201).json(postResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
// name,description,noOfESP,yearOfStudy,semester
exports.putGrade = async (req, res, next) => {
  try {
    const putResponse = await Grade.update(req.body.id,req.body.student,req.body.subject,req.body.profesor,req.body.grade );
    res.status(200).json(putResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteGrade = async (req, res, next) => {
  try {
    const deleteResponse = await Grade.delete(req.params.id);
    res.status(200).json(deleteResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};