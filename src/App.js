import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './components/Signin';
import Home from './components/home';
import CustomDrawerContent from './components/CustomDrawerContent';
import SelectForm from './components/selectform';
import ActivityBudget from './components/activitybudget';
import FacultyBudget from './components/facultybudget';
import StudentBudget from './components/studentbudget';
import Equipment from './components/equipment';
import Admin from './components/Admin';
import Status from './components/Status';
import RegisteredFormView from './components/RegisteredFormView';
import BottomTabNavigator from './components/BottomTabNavigator';
import College from './components/College';
import EquipmentView from './components/equipmentview';
import StudentBudgetView from './components/studentbudgetview';
import FacultyBudgetView from './components/facultybudgetview';
import ActivityBudgetView from './components/activitybudgetview';
import CustomDrawerAdmin from './components/CustomDrawerAdmin';
import BudgetFormView from './components/activitybudgetview';
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Signin />} />
                
        
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/customdraweradmin" element={<CustomDrawerAdmin />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/selectform" element={<SelectForm />} />
                    <Route path="/activitybudget" element={<ActivityBudget />} />
                    <Route path="/facultybudget" element={<FacultyBudget />} />
                    <Route path="/studentbudget" element={<StudentBudget />} />
                    <Route path="/equipment" element={<Equipment />} />
                    <Route path="/status" element={<Status />} />
                    <Route path="/customdrawercontent" element={<CustomDrawerContent />} />
                    <Route path="/registeredformview" element={<RegisteredFormView />} />
                    <Route path="/college" element={<College />} />
                    <Route path="/activitybudgetview" element={<BudgetFormView />} />
                    <Route path="/equipmentview" element={<EquipmentView />} />
                    <Route path="/studentbudgetview" element={<StudentBudgetView />} />
                    <Route path="/facultybudgetview" element={<FacultyBudgetView />} />
                {/* </Route> */}
                
            </Routes>
        </Router>
    );
}
