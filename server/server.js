const path = require("path");
const public_path = path.join(__dirname, "..", "/public");
const express = require("express");
const port = process.env.PORT || 3000;

const app = express();
app.use(express.static(public_path));


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});