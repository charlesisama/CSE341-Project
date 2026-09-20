const router = require("express").Router();


router.get("/", (req, res) => { 
    res.json({ message: "Hello, to Student Course Management API" });
});

router.use("/students", require("./students"));

router.use("/courses", require("./courses"));

module.exports = router;