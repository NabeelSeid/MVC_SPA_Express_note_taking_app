var express = require('express');
var router = express.Router();
var ctrlNote = require("../controllers/note_controller");

router.get('/', ctrlNote.renderHomepage);

module.exports = router;
