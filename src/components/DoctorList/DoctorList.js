import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                // Adjust the URL if your backend runs on a different port or path
                const response = await axios.get('http://localhost:8081/api/doctor');

                // Check if the response data is in the expected format
                if (Array.isArray(response.data)) {
                    setDoctors(response.data);
                } else {
                    console.error('Unexpected response format:', response.data);
                    setError('Unexpected response format');
                }
            } catch (err) {
                // Log detailed error information
                console.error('Error fetching doctors:', err.response || err.message || err);
                setError('Error fetching doctors. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    // Display loading state
    if (loading) return <p>Loading...</p>;

    // Display error message if there's an error
    if (error) return <p>{error}</p>;

    // Sort doctors by ID in ascending order directly in the render method
    const sortedDoctors = [...doctors].sort((a, b) => a.id - b.id);

    // Display the list of doctors
    return (
        <div>
            <h1>Doctors List</h1>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Specialization</th>
                    <th>Contact Information</th>
                </tr>
                </thead>
                <tbody>
                {sortedDoctors.map(doctor => (
                    <tr key={doctor.id}>
                        <td>{doctor.id}</td>
                        <td>{doctor.firstName}</td>
                        <td>{doctor.lastName}</td>
                        <td>{doctor.specialization}</td>
                        <td>{doctor.contactInformation}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default DoctorList;
