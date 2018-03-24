var express = require('express');
var router = express.Router();
var ctrlNote = require('../controllers/note_api_controller');


router.get('/subject/:subject', ctrlNote.subjectRead);
router.post('/subject', ctrlNote.subjectCreate);

router.get('/subject/:subject/:tag', ctrlNote.subjectTagRead);
router.post('/subject/tag', ctrlNote.createTag);
router.post('/subject/note', ctrlNote.createNote);

module.exports = router;
