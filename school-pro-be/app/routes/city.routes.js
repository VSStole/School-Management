const express = require('express');

const cityController= require("../controllers/city.controller.js");
 const router = express.Router();

router.get('/', cityController.getAllCity);

router.post('/', cityController.postCity);

router.put('/:zip_code', cityController.putCity);

router.delete('/:zip_code', cityController.deleteCity);

module.exports = router;

