import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import DashboardsCards from './DashbordsCards';
import DashboardCard2 from './DashboardCard2';

const Dashboard = () => {
  const [balanceData, setBalanceData] = useState([]);
  const [totalBalance, setTotalBalance] = useState('');
  const [bankData, setBankData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBalanceDetails = async () => {
      try {
        const response = await fetch('https://money-manager-backend-bsdc.onrender.com/dashboard/?token=nkn');
        const data = await response.json();
        
        if (data && data.result && data.result.banks_details) {
          const banksDetails = data.result.banks_details.map((value) => ({
            bank_balance: value.bank_balance,
            bank_name: value.bank_name,
          }));
          setBalanceData(banksDetails);
          setTotalBalance(data.result.total_balance);
        } else {
          setError('Error fetching balance details.');
        }
      } catch (error) {
        setError('Error fetching balance details.');
        console.error('Error fetching bank details:', error);
      }
    };

    fetchBalanceDetails();
  }, []);

  useEffect(() => {
    const fetchBalanceDetails2 = async () => {
      try {
        const response = await fetch('https://money-manager-backend-bsdc.onrender.com/dashboard/income-expense?token=d');
        const data = await response.json();
        
        if (data && data.result) {
          setBankData({
            INCOME: data.result.total_income,
            EXPENSE: data.result.total_expense,
            SAVINGS: data.result.total_savings,
            SAVING_PERCENTAGE: data.result.saving_percentage,
          });
        } else {
          setError('Error fetching income-expense data.');
        }
      } catch (error) {
        setError('Error fetching income-expense data.');
        console.error('Error fetching bank details:', error);
      }
    };

    fetchBalanceDetails2();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Sidebar />
      <div className="dashContent">
        <div className="mainDashboardContent">
          <div className="dashBoardContent">
            <div className="dashBoardCards">
              <h3 style={{ color: 'gray' }}>TOTAL BALANCE</h3>
              <h1>₹{totalBalance}</h1>
            </div>
          </div>
          {balanceData.length > 0 ? (
            balanceData.map((bal, index) => (
              <div key={index} className="dashBoardContent total">
                <DashboardsCards balance={bal.bank_balance} bankName={bal.bank_name} />
              </div>
            ))
          ) : (
            'No balance available'
          )}
        </div>
        <div className='mainDashboardContent2'>
          {Object.keys(bankData).length > 0 ? (
            Object.entries(bankData).map(([key, value], index) => (
              <div key={index} className="dashBoardContent2">
                <DashboardCard2 name={key} value={value} />
              </div>
            ))
          ) : (
            'No bank data available'
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
