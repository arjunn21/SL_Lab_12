const express = require("express");
const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    book_name: String,
    issuer_name: String,
    due_date: String,
});
mongoose
    .connect(
        "mongodb+srv://Satya:EthanMongo@cluster0.qbo7l.mongodb.net/SL_Lab?retryWrites=true&w=majority"
    )
    .then(() => {
        console.log("Connected");
    });
const Doc = mongoose.model("Library", schema, "Lab12");
const app = express();
app.use(express.json());
let documents = new Array();
app.post("/", (req, res) => {
    documents = req.body.documents;
    res.send("Documents received!");
    for (let document of documents) {
        console.log(document);
        let newDocument = new Doc({
            book_name: document.book,
            issuer_name: document.issuer,
            due_date: document.date,
        });
        newDocument.save().then(() => {
            console.log("Document inserted into MongoDB");
        });
    }
});
app.listen(3000);
