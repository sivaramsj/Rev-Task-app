import React, { useState, useEffect } from 'react';
import UserRow from './UserRow';
import './DisplayUser.css';
import api from '../../config/api';

function DisplayUser({openModal}) {
    const [employees, setEmployees] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');

    const fetchUsers = async () => {
        try {
            const response = await api.get('/employee');
            setEmployees(response.data.data);
            setFilteredEmployees(response.data.data);  
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };
    useEffect(()=>{
        fetchUsers()
    },[])

    useEffect(() => {
        handleSearch();
    }, [searchQuery, employees, selectedRole]);

    const handleSearch = () => {
        let filtered = employees.filter((employee) =>
            employee.employeeName.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (selectedRole) {
            filtered = filtered.filter(employee => employee.role.toLowerCase() === selectedRole.toLowerCase());
        }

        setFilteredEmployees(filtered);
    };

    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
    };

    
    return (
        <>
            <div className='user-display-component'> 
                <div className="search-filter-container">
                        <input
                            type="text"
                            placeholder="Search by name ..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            id="user-search-input"
                        />
                        <select 
                            value={selectedRole}
                            onChange={handleRoleChange}
                            className="filter-button"
                        >
                            <option value="">Filter by Role</option>
                            <option value="Admin">Admin</option>
                            <option value="Manager">Manager</option>
                            <option value="Associate">Associate</option>
                        </select>
                    </div>
                    <div className="users-container ">
                        {Array.isArray(employees) && employees.length > 0 ? (
                            filteredEmployees.map((employee) => <UserRow key={employee.employeeId} employee={employee} openModal={openModal}/>)
                        ) : (
                            <p>No users available.</p>
                        )}
                    </div>
             </div>
        </>
    );
}

export default DisplayUser;
