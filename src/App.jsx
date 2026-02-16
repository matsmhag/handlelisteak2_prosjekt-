import { useState } from "react"
import AddForm from "./components/AddForm"
import ShoppingList from "./components/ShoppingList"

function makeId() {
 
  return crypto?.randomUUID?.() ?? String(Date.now())
}

const initialItems = [
  { id: makeId(), name: "Melk", qty: 2, bought: false },
  { id: makeId(), name: "Egg", qty: 1, bought: true }, 
];

export default function App() {
 
  const [items, setItems] = useState(initialItems)

  function addItem(name, qty) {
    const newItem = { id: makeId(), name, qty, bought: false }

    
    setItems((prev) => [newItem, ...prev])
  }

  function toggleBought(id) {
   
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, bought: !item.bought } : item
      )
    );
  }

  function changeQty(id, nextQty) {
   
    if (nextQty < 1) return

    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: nextQty } : item))
    )
  }

  return (
    <main>
      <header>
        <h1>Handleliste</h1>
      </header>

      <section aria-label="Legg til vare">
        <AddForm onAdd={addItem} />
      </section>

      <section aria-label="Handleliste">
        <ShoppingList items={items} onToggle={toggleBought} onQtyChange={changeQty} />
      </section>
    </main>
  );
}

