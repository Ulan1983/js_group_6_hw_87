const path = require('path');

const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');

const config = require('../config');
const auth = require('../middleware/auth');

const Post = require('../models/Post');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, config.uploadPath);
	},
	filename: (req, file, cb) => {
		cb(null, nanoid() + path.extname(file.originalname));
	}
});

const upload = multer({storage});

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const posts = await Post.find().populate('user').sort({datetime: -1});

		if (!posts) {
			return res.status(404).send({message: "Not found!"});
		}

		res.send(posts);
	} catch (e) {
		return res.status(400).send(e);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const post = await Post.findById(req.params.id).populate('user');

		if (!post) {
			return res.status(404).send({message: "Not found!"});
		}

		return res.send(post);
	} catch (e) {
		return res.status(404).send({message: "Not found!"});
	}
});

router.post('/', upload.single('image'), auth, async (req, res) => {
	const postData = req.body;

	if (req.file) {
		postData.image = req.file.filename;
	}

	if (!postData.image && !postData.description) {
		return res.status(400).send({error: 'Please add image or description!'})
	}

	postData.user = req.user._id;
	postData.datetime = new Date().toLocaleString();

	const post = new Post(postData);

	try {
		await post.save();

		return res.send(post);
	} catch (e) {
		return res.status(400).send(e);
	}
});

module.exports = router;