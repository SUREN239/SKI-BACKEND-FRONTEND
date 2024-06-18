import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Import Tab styles
import './FacultyFormView.css';

const FacultyFormView = ({ college }) => {
  const [formData, setFormData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState(null);
  const [filteredFormData, setFilteredFormData] = useState([]);
  const [index, setIndex] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get('');
      // const response = await axios.get('http://172.20.10.3:9091/faculty');
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching form data:', error);
      setError('Failed to fetch data');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = formData.filter(item => item.selectedCollege === college);
    setFilteredFormData(filteredData);
  }, [formData, college]);

  const handleEdit = (item) => {
    setSelectedItem(item);
    const modalTitle = item.status === 'Approved' ? 'Approval' : 'Disapproval';
    setModalTitle(modalTitle);
    setModalVisible(true);
  };

  const handleDelete = async (SNo) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        // await axios.delete(`http://172.20.10.3:9091/deleteFacultyBudget/${SNo}`);
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
      // await axios.post('http://172.20.10.3:9091/updateFacultyBudget', updatedItem);
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

  const renderTableHeader = () => (
    <div className="headerRow">
      <div className="header">
        <span>SNo</span>
      </div>
      <div className="header">
        <span>Selected College</span>
      </div>
      {/* Add other headers as needed */}
    </div>
  );

  const renderTableRow = (item) => (
    <div className="row" key={item.SNo}>
      <div className="column">
        <span>{item.SNo}</span>
      </div>
      <div className="column">
        <span>{item.selectedCollege}</span>
      </div>
      {/* Add other columns as needed */}
      <div className="column">
        <button className="editButton" onClick={() => handleEdit(item)}>Edit</button>
      </div>
    </div>
  );

  const renderPanel = (title, data) => (
    <div className="panel">
      <h2>{title}</h2>
      <div className="tableContainer">
        {renderTableHeader()}
        {data.map(item => renderTableRow(item))}
      </div>
    </div>
  );

  return (
    <div className="container">
      <h2 className="heading">Faculty Form View</h2>
      <Tabs selectedIndex={index} onSelect={index => setIndex(index)}>
        <TabList>
          <Tab>Pending</Tab>
          <Tab>Approved</Tab>
          <Tab>Disapproved</Tab>
          {/* Add other tabs as needed */}
        </TabList>

        <TabPanel>
          {renderPanel('Pending', filteredFormData.filter(item => item.status === 'Pending'))}
        </TabPanel>
        <TabPanel>
          {renderPanel('Approved', filteredFormData.filter(item => item.status === 'Approved'))}
        </TabPanel>
        <TabPanel>
          {renderPanel('Disapproved', filteredFormData.filter(item => item.status === 'Disapproved'))}
        </TabPanel>
        {/* Add other TabPanels for different statuses */}
      </Tabs>
    </div>
  );
};

export default FacultyFormView;
