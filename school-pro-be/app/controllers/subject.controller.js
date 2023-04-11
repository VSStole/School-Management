const Subject=require('../models/subject.model');

exports.getAllSubject = async (req, res, next) => {
  try {
    const [allSubject] = await Subject.fetchAll();
    res.status(200).json(allSubject);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postSubject = async (req, res, next) => {
  try {
    const postResponse = await Subject.post(req.body.name,req.body.description,req.body.noOfESP,req.body.yearOfStudy,req.body.semester);
    res.status(201).json(postResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
// name,description,noOfESP,yearOfStudy,semester
exports.putSubject = async (req, res, next) => {
  try {
    const putResponse = await Subject.update(req.body.id,req.body.name,req.body.description,req.body.noOfESP,req.body.yearOfStudy,req.body.semester );
    res.status(200).json(putResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteSubject = async (req, res, next) => {
  try {
    const deleteResponse = await Subject.delete(req.params.id);
    res.status(200).json(deleteResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};