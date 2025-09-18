const express = require("express");
import second from ''

const router = express.Router();

router.post("/upload", uploadNote);