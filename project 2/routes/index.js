const router = require("express").Router();

const passport = require("passport");

router.get("/login", passport.authenticate("github"));

router.get("/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }

        req.session.destroy((err) => {
            if (err) {
                return next(err);
            }

            res.redirect("/api-docs");
        });
    });
});


router.get("/", (req, res) => { 
    res.json({ message: "Hello, to Student Course Management API" });
});

router.use("/students", require("./students"));

router.use("/courses", require("./courses"));

module.exports = router;