import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../styling/Student.css";
import Dashboard from './Dashboard';

const StudentPage = () => {
    const [students, setStudents] = useState([]);
    const [newStudent, setNewStudent] = useState({
        StudentID: '',
        StudentName: '',
        StudentEmail: '',
        Guardian: '',
    });
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [editMode, setEditMode] = useState(false);


    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:7000/Students');
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const handleChange = (e) => {
        // const { name, value } = e.target;
        // console.log(e.target);
        setNewStudent((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(newStudent);
        try {
            await axios.post('http://localhost:7000/Students/create', newStudent);
            setNewStudent({
                StudentID: '',

                StudentName: '',
                StudentEmail: '',
                Guardian: '',
            });
            fetchStudents();
        } catch (error) {
            console.error('Error creating student:', error);
        }
    };

    const handleDelete = async (StudentID) => {
        try {
            await axios.delete(`http://localhost:7000/Students/delete/${StudentID}`);
            fetchStudents();
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };
 
   
    const handleUpdate = async () => {
        if (!selectedStudent) return;
        try {
            await axios.put(`http://localhost:7000/Students/update/${selectedStudent.StudentID}`, selectedStudent);
            setEditMode(false);
            setSelectedStudent(null);
            fetchStudents();
        } catch (error) {
            console.error('Error updating student:', error);
        }
    };
    
    

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setSelectedStudent((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEditClick = (student) => {
        setSelectedStudent(student);
        setEditMode(true);
    };



    return (
        <div className='home'>
            <h2>Student Page</h2>

            <div className="student-details">
                <table>
                    <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Student Name</th>
                            <th>Student Email</th>
                            <th>Guardian</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student.StudentID}>
                                <td>{student.StudentID}</td>
                                <td>{student.StudentName}</td>
                                <td>{student.StudentEmail}</td>
                                <td>{student.Guardian}</td>
                                <td>
                                    <button onClick={() => handleDelete(student.StudentID)}>Delete</button>
                                    <button onClick={() => handleEditClick(student)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="form-container">
                {editMode && selectedStudent && (
                    <div>
                        <div className="form-center">
                            <h3>Edit Student</h3>
                            <form className='student-form'>
                                <input
                                    type="text"
                                    name="StudentID"
                                    placeholder="Student ID"
                                    value={selectedStudent.StudentID}
                                    onChange={(e) => setSelectedStudent({ ...selectedStudent, StudentID: e.target.value })}
                                />
                                <input
                                    type="text"
                                    name="StudentName"
                                    placeholder="Student Name"
                                    value={selectedStudent.StudentName}
                                    onChange={(e) => setSelectedStudent({ ...selectedStudent, StudentName: e.target.value })}
                                />
                                <input
                                    type="text"
                                    name="StudentEmail"
                                    placeholder="Student Email"
                                    value={selectedStudent.StudentEmail}
                                    onChange={(e) => setSelectedStudent({ ...selectedStudent, StudentEmail: e.target.value })}
                                />
                                <input
                                    type="text"
                                    name="Guardian"
                                    placeholder="Guardian Type"
                                    value={selectedStudent.Guardian}
                                    onChange={(e) => setSelectedStudent({ ...selectedStudent, Guardian: e.target.value })}
                                />
                                <button type="button" onClick={handleUpdate}>Save</button>
                            </form>
                        </div>
                    </div>
                )}

                {!editMode && (
                    <div>
                        <div className="form-center">
                            <h3>Add New Student</h3>
                            <form onSubmit={handleSubmit} className='student-form'>
                                <input
                                    type="text"
                                    name="StudentID"
                                    placeholder="Student ID"
                                    value={newStudent.StudentID}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="StudentName"
                                    placeholder="Student Name"
                                    value={newStudent.StudentName}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="StudentEmail"
                                    placeholder="Student Email"
                                    value={newStudent.StudentEmail}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="Guardian"
                                    placeholder="Guardian "
                                    value={newStudent.Guardian}
                                    onChange={handleChange}
                                />
                                <button type="submit" className='DashButton'>Add Student</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            <Link to="/dashboard"><button className='DashButton'>Back to Dashboard</button></Link>
        </div>
    );
};

export default StudentPage;