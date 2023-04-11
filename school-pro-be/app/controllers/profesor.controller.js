const Profesor=require('../models/profesor.model.js');

exports.getAllProfesor = async (req, res, next) => {
  try {
    const [allProfesor] = await Profesor.fetchAll();
    res.status(200).json(allProfesor);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postProfesor = async (req, res, next) => {
  try {
    const postResponse = await Profesor.post(req.body.firstName, req.body.lastName, req.body.email, req.body.adress, req.body.city, req.body.phone, req.body.reelectionDate, req.body.title, req.body.subject);
    res.status(201).json(postResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.putProfesor = async (req, res, next) => {
  try {
    const putResponse = await Profesor.update(req.body.id, req.body.firstName, req.body.lastName, req.body.email, req.body.adress, req.body.city, req.body.phone, req.body.reelectionDate, req.body.title, req.body.subject);
    res.status(200).json(putResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteProfesor = async (req, res, next) => {
  try {
    const deleteResponse = await Profesor.delete(req.params.id);
    res.status(200).json(deleteResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};