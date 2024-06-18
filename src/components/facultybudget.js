import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
    margin: '0 auto',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    fontSize: '16px',
    marginBottom: '5px',
    display: 'block',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  tableContainer: {
    marginBottom: '20px',
  },
  tableHead: {
    display: 'flex',
    flexDirection: 'row',
    borderBottom: '2px solid #000',
    paddingBottom: '10px',
    marginBottom: '10px',
  },
  tableHeaderCell: {
    flex: 1,
    fontSize: '16px',
    fontWeight: 'bold',
  },
  tableBody: {},
  tableRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '10px',
  },
  tableCell: {
    flex: 1,
    fontSize: '16px',
  },
  facultyInput: {
    marginRight: '10px',
  },
  addButton: {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    textAlign: 'center',
    borderRadius: '4px',
    cursor: 'pointer',
    border: 'none',
  },
  addButtonText: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    textAlign: 'center',
    borderRadius: '4px',
    cursor: 'pointer',
    border: 'none',
    display: 'block',
    margin: '20px auto 0',
  },
  removeButton: {
    padding: '5px 10px',
    backgroundColor: '#dc3545',
    color: '#fff',
    textAlign: 'center',
    borderRadius: '4px',
    cursor: 'pointer',
    border: 'none',
    marginLeft: '10px',
  },
};

const FacultyBudget = () => {
  const { college } = useParams();
  
  const [selectedCollege, setSelectedCollege] = useState(college);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [minDateForTo, setMinDateForTo] = useState('');
  const [departmentSelections, setDepartmentSelections] = useState({});
  const [facultyRows, setFacultyRows] = useState([{ facultyName: '', designation: '', departmentSelections: '' }]);
  const [selectedTimeFrom, setSelectedTimeFrom] = useState(new Date());
  const [selectedTimeTo, setSelectedTimeTo] = useState(new Date());
  const [duration, setDuration] = useState('');
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

  const sendToDatabase = () => {
    console.log("status:", status);
  };

  const addFacultyRow = () => {
    setFacultyRows([...facultyRows, { facultyName: '', designation: '', departmentSelections: '' }]);
  };

  const removeFacultyRow = (index) => {
    const newRows = [...facultyRows];
    newRows.splice(index, 1);
    setFacultyRows(newRows);
  };

  const updateFacultyRow = (index, field, value) => {
    const newRows = [...facultyRows];
    newRows[index][field] = value;
    setFacultyRows(newRows);
  };

  const handleDateFromSelect = (date) => {
    setDateFrom(date);
    setDateTo(date);
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    const minDateForTo = nextDate.toISOString().split('T')[0];
    setMinDateForTo(minDateForTo);
  };

  const handleDateToSelect = (date) => {
    setDateTo(date);
  };

  const handleTimeFromChange = (event) => {
    const selected = event.target.value;
    const date = new Date();
    const [hours, minutes] = selected.split(':');
    date.setHours(hours);
    date.setMinutes(minutes);
    setSelectedTimeFrom(date);
    calculateDuration(date, selectedTimeTo);
  };

  const handleTimeToChange = (event) => {
    const selected = event.target.value;
    const date = new Date();
    const [hours, minutes] = selected.split(':');
    date.setHours(hours);
    date.setMinutes(minutes);
    setSelectedTimeTo(date);
    calculateDuration(selectedTimeFrom, date);
  };

  const calculateDuration = (start, end) => {
    const diff = end - start;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    setDuration(`${hours} hours and ${minutes} minutes`);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Faculty Budget</h1>
      
      <div style={styles.formGroup}>
        <label style={styles.label} htmlFor="college">Selected College</label>
        <select
          style={styles.input}
          id="college"
          value={selectedCollege}
          onChange={(e) => setSelectedCollege(e.target.value)}
        >
          <option value="SKASC">SKASC</option>
          <option value="SKCT">SKCT</option>
          <option value="SKCET">SKCET</option>
          <option value="SKACAS">SKACAS</option>
        </select>
      </div>
      
      <div style={styles.formGroup}>
        <label style={styles.label} htmlFor="dateFrom">Date From</label>
        <input
          style={styles.input}
          type="date"
          id="dateFrom"
          value={dateFrom}
          onChange={(e) => handleDateFromSelect(e.target.value)}
        />
      </div>
      
      <div style={styles.formGroup}>
        <label style={styles.label} htmlFor="dateTo">Date To</label>
        <input
          style={styles.input}
          type="date"
          id="dateTo"
          value={dateTo}
          min={minDateForTo}
          onChange={(e) => handleDateToSelect(e.target.value)}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label} htmlFor="timeFrom">Time From</label>
        <input
          style={styles.input}
          type="time"
          id="timeFrom"
          value={selectedTimeFrom.toTimeString().substr(0, 5)}
          onChange={handleTimeFromChange}
        />
      </div>
      
      <div style={styles.formGroup}>
        <label style={styles.label} htmlFor="timeTo">Time To</label>
        <input
          style={styles.input}
          type="time"
          id="timeTo"
          value={selectedTimeTo.toTimeString().substr(0, 5)}
          onChange={handleTimeToChange}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Duration</label>
        <div>{duration}</div>
      </div>

      <div style={styles.tableContainer}>
        <div style={styles.tableHead}>
          <div style={styles.tableHeaderCell}>Faculty Name</div>
          <div style={styles.tableHeaderCell}>Designation</div>
          <div style={styles.tableHeaderCell}>Department</div>
          <div style={styles.tableHeaderCell}></div>
        </div>
        <div style={styles.tableBody}>
          {facultyRows.map((row, index) => (
            <div style={styles.tableRow} key={index}>
              <input
                style={{ ...styles.input, ...styles.facultyInput }}
                type="text"
                placeholder="Faculty Name"
                value={row.facultyName}
                onChange={(e) => updateFacultyRow(index, 'facultyName', e.target.value)}
              />
              <input
                style={{ ...styles.input, ...styles.facultyInput }}
                type="text"
                placeholder="Designation"
                value={row.designation}
                onChange={(e) => updateFacultyRow(index, 'designation', e.target.value)}
              />
              <select
                style={{ ...styles.input, ...styles.facultyInput }}
                value={row.departmentSelections}
                onChange={(e) => updateFacultyRow(index, 'departmentSelections', e.target.value)}
              >
                <option value="">Select Department</option>
                {departmentOptions.map((department, i) => (
                  <option key={i} value={department}>{department}</option>
                ))}
              </select>
              {index > 0 && (
                <button style={styles.removeButton} onClick={() => removeFacultyRow(index)}>Remove</button>
              )}
            </div>
          ))}
        </div>
      </div>

      <button style={styles.addButton} onClick={addFacultyRow}>
        <span style={styles.addButtonText}>Add Faculty</span>
      </button>
      
      <button style={styles.submitButton} onClick={sendToDatabase}>
        Submit
      </button>
    </div>
  );
};

export default FacultyBudget;
