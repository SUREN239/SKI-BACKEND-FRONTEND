import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Checkbox = ({ checked, onChange, value }) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      value={value}
    />
  );
};

const BudgetForm = ({ college }) => {
  const [selectedCollege, setSelectedCollege] = useState(college);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedTimeFrom, setSelectedTimeFrom] = useState('00:00');
  const [selectedTimeTo, setSelectedTimeTo] = useState('00:00');
  const [duration, setDuration] = useState('');
  const [selectedActivityType, setSelectedActivityType] = useState('');
  const [selectedActivityAffiliation, setSelectedActivityAffiliation] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [departmentSelections, setDepartmentSelections] = useState({});
  const [facultyName, setFacultyName] = useState('');
  const [facultyNumber, setFacultyNumber] = useState('');
  const [comment, setComment] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState('Pending');
  const [academicYearSelections, setAcademicYearSelections] = useState({
    firstYear: false,
    secondYear: false,
    thirdYear: false,
    finalYear: false,
  });
  const [rows, setRows] = useState([{ sno: '', particulars: '', amount: '' }]);
  const [resourceRows, setResourceRows] = useState([{ resourceName: '', designation: '', companyDetails: '', contactNumber: '' }]);
  const [totalBudget, setTotalBudget] = useState(0);

  const collegeDepartmentMapping = {
    SKASC: ['B.A. English Literature', 'M.A. English Literature', 'B.Sc. Mathematics', 'M.Sc. Mathematics with Big Data', 'B.Sc. Artificial Intelligence and Machine Learning', 'B.Sc. Data Science', 'M.Sc. Software Systems', 'B.Sc.Computer Technology', 'B.C.A. (Computer Applications)', 'B.Sc. Computer Science And Applications', 'B.Sc. Computer Science', 'B.Sc. Software Systems', 'B.Sc. Information Technology', 'B.Sc. Computer Science with Cognitive Systems', 'M.Sc. Information Technology', 'M.Sc. Computer Science', 'B.Sc. Electronics and Communication Systems', 'M.Sc. Electronics and Communication Systems', 'B.Sc. Costume Design and Fashion', 'B.Sc.Catering Science and Hotel Management', 'B.Sc. Biotechnology', 'B.Sc. Microbiology', 'M.Sc. Microbiology', 'M.Sc. Bioinformatics', 'B.Com.(Commerce)', 'M.Com.(Commerce)', 'M.Com. International Business', 'B.Com.Corporate Secretaryship', 'B.Com. Professional Accounting', 'B.Com. Business Process Service', 'B.Com. Banking and Insurance', 'B.Com. Accounting and Finance', 'B.Com. Capital Market', 'B.Com. Computer Applications', 'B.Com. Business Analytics', 'B.Com. Information Technology', 'B.Com. E Commerce', 'B.B.A. Business Administration ', 'B.B.A. Computer Applications', 'B.B.A. Logistics', 'B.Sc. Information Systems Management', 'B.Sc. Psychology', 'M.S.. (Social Work)', 'M.A. Public Administration', 'External'],
    SKCT: ['B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'Science & Humanities', 'B.E. Civil Engineering', 'B.E. Mechanical Engineering', 'B.E. Computer Science and Engineering', 'B.Tech Information Technology', 'Master of Business Administration(MBA)', 'B.Tech.Artificial Intelligence And Data Science', 'B.Tech. Internet of Things', 'B.Tech Cyber Security', 'B.Tech Artificial Intelligence and Machine Learning', 'External'],
    SKCET: ['B.Tech Information Technology', 'B.E. Civil Engineering', 'B.E. Computer Science and Engineering', 'B.E. Computer Science and Engineering(Cyber Security)', 'B.E. Electronics Engineering', 'B.E. Electronics and Communication Engineering', 'B.E. Mechanical Engineering', 'B.E. Mechatronics Engineering', 'B.Tech.Artificial Intelligence And Data Science', 'B.Tech. Computer Science and Business Systems', 'M.E. Applied Electronics', 'M.E. Computer Science And Engineering', 'Master of Business Administration(MBA)', 'M.E. Engineering Design', 'M.Tech. Computer Science and Engineering', 'External'],
    SKACAS: ['B.Sc CS', 'B.Sc CT', 'B.Sc IT', 'B.C.A', 'B.Sc AIML', 'B.Sc Data Science', 'B.Sc Mathematics', 'B.Sc Psychology', 'B.A English', 'B.Com', 'B.Com CA', 'B.Com PA', 'B.Com A & F', 'B.Com CS', 'B.Com IT', 'B.Com BPS', 'B.Com B & I', 'B.B.A CA', 'B.B.A', 'M.Sc CS', 'M.Com', 'PhD CS', 'PhD Commerce', 'PhD Mathematics', 'PhD English', 'External']
  };
  

  useEffect(() => {
    if (selectedCollege) {
      const departments = collegeDepartmentMapping[selectedCollege] || [];
      const initialSelections = departments.reduce((selections, department) => {
        selections[department] = false;
        return selections;
      }, {});
      setDepartmentSelections(initialSelections);
    }
  }, [selectedCollege]);

  const handleCollegeChange = (event) => {
    setSelectedCollege(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    const department = event.target.value;
    setDepartmentSelections(prevSelections => ({
      ...prevSelections,
      [department]: !prevSelections[department],
    }));
  };

  const handleAcademicYearChange = (event) => {
    const year = event.target.name;
    setAcademicYearSelections(prevSelections => ({
      ...prevSelections,
      [year]: !prevSelections[year],
    }));
  };

  const handleTimeFromChange = (event) => {
    const time = event.target.value;
    setSelectedTimeFrom(time);
    calculateDuration(time, selectedTimeTo);
  };

  const handleTimeToChange = (event) => {
    const time = event.target.value;
    setSelectedTimeTo(time);
    calculateDuration(selectedTimeFrom, time);
  };

  const calculateDuration = (from, to) => {
    const [fromHours, fromMinutes] = from.split(':').map(Number);
    const [toHours, toMinutes] = to.split(':').map(Number);
    let diff = (toHours * 60 + toMinutes) - (fromHours * 60 + fromMinutes);
    if (diff < 0) {
      diff += 24 * 60;
    }
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    setDuration(`${hours} hours ${minutes} minutes`);
  };

  const handleInputChange = (index, name, value) => {
    const newRows = [...rows];
    newRows[index][name] = value;
    setRows(newRows);
    updateTotal();
  };

  const handleInputChange1 = (index, name, value) => {
    const newRows = [...resourceRows];
    newRows[index][name] = value;
    setResourceRows(newRows);
  };

  const addRow = () => {
    setRows([...rows, { sno: '', particulars: '', amount: '' }]);
  };

  const addRow1 = () => {
    setResourceRows([...resourceRows, { resourceName: '', designation: '', companyDetails: '', contactNumber: '' }]);
  };

  const removeRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
    updateTotal();
  };

  const removeRow1 = (index) => {
    const newRows = [...resourceRows];
    newRows.splice(index, 1);
    setResourceRows(newRows);
  };

  const updateTotal = () => {
    let total = 0;
    rows.forEach(row => {
      total += parseFloat(row.amount) || 0;
    });
    setTotalBudget(total);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const pickDocument = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const uploadFile = async () => {
    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);

        const response = await axios.post('http://172.20.10.3:9091/file', formData);
        console.log('File upload response:', response.data);
        alert('File uploaded successfully');
      } else {
        alert('Please select a file first');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file');
    }
  };

  const handleSubmit = async () => {
    try {
      const selectedAcademicYears = Object.keys(academicYearSelections).filter(key => academicYearSelections[key]);
      const selectedDepartments = Object.keys(departmentSelections).filter(key => departmentSelections[key]);

      // const response = await fetch('http://172.20.10.3:9091/budgetevent', {
      const response = await fetch('http://172.20.10.3:9091/budgetevent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          college: selectedCollege,
          dateFrom,
          dateTo,
          department: selectedDepartments,
          timeFrom: selectedTimeFrom,
          timeTo: selectedTimeTo,
          duration,
          activityType: selectedActivityType,
          activityAffiliation: selectedActivityAffiliation,
          eventTitle,
          academicYear: selectedAcademicYears,
          facultyName,
          facultyNumber,
          comment,
          resourcePersons: resourceRows,
          particulars: rows,
          totalAmount: totalBudget,
          status,
        }),
      });

      if (response.ok) {
        alert('Data submitted successfully');
      } else {
        alert('Failed to submit data');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Failed to submit data');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Budget Form</h1>
      <form>
        <div style={styles.section}>
          <label style={styles.label}>College:</label>
          <select value={selectedCollege} onChange={handleCollegeChange} style={styles.select}>
            <option value="">Select a college</option>
            <option value="SKASC">SKASC</option>
            <option value="SKCT">SKCT</option>
            <option value="SKCET">SKCET</option>
            <option value="SKACAS">SKACAS</option>
          </select>
        </div>
        <div style={styles.section}>
          <label style={styles.label}>From:</label>
          <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} style={styles.input} />
          <label style={styles.label}>To:</label>
          <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} style={styles.input} />
        </div>
        <div style={styles.section}>
          <label style={styles.label}>Department:</label>
          {selectedCollege && collegeDepartmentMapping[selectedCollege] && (
            collegeDepartmentMapping[selectedCollege].map(department => (
              <div key={department} style={styles.checkboxContainer}>
                <Checkbox
                  checked={departmentSelections[department] || false}
                  onChange={handleDepartmentChange}
                  value={department}
                />
                <label style={styles.checkboxLabel}>{department}</label>
              </div>
            ))
          )}
        </div>
        <div style={styles.section}>
          <label style={styles.label}>Time from:</label>
          <input type="time" value={selectedTimeFrom} onChange={handleTimeFromChange} style={styles.input} />
          <label style={styles.label}>Time to:</label>
          <input type="time" value={selectedTimeTo} onChange={handleTimeToChange} style={styles.input} />
          <p>Duration: {duration}</p>
        </div>
        <div style={styles.section}>
          <label style={styles.label}>Activity Type:</label>
          <input type="text" value={selectedActivityType} onChange={(e) => setSelectedActivityType(e.target.value)} style={styles.input} />
        </div>
        <div style={styles.section}>
          <label style={styles.label}>Activity Affiliation:</label>
          <input type="text" value={selectedActivityAffiliation} onChange={(e) => setSelectedActivityAffiliation(e.target.value)} style={styles.input} />
        </div>
        <div style={styles.section}>
          <label style={styles.label}>Event Title:</label>
          <input type="text" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} style={styles.input} />
        </div>



        <div style={styles.section}>
          <label style={styles.label}>Academic Year:</label>
          <div style={styles.checkboxContainer}>
            <input
            type='checkbox'
              checked={academicYearSelections.firstYear}
              onChange={handleAcademicYearChange}
              name="firstYear"
            />
            <label style={styles.checkboxLabel}>First Year</label>
          </div>
          <div style={styles.checkboxContainer}>
            <input
            type='checkbox'
              checked={academicYearSelections.secondYear}
              onChange={handleAcademicYearChange}
              name="secondYear"
            />
            <label style={styles.checkboxLabel}>Second Year</label>
          </div>
          <div style={styles.checkboxContainer}>
           <input
            type='checkbox'
              checked={academicYearSelections.thirdYear}
              onChange={handleAcademicYearChange}
              name="thirdYear"
            />
            <label style={styles.checkboxLabel}>Third Year</label>
          </div>
          <div style={styles.checkboxContainer}>
            <input
            type='checkbox'
              checked={academicYearSelections.finalYear}
              onChange={handleAcademicYearChange}
              name="finalYear"
            />
            <label style={styles.checkboxLabel}>Final Year</label>
          </div>
        </div>
        <div style={styles.section}>
          <label style={styles.label}>Faculty Name:</label>
          <input type="text" value={facultyName} onChange={(e) => setFacultyName(e.target.value)} style={styles.input} />
          <label style={styles.label}>Faculty Number:</label>
          <input type="text" value={facultyNumber} onChange={(e) => setFacultyNumber(e.target.value)} style={styles.input} />
        </div>
        <div style={styles.section}>
          <label style={styles.label}>Comment:</label>
          <textarea value={comment} onChange={handleCommentChange} style={styles.textarea}></textarea>
        </div>
        <div style={styles.section}>
          <label style={styles.label}>Upload Document:</label>
          <input type="file" onChange={pickDocument} style={styles.inputFile} />
          <button type="button" onClick={uploadFile} style={styles.button}>Upload</button>
        </div>
        <div style={styles.section}>
          <label style={styles.label}>Resources:</label>
          {resourceRows.map((row, index) => (
            <div key={index} style={styles.row}>
              <input
                type="text"
                value={row.resourceName}
                onChange={(e) => handleInputChange1(index, 'resourceName', e.target.value)}
                placeholder="Resource Name"
                style={styles.input}
              />
              <input
                type="text"
                value={row.designation}
                onChange={(e) => handleInputChange1(index, 'designation', e.target.value)}
                placeholder="Designation"
                style={styles.input}
              />
              <input
                type="text"
                value={row.companyDetails}
                onChange={(e) => handleInputChange1(index, 'companyDetails', e.target.value)}
                placeholder="Company Details"
                style={styles.input}
              />
              <input
                type="text"
                value={row.contactNumber}
                onChange={(e) => handleInputChange1(index, 'contactNumber', e.target.value)}
                placeholder="Contact Number"
                style={styles.input}
              />
              <button type="button" onClick={() => removeRow1(index)} style={styles.buttonRemove}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={addRow1} style={styles.button}>Add Resource</button>
        </div>
        <div style={styles.section}>
          <label style={styles.label}>Budget:</label>
          {rows.map((row, index) => (
            <div key={index} style={styles.row}>
              <input
                type="text"
                value={row.sno}
                onChange={(e) => handleInputChange(index, 'sno', e.target.value)}
                placeholder="S.No"
                style={styles.input}
              />
              <input
                type="text"
                value={row.particulars}
                onChange={(e) => handleInputChange(index, 'particulars', e.target.value)}
                placeholder="Particulars"
                style={styles.input}
              />
              <input
                type="text"
                value={row.amount}
                onChange={(e) => handleInputChange(index, 'amount', e.target.value)}
                placeholder="Amount"
                style={styles.input}
              />
              <button type="button" onClick={() => removeRow(index)} style={styles.buttonRemove}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={addRow} style={styles.button}>Add Row</button>
        </div>
        <div style={styles.section}>
          <label style={styles.label}>Total Budget: {totalBudget}</label>
        </div>
        <div style={styles.section}>
          <button type="button" onClick={handleSubmit} style={styles.button}>Submit</button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    margin: '20px auto',
    padding: '20px',
    maxWidth: '800px',
    backgroundColor: '#f7f7f7',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '24px',
    textAlign: 'center',
    marginBottom: '20px',
  },
  section: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginBottom: '10px',
  },
  select: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginBottom: '10px',
  },
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  checkboxLabel: {
    marginLeft: '5px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginBottom: '10px',
  },
  inputFile: {
    width: '100%',
    marginBottom: '10px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  buttonRemove: {
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginLeft: '10px',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
};

export default BudgetForm;
