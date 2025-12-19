const express = require("express");
const db = require("./db");

const router = express.Router();

// GET todos
router.get("/todos", (req, res) => {
  db.query("SELECT * FROM todos", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// ADD todo
router.post("/todos", (req, res) => {
  const { text } = req.body;
  db.query(
    "INSERT INTO todos (text) VALUES (?)",
    [text],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId, text, completed: false });
    }
  );
});

// TOGGLE todo
router.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE todos SET completed = NOT completed WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Updated" });
    }
  );
});

// DELETE todo
router.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    "DELETE FROM todos WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Deleted" });
    }
  );
});

module.exports = router;
