import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../styling/Cleaner.css";
import Dashboard from './Dashboard';

const CleanerPage = () => {
    const [cleaner, setCleaner] = useState([]);
    const [newCleaner, setNewCleaner] = useState({
        CleanerID: '',
        CleanerName: '',
        CleanerContact: '',
    
    });
    const [selectedCleaner, setSelectedCleaner] = useState(null);
    const [editMode, setEditMode] = useState(false);


    useEffect(() => {
        fetchCleaner();
    }, []);

    const fetchCleaner = async () => {
        try {
            const response = await axios.get('http://localhost:7000/Cleaner');
            setCleaner(response.data);
            console.log('successfully get the data');
        } catch (error) {
            console.error('Error fetching Cleaners:', error);
        }
    };

    const handleChange = (e) => {
    
        setNewCleaner((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(newCleaner);
        try {
            await axios.post('http://localhost:7000/Cleaner/create', newCleaner);
            setNewCleaner({
                CleanerID: '',
                CleanerName: '',
                CleanerContact: '',
                
            });
            fetchCleaner();
        } catch (error) {
            console.error('Error creating cleaner:', error);
        }
    };

    const handleDelete = async (CleanerID) => {
        try {
            await axios.delete(`http://localhost:7000/Cleaner/delete/${CleanerID}`);
            fetchCleaner();
        } catch (error) {
            console.error('Error deleting cleaner:', error);
        }
    };

    const handleUpdate = async () => {
        if (!selectedCleaner) return;
        try {
            await axios.put(`http://localhost:7000/Cleaner/update/${selectedCleaner.CleanerID}`, selectedCleaner);
            setEditMode(false);
            setSelectedCleaner(null);
            fetchCleaner();
        } catch (error) {
            console.error('Error updating cleaner:', error);
        }
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setSelectedCleaner((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEditClick = (cleaner) => {
        setSelectedCleaner(cleaner);
        setEditMode(true);
    };



    return (
        <div className='home'>
            <h2>Cleaner Page</h2>

            <div className="cleaner-details">
                <table>
                    <thead>
                        <tr>
                            <th>Cleaner ID</th>
                            <th>Cleaner Name</th>
                            <th>Cleaner Contact</th>
                            <th></th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cleaner.map((cleaner) => (
                            <tr key={cleaner.CleanerID}>
                                <td>{cleaner.CleanerID}</td>
                                <td>{cleaner.CleanerName}</td>
                                <td>{cleaner.CleanerContact}</td>
                                <td>
                                    <button onClick={() => handleDelete(cleaner.CleanerID)}>Delete</button>
                                    <button onClick={() => handleEditClick(cleaner)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="form-container">
                {editMode && selectedCleaner && (
                    <div>
                        <div className="form-center">
                            <h3>Edit Cleaner</h3>
                            <form className='cleaner-form'>
                                <input
                                    type="text"
                                    name="CleanerID"
                                    placeholder="Cleaner ID"
                                    value={selectedCleaner.CleanerID}
                                    onChange={(e) => setSelectedCleaner({ ...selectedCleaner, CleanerID: e.target.value })}
                                />
                                <input
                                    type="text"
                                    name="CleanerName"
                                    placeholder="Cleaner Name"
                                    value={selectedCleaner.CleanerName}
                                    onChange={(e) => setSelectedCleaner({ ...selectedCleaner, CleanerName: e.target.value })}
                                />
                                
                                <input
                                    type="text"
                                    name="CleanerContact"
                                    placeholder="Cleaner Contact"
                                    value={selectedCleaner.CleanerContact}
                                    onChange={(e) => setSelectedCleaner({ ...selectedCleaner, CleanerContact: e.target.value })}
                                />
                                <button type="button" onClick={handleUpdate}>Save</button>
                            </form>
                        </div>
                    </div>
                )}

                {!editMode && (
                    <div>
                        <div className="form-center">
                            <h3>Add New Cleaner</h3>
                            <form onSubmit={handleSubmit} className='cleaner-form'>
                                <input
                                    type="text"
                                    name="CleanerID"
                                    placeholder="Cleaner ID"
                                    value={newCleaner.CleanerID}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="CleanerName"
                                    placeholder="Cleaner Name"
                                    value={newCleaner.CleanerName}
                                    onChange={handleChange}
                                />
                                
                                <input
                                    type="text"
                                    name="CleanerContact"
                                    placeholder="CleanerContact "
                                    value={newCleaner.CleanerContact}
                                    onChange={handleChange}
                                />
                                <button type="submit" className='DashButton'>Add Cleaner</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            <Link to="/dashboard"><button className='DashButton'>Back to Dashboard</button></Link>
        </div>
    );
};

export default CleanerPage;
