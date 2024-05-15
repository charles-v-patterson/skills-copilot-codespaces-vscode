// Create web server
// Create a comment
// Read a comment
// Update a comment
// Delete a comment

// Dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/comment');

// Create a schema
const commentSchema = new mongoose.Schema({
  comment: String
});

// Create a model
const Comment = mongoose.model('Comment', commentSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Create a comment
app.post('/comment', (req, res) => {
  const newComment = new Comment({
    comment: req.body.comment
  });

  newComment.save((err) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.status(201).json({ message: 'Comment created' });
    }
  });
});

// Read a comment
app.get('/comment', (req, res) => {
  Comment.find((err, comments) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.status(200).json(comments);
    }
  });
});

// Update a comment
app.put('/comment/:id', (req, res) => {
  Comment.findById(req.params.id, (err, comment) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      comment.comment = req.body.comment;
      comment.save((err) => {
        if (err) {
          res.status(500).json({ error: err });
        } else {
          res.status(200).json({ message: 'Comment updated' });
        }
      });
    }
  });
});

// Delete a comment
app.delete('/comment/:id', (req, res) => {
  Comment.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.status(200).json({ message: 'Comment deleted' });
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});