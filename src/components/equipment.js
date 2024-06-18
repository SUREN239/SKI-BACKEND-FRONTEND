import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Equipment = ({ college }) => {
  const [selectedCollege, setSelectedCollege] = useState(college);
  const [facultyName, setFacultyName] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState('');
  const [dateOfPurchase, setDateOfPurchase] = useState('');
  const [category, setCategory] = useState('');
  const [rows, setRows] = useState([{ SNO: 1, equipmentList: '', specification: '', unitPrice: '', quantity: '', cost: '' }]);
  const [totalCost, setTotalCost] = useState(0);
  const [comment, setComment] = useState('');
  const [status] = useState('Pending');
  const [departmentOptions, setDepartmentOptions] = useState([]);

  const collegeDepartmentMapping = {
    SKASC: ['B.A. English Literature', 'M.A. English Literature', 'B.Sc. Mathematics', 'M.Sc. Mathematics with Big Data', 'B.Sc. Artificial Intelligence and Machine Learning', 'B.Sc. Data Science', 'M.Sc. Software Systems', 'B.Sc.Computer Technology', 'B.C.A. (Computer Applications)', 'B.Sc. Computer Science And Applications', 'B.Sc. Computer Science', 'B.Sc. Software Systems', 'B.Sc. Information Technology', 'B.Sc. Computer Science with Cognitive Systems', 'M.Sc. Information Technology', 'M.Sc. Computer Science', 'B.Sc. Electronics and Communication Systems', 'M.Sc. Electronics and Communication Systems', 'B.Sc. Costume Design and Fashion', 'B.Sc.Catering Science and Hotel Management', 'B.Sc. Biotechnology', 'B.Sc. Microbiology', 'M.Sc. Microbiology', 'M.Sc. Bioinformatics', 'B.Com.(Commerce)', 'M.Com.(Commerce)', 'M.Com. International Business', 'B.Com.Corporate Secretaryship', 'B.Com. Professional Accounting', 'B.Com. Business Process Service', 'B.Com. Banking and Insurance', 'B.Com. Accounting and Finance', 'B.Com. Capital Market', 'B.Com. Computer Applications', 'B.Com. Business Analytics', 'B.Com. Information Technology', 'B.Com. E Commerce', 'B.B.A. Business Administration ', 'B.B.A. Computer Applications', 'B.B.A. Logistics', 'B.Sc. Information Systems Management', 'B.Sc. Psychology', 'M.S.. (Social Work)', 'M.A. Public Administration', 'External'],
    SKCT: ['B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'Science & Humanities', 'B.E. Civil Engineering', 'B.E. Mechanical Engineering', 'B.E. Computer Science and Engineering', 'B.Tech Information Technology', 'Master of Business Administration(MBA)', 'B.Tech.Artificial Intelligence And Data Science', 'B.Tech. Internet of Things', 'B.Tech Cyber Security', 'B.Tech Artificial Intelligence and Machine Learning', 'External'],
    SKCET: ['B.Tech Information Technology', 'B.E. Civil Engineering', 'B.E. Computer Science and Engineering', 'B.E. Computer Science and Engineering(Cyber Security)', 'B.E. Electronics Engineering', 'B.E. Electronics and Communication Engineering', 'B.E. Mechanical Engineering', 'B.E. Mechatronics Engineering', 'B.Tech.Artificial Intelligence And Data Science', 'B.Tech. Computer Science and Business Systems', 'M.E. Applied Electronics', 'M.E. Computer Science And Engineering', 'Master of Business Administration(MBA)', 'M.E. Engineering Design', 'M.Tech. Computer Science and Engineering', 'External'],
    SKACAS: ['B.Sc CS', 'B.Sc CT', 'B.Sc IT', 'B.C.A', 'B.Sc AIML', 'B.Sc Data Science', 'B.Sc Mathematics', 'B.Sc Psychology', 'B.A English', 'B.Com', 'B.Com CA', 'B.Com PA', 'B.Com A & F', 'B.Com CS', 'B.Com IT', 'B.Com BPS', 'B.Com B & I', 'B.B.A CA', 'B.B.A', 'M.Sc CS', 'M.Com', 'PhD CS', 'PhD Commerce', 'PhD Mathematics', 'PhD English', 'External']
  };

  useEffect(() => {
    if (selectedCollege) {
      const departments = collegeDepartmentMapping[selectedCollege] || [];
      setDepartmentOptions(departments);
    }
  }, [selectedCollege]);

  const handleDepartmentChanges = (event) => {
    setSelectedDepartments(event.target.value);
  };

  const handleFacultyNameChange = (event) => {
    setFacultyName(event.target.value);
  };

  const handleInputChange = (index, name, value) => {
    const newRows = [...rows];
    newRows[index][name] = value;

    // Update the cost for the current row
    const cost = (parseFloat(newRows[index].unitPrice) || 0) * (parseFloat(newRows[index].quantity) || 0);
    newRows[index].cost = isNaN(cost) ? '' : cost.toString();
    setRows(newRows);

    // Recalculate the total cost
    let total = 0;
    newRows.forEach((row) => {
      if (!isNaN(parseFloat(row.cost))) {
        total += parseFloat(row.cost);
      }
    });
    setTotalCost(total);
  };

  const removeRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  const addRow = () => {
    const newSNO = rows.length + 1; // Calculate the next SNO
    setRows([...rows, { SNO: newSNO, equipmentList: '', specification: '', unitPrice: '', quantity: '', cost: '' }]);
  };

  const handleSubmit = async () => {
    try {
      // Construct the body object to send to the backend
      const requestBody = {
        selectedCollege,
        facultyName,
        selectedDepartments,
        dateOfPurchase,
        category,
        totalCost,
        comment,
        status,
        equipment: rows.map(row => ({
          equipmentList: row.equipmentList,
          specification: row.specification,
          unitPrice: row.unitPrice,
          quantity: row.quantity,
          cost: row.cost
        }))
      };

      // Send the request to the backend
      const response = await axios.post('', requestBody);
      // const response = await axios.post('http://172.20.10.3:9091/equipment', requestBody);

      if (response.status === 200) {
        console.log('Form submitted successfully');
        alert('Form submitted successfully');
        
        // Clear form fields after successful submission
        setFacultyName('');
        setSelectedDepartments('');
        setDateOfPurchase('');
        setRows([{ SNO: 1, equipmentList: '', specification: '', unitPrice: '', quantity: '', cost: '' }]);
        setTotalCost(0);
        setComment('');
      } else {
        console.error('Failed to submit form:', response.data);
        alert('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error.message);
      alert('Error submitting form: ' + error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>PURCHASE OF EQUIPMENT FORM</h2>
      <div style={styles.formGroup}>
        <label style={styles.label}>Selected College:</label>
        <select value={selectedCollege} onChange={(e) => setSelectedCollege(e.target.value)} style={styles.select}>
          <option value="SKASC">SKASC</option>
          <option value="SKCT">SKCT</option>
          <option value="SKCET">SKCET</option>
          <option value="SKACAS">SKACAS</option>
        </select>
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Name of the Faculty</label>
        <input
          type="text"
          placeholder="Enter Faculty Name"
          value={facultyName}
          onChange={handleFacultyNameChange}
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Department:</label>
        <select
          value={selectedDepartments}
          onChange={handleDepartmentChanges}
          style={styles.select}
        >
          <option value="">Select Department</option>
          {departmentOptions.map((department, index) => (
            <option key={index} value={department}>{department}</option>
          ))}
        </select>
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Date of Purchase</label>
        <input
          type="date"
          value={dateOfPurchase}
          onChange={(e) => setDateOfPurchase(e.target.value)}
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Category</label>
        <input
          type="text"
          placeholder="Enter Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Equipment List</label>
        {rows.map((row, index) => (
          <div key={index} style={styles.row}>
            <input
              type="text"
              placeholder="Equipment"
              value={row.equipmentList}
              onChange={(e) => handleInputChange(index, 'equipmentList', e.target.value)}
              style={styles.inputSmall}
            />
            <input
              type="text"
              placeholder="Specification"
              value={row.specification}
              onChange={(e) => handleInputChange(index, 'specification', e.target.value)}
              style={styles.inputSmall}
            />
            <input
              type="text"
              placeholder="Unit Price"
              value={row.unitPrice}
              onChange={(e) => handleInputChange(index, 'unitPrice', e.target.value)}
              style={styles.inputSmall}
            />
            <input
              type="text"
              placeholder="Quantity"
              value={row.quantity}
              onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
              style={styles.inputSmall}
            />
            <input
              type="text"
              placeholder="Cost"
              value={row.cost}
              readOnly
              style={styles.inputSmall}
            />
            <button onClick={() => removeRow(index)} style={styles.button}>Remove</button>
          </div>
        ))}
        <button onClick={addRow} style={styles.button}>Add Row</button>
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Total Cost</label>
        <input
          type="text"
          value={totalCost}
          readOnly
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Comment</label>
        <textarea
          placeholder="Enter Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={styles.textarea}
        ></textarea>
      </div>
      <button onClick={handleSubmit} style={styles.submitButton}>Submit</button>
    </div>
  );
};

export default Equipment;

// CSS styles for the component
const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '8px',
    boxSizing: 'border-box',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  select: {
    width: '100%',
    padding: '8px',
    boxSizing: 'border-box',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  inputSmall: {
    width: 'calc(20% - 10px)',
    padding: '8px',
    boxSizing: 'border-box',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginRight: '10px',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  button: {
    padding: '8px 16px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginLeft: '10px',
  },
  textarea: {
    width: '100%',
    padding: '8px',
    boxSizing: 'border-box',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  submitButton: {
    display: 'block',
    width: '100%',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};
