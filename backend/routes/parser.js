const express = require('express');
const router = express.Router();
require('../controllers/showdown');

router.post('/', (req, res) => {
	const resquestData = req.body;
	let parser = new Showdown.converter();
	const html = parser.makeHtml(resquestData.markdown);
	res.send({ html });
});

module.exports = router;