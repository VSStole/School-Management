const City=require('../models/city.model');

exports.getAllCity = async (req, res, next) => {
  try {
    const [allCity] = await City.fetchAll();
    res.status(200).json(allCity);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postCity = async (req, res, next) => {
  try {
    const postResponse = await City.post(req.body.zip_code,req.body.name);
    res.status(201).json(postResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.putCity = async (req, res, next) => {
  try {
    const putResponse = await City.update(req.body.zip_code, req.body.name);
    res.status(200).json(putResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteCity = async (req, res, next) => {
  try {
    const deleteResponse = await City.delete(req.params.zip_code);
    res.status(200).json(deleteResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};