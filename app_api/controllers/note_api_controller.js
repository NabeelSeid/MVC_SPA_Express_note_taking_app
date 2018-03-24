var mongoose = require('mongoose');
var Note = mongoose.model('Note');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.subjectCreate = function(req, res, next) {
	Note.create({
		subject: req.body.subject
  	}, function(err, location) {
  	  if (err) {
   	   console.log(err);
   	   sendJSONresponse(res, 400, err);
   	 } else {
   	   console.log(location);
   	   sendJSONresponse(res, 200, location);
   	 }
  	});
}

module.exports.subjectRead = function(req, res, next){
	var param = {};
	if(req.params.subject != "all"){
		param = {subject:req.params.subject}
	}

	Note.find(param).exec(function(err, note){
		if(err){
			sendJSONresponse(res, 500, err);
		} else if(note.length > 0){
			sendJSONresponse(res, 200, note);
		} else if(note.length == 0){
			sendJSONresponse(res, 404, {msg: "Subject Not Found"});
		}
	});
}

module.exports.createTag = function(req, res) {
  if (req.body.subjectId) {
    Note
      .findById(req.body.subjectId)
      .select('tagNotes')
      .exec(
        function(err, note) {
          if (err) {
            sendJSONresponse(res, 400, err);
          } else {
            if (!note) {
				sendJSONresponse(res, 404, "SubjectId not found");
			} else {
				note.tagNotes.push({
					tagName:req.body.tag
				});

				note.save(function(err, note){
					var thisNote;
	      			if (err) {
						sendJSONresponse(res, 400, err);
	     			} else {
	      				thisNote = note.tagNotes;
	      				sendJSONresponse(res, 200, thisNote);
	      			}
				})
			}
          }
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "Not found, subjectId required"
    });
  }
};

module.exports.subjectTagRead = function(req, res, next){

	Note.find({subject:req.params.subject}).exec(function(err, note){
		var tagedNotes;
		if(err){
			sendJSONresponse(res, 500, err);
		} else if(note.length > 0){
			if(req.params.tag != "all"){ 
				tagedNotes = note.tagNotes;
			} else {
				tagedNotes = note;
			}
			sendJSONresponse(res, 200, note);
		} else if(note.length == 0){
			sendJSONresponse(res, 404, {msg: "Subject Not Found"});
		}
	});
} 

module.exports.createNote = function(req, res, next){
	if (req.body.subjectId) {
    Note
      .findById(req.body.subjectId)
      .select('tagNotes')
      .exec(
        function(err, note) {
          if (err) {
            sendJSONresponse(res, 400, err);
          } else {
            if (!note) {
				sendJSONresponse(res, 404, "SubjectId not found");
			} else {
				note.tagNotes.id(req.body.tagId).notes.push({
					title: req.body.title,
					content: req.body.content
				});

				note.save(function(err, note){
					var thisNote;
	      			if (err) {
						sendJSONresponse(res, 400, err);
	     			} else {
	      				thisNote = note.tagNotes;
	      				sendJSONresponse(res, 200, thisNote);
	      			}
				})
			}
          }
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "Not found, subjectId required"
    });
  }
}