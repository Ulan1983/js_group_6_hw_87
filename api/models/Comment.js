const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
	user: {
		type: Schema.Types.ObjectID,
		ref: 'User',
		required: true
	},
	comment: {
		type: String,
		required: true
	}
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;