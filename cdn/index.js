const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("cdn/public"));

app.listen(3000, () => {
    console.log(`CDN Running on port ${port}`);
});