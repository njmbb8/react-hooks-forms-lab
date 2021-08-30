import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items, setItems}) {
  const [formData, setFormData] = useState({
    filter: "All",
    search: ''
  })

  const [addItem, setAddItem] = useState({
    id: '',
    name: '',
    category: "Produce"
  })

  function newItemFormChange(event){
    const name = event.target.name
    const value = event.target.value
    setAddItem(
      {
        ...addItem,
        [name]: value
      }
    )
    console.log(addItem)
  }

  function onItemFormSubmit(newItem){
    console.log(newItem)
    setItems([
      ...items,
      newItem
    ])
  }

  function onSearchChange(event){
    const name = event.target.name;
    const value = event.target.value;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const itemsToDisplay = items.filter((item) => {
    if (formData.filter === "All" || item.category === formData.filter){
      if(formData.search === ''){
        return true
      }
      else if(item.name.match(formData.search) !== null){
        return true
      }
      else{
        return false
      }
    }
    else{
      return false
    }
  });

  return (
    <div className="ShoppingList">
      <ItemForm name = {addItem.name} category = {addItem.category} onItemFormSubmit = {onItemFormSubmit} onFormChange = {newItemFormChange}/>
      <Filter onSearchChange={onSearchChange} />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
