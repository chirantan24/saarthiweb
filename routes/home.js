const express = require('express')
const router = express.Router()

const {home,upload} = require("../controllers/homeController")
router.route("/").get(home);
router.route("/upload").get(upload);
module.exports = router;