var mongoose = require('mongoose');

var noteSchema = new mongoose.Schema({
	title:{
		type: String,
		require: true
	},
	content:{
		type: String,
		require: true
	}
},{usePushEach: true});

var noteTagSchema = new mongoose.Schema({
	tagName:{
		type: String,
		require: true
	},
	notes:[noteSchema]
},{usePushEach: true});

var subjectSchema = new mongoose.Schema({
	subject:{
		type: String,
		required: true
	},
	tagNotes:[noteTagSchema]
},{usePushEach: true});

mongoose.model('Note', subjectSchema);