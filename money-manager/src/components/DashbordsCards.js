import React from 'react';


const DashboardsCards = ({balance, bankName}) => {
    console.log("balance", balance)
    return (
        <div className='dashBoardCards'>
            <h3 style={{ color: 'gray' }}>{bankName}</h3>
            <h1>₹{balance}</h1>
        </div>

    )
};

export default DashboardsCards;