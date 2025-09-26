import React, { useState } from "react";

const ShoppingListItem = ({ item, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(item.name);
  const [editQuantity, setEditQuantity] = useState(item.quantity);
  const [editCategory, setEditCategory] = useState(item.category);

  const handleSave = () => {
    onUpdate(item.id, {
      name: editName,
      quantity: editQuantity,
      category: editCategory,
      completed: item.completed,
    });
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-sm">
      {isEditing ? (
        <div className="flex flex-col md:flex-row gap-2 flex-1">
          <input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            value={editQuantity}
            onChange={(e) => setEditQuantity(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value)}
            className="p-2 border rounded"
          />
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
          >
            Save
          </button>
        </div>
      ) : (
        <>
          <p className="flex-1 text-left">
            <span className="font-semibold">{item.name}</span> – {item.quantity}{" "}
            <span className="text-sm text-gray-500">({item.category})</span>
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingListItem;
