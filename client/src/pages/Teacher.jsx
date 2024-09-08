import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../styling/Teacher.css";
import Dashboard from './Dashboard';

const TeacherPage = () => {
    const [teachers, setTeachers] = useState([]);
    const [newTeacher, setNewTeacher] = useState({
        TeacherID: '',
        TeacherName: '',
        TeacherEmail: '',
        Subject: '',
    });
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        try {
            const response = await axios.get('http://localhost:7000/Teachers');
            setTeachers(response.data);
        } catch (error) {
            console.error('Error fetching teachers:', error);
        }
    };

    const handleChange = (e) => {
        setNewTeacher((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:7000/Teachers/create', newTeacher);
            setNewTeacher({
                TeacherID: '',
                TeacherName: '',
                TeacherEmail: '',
                Subject: '',
            });
            fetchTeachers();
        } catch (error) {
            console.error('Error creating teacher:', error);
        }
    };

    const handleDelete = async (TeacherID) => {
        try {
            await axios.delete(`http://localhost:7000/Teachers/delete/${TeacherID}`);
            fetchTeachers();
        } catch (error) {
            console.error('Error deleting teacher:', error);
        }
    };

    const handleUpdate = async () => {
        if (!selectedTeacher) return;
        try {
            await axios.put(`http://localhost:7000/Teachers/update/${selectedTeacher.TeacherID}`, selectedTeacher);
            setEditMode(false);
            setSelectedTeacher(null);
            fetchTeachers();
        } catch (error) {
            console.error('Error updating teacher:', error);
        }
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setSelectedTeacher((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEditClick = (teacher) => {
        setSelectedTeacher(teacher);
        setEditMode(true);
    };

    return (
        <div className='home'>
            <h2>Teacher Page</h2>

            <div className="teacher-details">
                <table>
                    <thead>
                        <tr>
                            <th>Teacher ID</th>
                            <th>Teacher Name</th>
                            <th>Teacher Email</th>
                            <th>Subject</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.map((teacher) => (
                            <tr key={teacher.TeacherID}>
                                <td>{teacher.TeacherID}</td>
                                <td>{teacher.TeacherName}</td>
                                <td>{teacher.TeacherEmail}</td>
                                <td>{teacher.Subject}</td>
                                <td>
                                    <button onClick={() => handleDelete(teacher.TeacherID)}>Delete</button>
                                    <button onClick={() => handleEditClick(teacher)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="form-container">
                {editMode && selectedTeacher && (
                    <div>
                        <div className="form-center">
                            <h3>Edit Teacher</h3>
                            <form className='teacher-form'>
                                <input
                                    type="text"
                                    name="TeacherID"
                                    placeholder="Teacher ID"
                                    value={selectedTeacher.TeacherID}
                                    onChange={handleUpdateChange}
                                />
                                <input
                                    type="text"
                                    name="TeacherName"
                                    placeholder="Teacher Name"
                                    value={selectedTeacher.TeacherName}
                                    onChange={handleUpdateChange}
                                />
                                <input
                                    type="text"
                                    name="TeacherEmail"
                                    placeholder="Teacher Email"
                                    value={selectedTeacher.TeacherEmail}
                                    onChange={handleUpdateChange}
                                />
                                <input
                                    type="text"
                                    name="Subject"
                                    placeholder="Subject"
                                    value={selectedTeacher.Subject}
                                    onChange={handleUpdateChange}
                                />
                                <button type="button" onClick={handleUpdate}>Save</button>
                            </form>
                        </div>
                    </div>
                )}

                {!editMode && (
                    <div>
                        <div className="form-center">
                            <h3>Add New Teacher</h3>
                            <form onSubmit={handleSubmit} className='teacher-form'>
                                <input
                                    type="text"
                                    name="TeacherID"
                                    placeholder="Teacher ID"
                                    value={newTeacher.TeacherID}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="TeacherName"
                                    placeholder="Teacher Name"
                                    value={newTeacher.TeacherName}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="TeacherEmail"
                                    placeholder="Teacher Email"
                                    value={newTeacher.TeacherEmail}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="Subject"
                                    placeholder="Subject"
                                    value={newTeacher.Subject}
                                    onChange={handleChange}
                                />
                                <button type="submit" className='DashButton'>Add Teacher</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            <Link to="/dashboard"><button className='DashButton'>Back to Dashboard</button></Link>
        </div>
    );
};

export default TeacherPage;
