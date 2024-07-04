import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GraphView = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/expenses')
      .then(response => {
        setExpenses(response.data);
      })
      .catch(error => {
        console.error('Error fetching expenses:', error);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Expense Graph View</h1>
      <div className="grid grid-cols-3 gap-4">
        {expenses.map(expense => (
          <div key={expense._id} className="bg-white border border-gray-300 rounded-lg p-4 shadow-md">
            <h2 className="text-lg font-semibold mb-2">{expense.title}</h2>
            <p className="text-gray-600 mb-2"><span className="font-semibold">Category:</span> {expense.category}</p>
            <p className="text-gray-600 mb-2"><span className="font-semibold">Amount:</span> {expense.amount}</p>
            <p className="text-gray-600 mb-2"><span className="font-semibold">Date:</span> {new Date(expense.date).toLocaleDateString()}</p>
            <p className="text-gray-600 mb-2"><span className="font-semibold">Description:</span> {expense.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GraphView;
