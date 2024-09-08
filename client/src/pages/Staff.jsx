import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../styling/Staff.css";
import Dashboard from './Dashboard';

const StaffPage = () => {
    const [staff, setStaffMember] = useState([]);
    const [newStaffMember, setNewStaffMember] = useState({
        StaffID: '',
        StaffName: '',
        StaffEmail: '',
        Position: '',
    });
    const [selectedStaffMember, setSelectedStaff] = useState(null);
    const [editMode, setEditMode] = useState(false);


    useEffect(() => {
        fetchStaff();
    }, []);

    const fetchStaff = async () => {
        try {
            const response = await axios.get('http://localhost:7000/Staff');
            setStaffMember(response.data);
        } catch (error) {
            console.error('Error fetching staff Member:', error);
        }
    };

    const handleChange = (e) => {
        
        setNewStaffMember((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(newStaffMember);
        try {
            await axios.post('http://localhost:7000/Staff/create', newStaffMember);
            setNewStaffMember({
                StaffID: '',
                StaffName: '',
                StaffEmail: '',
                Position: '',
            });
            fetchStaff();
        } catch (error) {
            console.error('Error creating staff Member:', error);
        }
    };

    const handleDelete = async (StaffID) => {
        try {
            await axios.delete(`http://localhost:7000/Staff/delete/${StaffID}`);
            fetchStaff();
        } catch (error) {
            console.error('Error deleting staff Member:', error);
        }
    };

    const handleUpdate = async () => {
        if (!selectedStaffMember) return;
        try {
            await axios.put(`http://localhost:7000/Staff/update/${selectedStaffMember.StaffID}`, selectedStaffMember);
            setEditMode(false);
            setSelectedStaff(null);
            fetchStaff();
        } catch (error) {
            console.error('Error updating staff Member:', error);
        }
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setSelectedStaff((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEditClick = (staff) => {
        setSelectedStaff(staff);
        setEditMode(true);
    };



    return (
        <div className='home'>
            <h2>Staff Page</h2>

            <div className="staff-details">
                <table>
                    <thead>
                        <tr>
                            <th>Staff ID</th>
                            <th>Staff Name</th>
                            <th>Staff Email</th>
                            <th>Position</th>
                            <th></th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {staff.map((staff) => (
                            <tr key={staff.StaffID}>
                                <td>{staff.StaffID}</td>
                                <td>{staff.StaffName}</td>
                                <td>{staff.StaffEmail}</td>
                                <td>{staff.Position}</td>
                                <td>
                                    <button onClick={() => handleDelete(staff.StaffID)}>Delete</button>
                                    <button onClick={() => handleEditClick(staff)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="form-container">
                {editMode && selectedStaffMember && (
                    <div>
                        <div className="form-center">
                            <h3>Edit Staff</h3>
                            <form className='staff-form'>
                                <input
                                    type="text"
                                    name="StaffID"
                                    placeholder="Staff ID"
                                    value={selectedStaffMember.StaffID}
                                    onChange={(e) => setSelectedStaff({ ...selectedStaffMember, StaffID: e.target.value })}
                                />
                                <input
                                    type="text"
                                    name="StaffName"
                                    placeholder="Staff Name"
                                    value={selectedStaffMember.StaffName}
                                    onChange={(e) => setSelectedStaff({ ...selectedStaffMember, StaffName: e.target.value })}
                                />
                                <input
                                    type="text"
                                    name="StaffEmail"
                                    placeholder="Staff Email"
                                    value={selectedStaffMember.StaffEmail}
                                    onChange={(e) => setSelectedStaff({ ...selectedStaffMember, StaffEmail: e.target.value })}
                                />
                                <input
                                    type="text"
                                    name="Position"
                                    placeholder="Staff position"
                                    value={selectedStaffMember.Position}
                                    onChange={(e) => setSelectedStaff({ ...selectedStaffMember, Position: e.target.value })}
                                />
                                <button type="button" onClick={handleUpdate}>Save</button>
                            </form>
                        </div>
                    </div>
                )}

                {!editMode && (
                    <div>
                        <div className="form-center">
                            <h3>Add New Staff Member</h3>
                            <form onSubmit={handleSubmit} className='staff-form'>
                                <input
                                    type="text"
                                    name="StaffID"
                                    placeholder="Staff ID"
                                    value={newStaffMember.StaffID}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="StaffName"
                                    placeholder="Staff Name"
                                    value={newStaffMember.StaffName}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="StaffEmail"
                                    placeholder="Staff Email"
                                    value={newStaffMember.StaffEmail}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="Position"
                                    placeholder="Position"
                                    value={newStaffMember.Position}
                                    onChange={handleChange}
                                />
                                <button type="submit" className='DashButton'>Add Staff Member</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            <Link to="/dashboard"><button className='DashButton'>Back to Dashboard</button></Link>
        </div>
    );
};

export default StaffPage;