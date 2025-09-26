import { useState, useEffect } from "react";
import axios from "axios";
import AddItemForm from "./Compnents/AddItemForm";
import ShoppingList from "./Compnents/ShoppingList";

// ✅ Use deployed backend URL
// const API_BASE_URL = process.env.API_BASE || 5000;
const API_BASE_URL = "https://shopping-list-assignment.onrender.com/api/items"


function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleAddItem = async (newItem) => {
    try {
      const response = await axios.post(API_BASE_URL, newItem);
      setItems([...items, response.data]);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleUpdateItem = async (id, updatedItem) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, updatedItem);
      setItems(items.map(item => item.id === id ? response.data : item));
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">🛒 Shopping List</h1>
      <AddItemForm onAdd={handleAddItem} />
      <ShoppingList items={items} onUpdate={handleUpdateItem} onDelete={handleDeleteItem} />
    </div>
  );
}

export default App;
