const express = requires('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("aa00");
});

module.exports = router;