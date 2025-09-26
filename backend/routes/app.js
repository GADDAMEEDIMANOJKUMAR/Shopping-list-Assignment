const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

// In-memory database
let items = [];

// Example Item Schema:
// {
//   id: "uuid-123",
//   name: "Milk",
//   quantity: "1 gallon",
//   category: "Dairy",
//   completed: false
// }

// GET all items
router.get("/items", (req, res) => {
  res.json(items);
});

// POST add new item
router.post("/items", (req, res) => {
  const { name, quantity, category, completed } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  const newItem = {
    id: uuidv4(),
    name,
    quantity: quantity || "",
    category: category || "",
    completed: completed || false,
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT update item
router.put("/items/:id", (req, res) => {
  const { id } = req.params;
  const { name, quantity, category, completed } = req.body;

  const item = items.find((i) => i.id === id);
  if (!item) return res.status(404).json({ error: "Item not found" });

  item.name = name || item.name;
  item.quantity = quantity || item.quantity;
  item.category = category || item.category;
  if (completed !== undefined) item.completed = completed;

  res.json(item);
});

// DELETE item
router.delete("/items/:id", (req, res) => {
  const { id } = req.params;
  const initialLength = items.length;
  items = items.filter((i) => i.id !== id);

  if (items.length === initialLength) {
    return res.status(404).json({ error: "Item not found" });
  }
  res.json({ message: "Item deleted successfully" });
});

module.exports = router;
