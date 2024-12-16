/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import { Link } from "react-router-dom";
import React, { useState } from "react";

const Debits = (props) => {
  const { addDebit, accountBalance } = props;
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  let debitsView = () => {
    const { debits } = props;
    return debits.map((debit, index) => {  // Use index if no unique id exists
      let date = debit.date.slice(0, 10);
      return (
        <li key={index}>  {/* Use index as a last resort */}
          {debit.amount} {debit.description} {date}
        </li>
      );
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (description && amount > 0) {
      addDebit(description, parseFloat(amount));
      setDescription("");
      setAmount("");
    }
  };


  return (
    <div>
      <h1>Debits</h1>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Debits List</h2>
      {debitsView()}


      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required

        />
        <button type="submit">Add Debit</button>
      </form>


      <h3>Account Balance: ${accountBalance.toFixed(2)}</h3>

      <br />
      <Link to="/">
      <button>Home</button>
      </Link>
    </div>
  );
};

export default Debits;
