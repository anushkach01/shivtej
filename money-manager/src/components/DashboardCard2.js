import React from 'react';

const DashboardsCards = ({ key, name, value}) => {
    console.log(key)
    return (
        <div>
            <div className='dashBoardCards'>
                <h3 style={{ color: 'gray' }}>{name}</h3>
                <h1>₹{value}</h1>
            </div>
        </div>



    )
};

export default DashboardsCards;