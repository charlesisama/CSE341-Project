const express = require("express");
const app = express();

const database = require("./data/database");

app.use(express.json());

app.use("/", require("./routes"));

const port = process.env.PORT || 3000;

database
    .initDb()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error("Failed to start server:", error);
    });