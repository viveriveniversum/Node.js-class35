const { request } = require("express");
const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.json());
//Creating new post
app.post("/blogs", (req, res) => {
  // How to get the title and content from the request??
  const { title, content } = req.body;
  fs.writeFileSync(title, content);
  res.end("ok");
});

//Updating Existing Posts
app.put("/blogs/:title", (req, res) => {
  // How to get the title and content from the request?
  const { content } = req.body;
  const { title } = req.params;
  // What if the request does not have a title and/or content?
  if (fs.existsSync(title)) {
    fs.writeFileSync(title, content);
    res.end("ok");
  } else {
    // Send response with error message
    res.send({ msg: "This post does not exist!" });
  }
});

//Deleting Posts
app.delete("/blogs/:title", (req, res) => {
  // How to get the title from the url parameters?
  const { title } = req.params;
  if (fs.existsSync(title)) {
    // Add condition here
    fs.unlinkSync(title);
    res.end("ok");
  } else {
    res.json({ msg: "Couldn't find that file!" });
  }
});

//Reading Posts
app.get("/blogs/:title", (req, res) => {
  // How to get the title from the url parameters?
  const { title } = req.params;
  // check if post exists
  const post = fs.readFileSync(title);
  if (fs.existsSync(title)) {
    res.status(200).send(post);
  } else {
    res.status(400).send({ msg: "This post does not exist!" });
  }
  // send response
});

// YOUR CODE GOES IN HERE
app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(3000, () => console.log("Server listening on port"));
