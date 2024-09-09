import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../styling/Class.css";
import Dashboard from './Dashboard';

const ClassPage = () => {
    const [classes, setClasses] = useState([]);
    const [newClass, setNewClass] = useState({
        ClassID: '',
        ClassName: '',
        ClassTeacher: '',
        StudentCount: '',
    });
    const [selectedClass, setSelectedClass] = useState(null);
    const [editMode, setEditMode] = useState(false);


    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        try {
            const response = await axios.get('http://localhost:7000/Class');
            setClasses(response.data);
        } catch (error) {
            console.error('Error fetching classes:', error);
        }
    };

    const handleChange = (e) => {
        // const { name, value } = e.target;
        // console.log(e.target);
        setNewClass((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
    };

    //when user click submit button
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('New Class Data:', newClass);
        try {
            await axios.post('http://localhost:7000/Class/create', newClass);
            setNewClass({
                ClassID: '',
                ClassName: '',
                ClassTeacher: '',
                StudentCount: '',
            });
            fetchClasses();
        } catch (error) {
            console.error('Error creating class:', error.response ? error.response.data : error.message);
        }
    };
    
    

    const handleDelete = async (ClassID) => {
        try {
            await axios.delete(`http://localhost:7000/Class/delete/${ClassID}`);
            fetchClasses();
        } catch (error) {
            console.error('Error deleting class:', error);
        }
    };

    const handleUpdate = async () => {
        if (!selectedClass) return;
        try {
            await axios.put(`http://localhost:7000/Class/update/${selectedClass.ClassID}`, selectedClass);
            setEditMode(false);
            setSelectedClass(null);
            fetchClasses();
        } catch (error) {
            console.error('Error updating class:', error);
        }
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setSelectedClass((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEditClick = (grade) => {
        setSelectedClass(grade);
        setEditMode(true);
    };



    return (
        <div className='home'>
            <h2>Class Page</h2>

            <div className="class-details">
                <table>
                    <thead>
                        <tr>
                            <th>Class ID</th>
                            <th>Class Name</th>
                            <th>Class Teacher</th>
                            <th>Student Count</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.map((grade) => (
                            <tr key={grade.ClassID}>
                                <td>{grade.ClassID}</td>
                                <td>{grade.ClassName}</td>
                                <td>{grade.ClassTeacher}</td>
                                <td>{grade.StudentCount}</td>
                                <td>
                                    <button onClick={() => handleDelete(grade.ClassID)}>Delete</button>
                                    <button onClick={() => handleEditClick(grade)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="form-container">
                {editMode && selectedClass && (
                    <div>
                        <div className="form-center">
                            <h3>Edit Class</h3>
                            <form className='class-form'>
                                <input
                                    type="text"
                                    name="ClassID"
                                    placeholder="Class ID"
                                    value={selectedClass.ClassID}
                                    onChange={(e) => setSelectedClass({ ...selectedClass, ClassID: e.target.value })}
                                />
                                <input
                                    type="text"
                                    name="ClassName"
                                    placeholder="Class Name"
                                    value={selectedClass.ClassName}
                                    onChange={(e) => setSelectedClass({ ...selectedClass, ClassName: e.target.value })}
                                />
                                <input
                                    type="text"
                                    name="ClassTeacher"
                                    placeholder="Class Teacher"
                                    value={selectedClass.ClassTeacher}
                                    onChange={(e) => setSelectedClass({ ...selectedClass, ClassTeacher: e.target.value })}
                                />
                                <input
                                    type="text"
                                    name="StudentCount"
                                    placeholder="Student Count"
                                    value={selectedClass.StudentCount}
                                    onChange={(e) => setSelectedClass({ ...selectedClass, StudentCount: e.target.value })}
                                />
                                <button type="button" onClick={handleUpdate}>Save</button>
                            </form>
                        </div>
                    </div>
                )}

                {!editMode && (
                    <div>
                        <div className="form-center">
                            <h3>Add New Class</h3>
                            <form onSubmit={handleSubmit} className='class-form'>
                                <input
                                    type="text"
                                    name="ClassID"
                                    placeholder="Class ID"
                                    value={newClass.ClassID}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="ClassName"
                                    placeholder="Class Name"
                                    value={newClass.ClassName}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="ClassTeacher"
                                    placeholder="Class Teacher"
                                    value={newClass.ClassTeacher}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="StudentCount"
                                    placeholder="Student Count "
                                    value={newClass.StudentCount}
                                    onChange={handleChange}
                                />
                                <button type="submit" className='DashButton'>Add Class</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            <Link to="/dashboard"><button className='DashButton'>Back to Dashboard</button></Link>
        </div>
    );
};

export default ClassPage;
