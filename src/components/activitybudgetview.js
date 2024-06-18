import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BudgetFormView = () => {
  const { college } = useParams();
  const [formData, setFormData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState(null);
  const [filteredFormData, setFilteredFormData] = useState([]);
  const [modalTitle, setModalTitle] = useState('');
  const [activeTab, setActiveTab] = useState('pending');

  const tabs = [
    { key: 'pending', title: 'Pending' },
    { key: 'approved', title: 'Approved' },
    { key: 'disapproved', title: 'Disapproved' },
    { key: 'return', title: 'Return' },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = formData.filter(item => item.selectedCollege === college);
    setFilteredFormData(filteredData);
  }, [formData, college]);

  const fetchData = async () => {
    try {
      // const response = await axios.get('http://your-api-endpoint.com/budget');
      const response = await axios.get('');
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching form data:', error);
      setError('Failed to fetch data');
    }
  };

  const renderSlider = (title, data) => (
    <div>
      <h2>{title}</h2>
      <ul>
        {data.map(item => (
          <li key={item.SNo}>
            <span>{item.eventTitle}</span>
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item.SNo)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'pending':
        return renderSlider('Pending', filteredFormData.filter(item => item.status === 'Pending'));
      case 'approved':
        return renderSlider('Approved', filteredFormData.filter(item => item.status === 'Approved'));
      case 'disapproved':
        return renderSlider('Disapproved', filteredFormData.filter(item => item.status === 'Disapproved'));
      case 'return':
        return renderSlider('Return', filteredFormData.filter(item => item.status === 'Return' && item.returnedit === 1));
      default:
        return null;
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    const modalTitle = item.status === 'Approved' ? 'Approval' : 'Disapproval';
    setModalTitle(modalTitle);
    setModalVisible(true);
  };

  const handleDelete = async (SNo) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        // await axios.delete(`http://your-api-endpoint.com/deleteBudget/${SNo}`);
        await axios.delete(``);
        fetchData();
      } catch (error) {
        console.error('Error deleting data:', error);
        setError('Failed to delete data');
      }
    }
  };

  const handleSave = async (newStatus) => {
    try {
      const updatedItem = { ...selectedItem, status: newStatus };
      // await axios.post('http://your-api-endpoint.com/updateBudget', updatedItem);
      await axios.post('', updatedItem);
      setModalVisible(false);
      fetchData();
      alert(`Budget has been ${newStatus.toLowerCase()} successfully.`);
    } catch (error) {
      console.error('Error updating data:', error);
      setError('Failed to update data');
      alert('Failed to update budget. Please try again later.');
    }
  };

  return (
    <div className="container">
      <h1>Activity Budget View</h1>
      <div className="tabs">
        {tabs.map(tab => (
          <button
            key={tab.key}
            className={`tab ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {renderTabContent()}
      </div>
      {modalVisible && (
        <div className="modal">
          <h2>{modalTitle}</h2>
          <button onClick={() => handleSave('Approved')}>Save</button>
          <button onClick={() => handleSave('Disapproved')}>Disapprove</button>
          <button onClick={() => setModalVisible(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default BudgetFormView;

const styles = `
  .container {
  max-width: 800px;
  margin: 0 auto;
  margin-top: 100px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.tabs {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: 20px;
}

.tab {
  padding: 10px 20px;
  cursor: pointer;
  background-color: lightgray;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  transition: background-color 0.3s;
  flex: 1 1 25%; /* Ensure tabs are responsive */
  margin: 5px; /* Add margin for spacing */
}

.tab:hover {
  background-color: darkgray;
}

.tab.active {
  background-color: blue;
  color: white;
}

.tab-content {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
}

h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #555;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

button {
  background-color: blue;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: darkblue;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

@media (max-width: 600px) {
  .tab {
    flex: 1 1 45%; /* Adjust for smaller screens */
  }
}
`;

// Inline styling for the React component
const styleTag = document.createElement('style');
styleTag.innerHTML = styles;
document.head.appendChild(styleTag);
