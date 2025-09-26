import React from "react";
import ShoppingListItem from "./ShoppingListItem";

const ShoppingList = ({ items, onUpdate, onDelete }) => {
  return (
    <div className="space-y-3">
      {items.length === 0 ? (
        <p className="text-gray-500">No items added yet.</p>
      ) : (
        items.map((item) => (
          <ShoppingListItem
            key={item.id}
            item={item}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
};

export default ShoppingList;
