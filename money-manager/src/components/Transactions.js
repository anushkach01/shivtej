import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

const Transactions = () => {
  const [newTransaction, setNewTransaction] = useState(false);
  const [categories, setCategories] = useState([]);
  const [transactionData, setTransactionData] = useState([]);  // Initially, an empty array
  const [bankData, setBankData] = useState([]);
  const [formData, setFormData] = useState({
    amount: '',
    transaction_date: '2025-03-31',
    transaction_type: 'Income',
    bank_name: 'SBI',
    category_id: 1,
    description: '',
    bank_id: 1,
    subcategory_id: 1
  });

  const handleOpenTransaction = () => {
    setNewTransaction(true);
  };

  const onCloseModalHandler = () => {
    setNewTransaction(false);
  };

  // Handle form submission (POST)
  const onApiSuccess = async (e) => {
    e.preventDefault(); // Prevent form submission
    try {
      const response = await fetch('https://money-manager-backend-bsdc.onrender.com/api/transactions/?token=a', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (data) {
        console.log("Transaction added:", data);
        setNewTransaction(false);
        fetchTransactionDetails(); // Refresh the transaction list after POST
      }
    } catch (error) {
      console.error('Error posting transaction:', error);
    }
  };

  // Get Transactions (GET)
  const fetchTransactionDetails = async () => {
    try {
      const response = await fetch('https://money-manager-backend-bsdc.onrender.com/api/transactions/?token=g');
      const data = await response.json();
      if (data) {
        console.log("Fetched transactions:", data);

        const updatedValue = data.result.map((value) => ({
          description: value.description,
          id: value.bank_id,
          date: value.transaction_date,
          balance: value.amount,
          transaction_type: value.transaction_type // Assuming this field exists
        }));

        setTransactionData(updatedValue); // Set transaction data to state
      }
    } catch (error) {
      console.error('Error fetching transaction data:', error);
    }
  };

  // Get Bank Details (GET)
  const fetchBankDetails = async () => {
    try {
      const response = await fetch('https://money-manager-backend-bsdc.onrender.com/api/bank/?token=a');
      const data = await response.json();
      if (data) {
        console.log("Fetched banks:", data);
        setBankData(data.result);
      }
    } catch (error) {
      console.error('Error fetching bank data:', error);
    }
  };

  // Get Categories (GET)
  const fetchCategoryDetails = async () => {
    try {
      const response = await fetch('https://money-manager-backend-bsdc.onrender.com/api/categories/?token=a');
      const data = await response.json();
      if (data) {
        console.log("Fetched categories:", data);
        setCategories(data.result);
      }
    } catch (error) {
      console.error('Error fetching category data:', error);
    }
  };

  useEffect(() => {
    fetchTransactionDetails(); // Initial load of transactions
    fetchCategoryDetails(); // Initial load of categories
    fetchBankDetails(); // Initial load of bank details
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Sidebar />
      <div className="transactions">
        <div className="transaction-content">
          <h1>Transactions</h1>
          <button className="btn" onClick={handleOpenTransaction}>Add</button>
        </div>

        {/* Transaction List Display as Table */}
        {transactionData.length > 0 && (
          <div className='tableContainer'>
            <table>
              <thead>
                <tr>
                  <th>Transaction Type</th>
                  <th>Description</th>
                  <th>Bank Name</th>
                  <th>Date</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactionData.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.transaction_type === "Income" ? '↙️ Income' : '↗️ Expense'}</td>
                    <td>{transaction.description.length > 30 ? transaction.description.substring(0, 50) + '...' : transaction.description}</td>
                    <td>{transaction.id}</td>
                    <td>{transaction.date}</td>
                    <td>₹{transaction.balance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {newTransaction && (
        <div className="transactionSection1">
          <div className="header">
            <h1>New Transaction</h1>
            <span onClick={onCloseModalHandler} className="closeIcon">X</span>
          </div>
          <form onSubmit={onApiSuccess}>
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="$0.00"
            />
            <label>Date</label>
            <input
              type="date"
              name="transaction_date"
              value={formData.transaction_date}
              onChange={handleChange}
            />
            <label>Type</label>
            <select name="transaction_type" className="select" value={formData.transaction_type} onChange={handleChange}>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>

            {/* Bank Select */}
            <label>Select bank</label>
            <select name="bank_name" className="select" value={formData.bank_name} onChange={handleChange}>
              {bankData.map((bank) => (
                <option key={bank.bank_id} value={bank.bank_name}>
                  {bank.bank_name}
                </option>
              ))}
            </select>

            {/* Bank ID Select */}
            <label>Select bank id</label>
            <select name="bank_id" className="select" value={formData.bank_id} onChange={handleChange}>
              {bankData.map((bank) => (
                <option key={bank.bank_id} value={bank.bank_id}>
                  {bank.bank_id}
                </option>
              ))}
            </select>

            {/* Category Select */}
            <label>Select category</label>
            <select name="category_id" className="select" value={formData.category_id} onChange={handleChange}>
              {categories.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.category_name}
                </option>
              ))}
            </select>

            <label>Add description</label>
            <textarea
              rows={6}
              cols={40}
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            <div className="footer">
              <button className="btn" onClick={onCloseModalHandler}>Cancel</button>
              <button type="submit" className="btn">Add</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Transactions;
