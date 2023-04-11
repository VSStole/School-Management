const Student=require('../models/student.model.js');

exports.getAllStudent = async (req, res, next) => {
  try {
    const [allStudent] = await Student.fetchAll();
    res.status(200).json(allStudent);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postStudent = async (req, res, next) => {
  try {
    const postResponse = await Student.post(req.body.indexNumber, req.body.indexYear, req.body.firstName, req.body.lastName,
       req.body.email, req.body.adress, req.body.city, req.body.currentYearOfStudy);
    res.status(201).json(postResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.putStudent = async (req, res, next) => {
  try {
    const putResponse = await Student.update(req.body.id,req.body.indexNumber, req.body.indexYear, req.body.firstName, req.body.lastName,
      req.body.email, req.body.adress, req.body.city, req.body.currentYearOfStudy );
    res.status(200).json(putResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteStudent = async (req, res, next) => {
  try {
    const deleteResponse = await Student.delete(req.params.id);
    res.status(200).json(deleteResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};