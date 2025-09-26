import { useState, useEffect } from "react";
import axios from "axios";
import AddItemForm from "./Compnents/AddItemForm";
import ShoppingList from "./Compnents/ShoppingList";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/items");
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleAddItem = async (newItem) => {
    try {
      const response = await axios.post("http://localhost:5000/api/items", newItem);
      setItems([...items, response.data]);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleUpdateItem = async (id, updatedItem) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/items/${id}`, updatedItem);
      setItems(items.map(item => item.id === id ? response.data : item));
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/items/${id}`);
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
