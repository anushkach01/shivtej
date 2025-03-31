import React, { useState, useEffect } from 'react'; // Import React, useState, useEffect
import { compact } from 'lodash'; // Import compact from lodash
import Sidebar from './Sidebar';

// Tabs component to display individual tab items
const Tabs = ({ tabs, activeTab, onTabClick }) => (
  <div style={{ display: 'flex', cursor: 'pointer' }}>
    {tabs.map((tab) => (
      <div
        key={tab.name}
        onClick={() => onTabClick(tab.name)}
        style={{
          padding: '10px 20px',
          borderBottom: activeTab === tab.name ? '2px solid white' : 'none',
        }}
      >
        {tab.name}
      </div>
    ))}
  </div>
);

// TabContent component to display content based on the selected tab
const TabContent = ({ activeTab, tabs, categoryData }) => {
  const activeTabContent = tabs.find((tab) => tab.name === activeTab)?.content;

  // Render dynamic content for the EXPENSE tab
  if (typeof activeTabContent === 'function') {
    return <div>{activeTabContent(categoryData)}</div>;
  }

  // If content is static (like for INCOME), return the static content
  return <div>{activeTabContent}</div>;
};

// Main Categories component to combine the sidebar and tabs content
const Categories = () => {
  const [showAddNewModal, setShowAddNewModal] = useState(false);
  const [activeTab, setActiveTab] = useState('EXPENSE'); // Default active tab
  const [showSubcategorySection, setShowSubcategorySection] = useState(false);
  const [categoryData, setCategoryData] = useState([]);

  // Fetch category data
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await fetch('https://money-manager-backend-bsdc.onrender.com/api/categories/?token=hj');
        const data = await response.json();
        if (data) {
          // Use compact to ensure no falsy values are in the categoryData array
          setCategoryData(
            compact(
              data.result.map((value) => {
                if (value.type_of.toLowerCase() === 'expense') {
                  return value.category_name;
                }
                return null; // If the category type is not 'expense', return null to be filtered out
              })
            )
          );
        }
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    fetchCategoryData();
  }, []);

  // Handle tab click
  const handleTabClick = (tabName) => {
    setActiveTab(tabName); // Change active tab on click
  };

  // Show modal to add new category
  const handleOnClickOfAddNew = () => {
    setShowAddNewModal(true);
  };

  // Close the modal
  const handleCloseAction = () => {
    setShowAddNewModal(false);
    setShowSubcategorySection(false);
  };

  // Handle subcategory click
  const handleOnSubCategoryClick = (e) => {
    e.preventDefault();
    setShowSubcategorySection(true);
  };

  const handleOnClickOfAddBtn = (e) => {
  }

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await fetch('https://money-manager-backend-bsdc.onrender.com/api/categories/?token=f');
        const data = await response.json();
        if (data) {
          // Use compact to ensure no falsy values are in the categoryData array
          setCategoryData(
            compact(
              data.result.map((value) => {
                if (value.type_of.toLowerCase() === 'expense') {
                  return value.category_name;
                }
                return null; // If the category type is not 'expense', return null to be filtered out
              })
            )
          );
        }
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    fetchCategoryData();
  }, []);

  const tabs = [
    {
      name: 'EXPENSE',
      content: (categoryData) => (
        <div>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {categoryData.map((category, index) => (
              <li key={index} style={{ padding: '10px' }}>
                {category}
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      name: 'INCOME',
      content: (categoryData) => (
        <div>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {categoryData.map((category, index) => (
              <li key={index} style={{ padding: '10px' }}>
                {category}
              </li>
            ))}
          </ul>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Sidebar />
      <div className="categories">
        <div className="category-header">
          <h1>Categories</h1>
          <button className="btn" onClick={handleOnClickOfAddNew}>Add category</button>
        </div>
        <div className="tabs">
          <Tabs tabs={tabs} className='tabs' activeTab={activeTab} onTabClick={handleTabClick} />
          <TabContent activeTab={activeTab} tabs={tabs} categoryData={categoryData} />
        </div>
        {showAddNewModal && (
          <div className="ModalData">
            <div className="categoryHeader">
              <h1>Add category</h1>
              <h2 className="closeIcon" onClick={handleCloseAction}>X</h2>
            </div>
            <div className="categoryModal">
              <form>
                <label>Category name*</label>
                <input type="text" placeholder="e.g., Groceries" />
                <label>Sub-category name</label>
                <input type="text" placeholder="e.g., Weekly groceries" />
                <button className="btn" onClick={handleOnSubCategoryClick}>Add sub category</button>
                {showSubcategorySection && (
                  <div>
                    <input type="text" placeholder="Sub-category name" />
                  </div>
                )}
                <label style={{ marginTop: '12px' }}>Type</label>
                <select name="type" className="select">
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </form>
            </div>
            <div className="footer">
              <button className="btn" onClick={handleCloseAction}>Cancel</button>
              <button onClick={handleOnClickOfAddBtn} className="btn">Add</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
