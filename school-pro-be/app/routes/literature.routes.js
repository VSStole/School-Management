const express = require('express');
const literatureController = require("../controllers/literature.controller.js");
 const router = express.Router();

router.get('/', literatureController.getAllLiterature);

router.post('/', literatureController.postLiterature);

router.put('/:id', literatureController.putLiterature);

router.delete('/:id', literatureController.deleteLiterature);

module.exports = router;

