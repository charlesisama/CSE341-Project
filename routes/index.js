const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("Hello World, this is the Contacts API!");
});
router.use("/contacts", require("./contacts"));
router.use("/api-docs", require("./swagger"));

module.exports = router;