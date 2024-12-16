/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

const Credits = (props) => {
  const {addCredit, accountBalance} = props;
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description && amount) {
      addCredit(description, parseFloat(amount));
      setDescription('');
      setAmount('');
    }
  };

  let creditsView = () => {
    const { credits } = props;
    return credits.map((credit, index) => { 
      let date = credit.date.slice(0, 10);
      return (
        <li key={index}>
          {credit.amount} {credit.description} {date}
        </li>
      );
    });
  };



  return (
    <div>
      <h1>Credits</h1>

      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Credits List</h2>
      {creditsView()}

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
        <button type="submit">Add Credit</button>
      </form>

      
      <h3>Account Balance: ${accountBalance.toFixed(2)}</h3>

      <Link to="/">
            <button>Home</button>
      </Link>
    </div>
  );
};

export default Credits;