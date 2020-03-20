const express = require('express');

const auth = require('../middleware/auth');
const Comment = require('../models/Comment');

const router = express.Router();

router.post('/', auth, async (req, res) => {
	const commentData = req.body;
	commentData.user = req.user._id;

	const comment = new Comment(commentData);
	try {
		await comment.save();

		return res.send(comment);
	} catch (e) {
		return res.status(400).send(e);
	}
});

module.exports = router;