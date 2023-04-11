const Literature=require('../models/literature.model');

exports.getAllLiterature = async (req, res, next) => {
  try {
    const [allLiterature] = await Literature.fetchAll();
    res.status(200).json(allLiterature);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postLiterature = async (req, res, next) => {(req.body.name,req.body.author,req.body.profesor,req.body.issn);
  try {
    const postResponse = await Literature.post();
    res.status(201).json(postResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
// name,description,noOfESP,yearOfStudy,semester
exports.putLiterature = async (req, res, next) => {
  try {
    const putResponse = await Literature.update(req.body.id,req.body.name,req.body.author,req.body.profesor,req.body.issn);
    res.status(200).json(putResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteLiterature = async (req, res, next) => {
  try {
    const deleteResponse = await Literature.delete(req.params.id);
    res.status(200).json(deleteResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

 