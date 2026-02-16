import { useState } from "react";

export default function AddForm({ onAdd }) {
  const [name, setName] = useState("");
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const trimmed = name.trim();

    // Validering: begge felter må være fylt ut
    if (!trimmed && !qty) {
      setError("Du må skrive inn vare og antall.");
      return;
    }
    if (!trimmed) {
      setError("Du må skrive inn navn på varen.");
      return;
    }
    if (!qty || qty < 1) {
      setError("Antall må være minst 1.");
      return;
    }

    setError("");
    onAdd(trimmed, qty);

    // Nullstill skjema
    setName("");
    setQty(1);
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Legg til vare</legend>

        <label>
          Vare
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Egg..."
          />
        </label>

        <label>
          Antall
          <input
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
          />
        </label>

        <button type="submit">Legg til vare</button>

        {error ? <p role="alert">{error}</p> : null}
      </fieldset>
    </form>
  );
}
