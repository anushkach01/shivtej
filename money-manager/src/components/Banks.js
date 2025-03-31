import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const Banks = () => {
  const [showBankAccountModal, setShowBankAccountModal] = useState(false);
  const [bankDetails, setBankDetails] = useState([]); // Now it's an array
  const [showBankAccountModalToUpdate, setShowBankAccountModalToUpdate] = useState(false);
  const [formData, setFormData] = useState({});

  const onClickHandler = (e) => {
    console.log("open modal");
    e.preventDefault();
    setShowBankAccountModal(true);
    setFormData({})
  };

  const onEditClickHandler = (e) => {
    console.log("open modal for edit");
    setShowBankAccountModalToUpdate(true);
    
  };

  const onCloseModalHandler = () => {
    setShowBankAccountModal(false);
    setShowBankAccountModalToUpdate(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const onApiSuccess = () => {
    console.log(formData);
    const payload = {
      bank_name: formData.bankName,
      account_type: formData.type,
      total_balance: formData.balance
    };
    console.log("payload", payload);
    fetch('https://money-manager-backend-bsdc.onrender.com/api/bank/?token=D', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        if (data.is_success ) {
          setShowBankAccountModal(false);
          // setBankDetails([])
          // // Assuming the response contains the updated list of bank details
          setBankDetails(data.result.map((value) => ({
            bankName: value.bank_name,
            type: value.account_type,
            balance: value.total_balance
          })));
          console.log(bankDetails, bankDetails)
        } else {
          console.error('Failed to add bank:', data.message);
        }
      })
      .catch((error) => {
        console.error('Error posting bank details:', error);
      });

    setShowBankAccountModal(false); // Close the modal after POST
  };

  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        const response = await fetch('https://money-manager-backend-bsdc.onrender.com/api/bank/?token=f');
        const data = await response.json();
        console.log("data", data);
        if (data) {
          // Assuming `data.result` contains an array of bank details
          setBankDetails(data.result.map((value) => ({
            bankName: value.bank_name,
            type: value.account_type,
            balance: value.total_balance
          })));
        }
      } catch (error) {
        console.error('Error fetching bank details:', error);
      }
    };
    fetchBankDetails();
  }, []);

  useEffect(() => {
    console.log('Selected Account Type:', formData.type); // Log selected account type
  }, [formData.type]); // Runs whenever formData.type changes

  return (
    <div className='container'>
      <Sidebar />
      <div className='mainSection'>
        <h1>Banks</h1>

        <p>Connected Accounts</p>
        {bankDetails.length > 0 ?? (
          bankDetails.map((bank, index) => (
            <div key={index} className='updatedBankDetails'>
              <div className='startDetails'>
                <h2>{bank.bankName}</h2>
                <span><h3>{bank.type}</h3></span>
              </div>
              <div className='endDetails'>
                <h3>{bank.balance}</h3>
                <FontAwesomeIcon icon={faPenToSquare} onClick={onEditClickHandler} />
              </div>
            </div>
          ))
        )}

        <div className='addNewBankSection'>
          <h2>Add Account</h2>
          <button onClick={onClickHandler} className='btn'>Add new bank</button>
        </div>
      </div>

      {(showBankAccountModal || showBankAccountModalToUpdate) && (
        <div className='newBankSectionModal'>
          <div className='header'>
            <h1>Link a bank account</h1>
            <span onClick={onCloseModalHandler} className='closeIcon'>X</span>
          </div>
          <form className='formData' onSubmit={onApiSuccess} >
            <label>Bank name</label>
            <input placeholder='Enter bank name' name="bankName" value={formData.bankName} onChange={handleInputChange} />

            <label>Account Type</label>
            <select name="type" className='select' value={formData.type} onChange={handleInputChange}>
              <option value="current">Current</option>
              <option value="savings">Savings</option>
            </select>

            <label>Total balance</label>
            <input placeholder='₹ 0.00' name="balance" value={formData.balance} onChange={handleInputChange} />
          </form>
          <div className='footer'>
            <button className='btn' onClick={onCloseModalHandler}>Cancel</button>
            <button type="submit" className='btn' onClick={onApiSuccess}>
              {showBankAccountModalToUpdate ? 'Update account' : 'Add account'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banks;