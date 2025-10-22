import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { getAllCars, deleteCar } from '../services/CarsAPI';

const ViewCars = () => {
    const [cars, setCars] = useState([]);
    const [message, setMessage] = useState('');

    const fetchCars = async () => {
        try {
            const data = await getAllCars();
            setCars(data);
        } catch {
            setMessage('Error loading cars.');
        }
    };

    useEffect(() => {
        fetchCars();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this car?')) return;
        try {
            await deleteCar(id);
            setMessage('Car deleted.');
            fetchCars();
        } catch {
            setMessage('Error deleting car.');
        }
    };

    const cardListStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1.5rem',
        justifyContent: 'center',
        marginTop: '2rem',
    };
    const cardStyle = {
        background: 'rgba(20,20,20,0.85)',
        borderRadius: '16px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
        padding: '2rem 2.5rem',
        minWidth: '340px',
        maxWidth: '420px',
        flex: '1 1 340px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        color: '#fff',
        alignItems: 'center',
        textAlign: 'center',
    };
    const cardActions = {
        display: 'flex',
        gap: '0.5rem',
        marginTop: '1rem',
    };

    return (
        <div>
            {message && <p>{message}</p>}
            <div style={cardListStyle}>
                {cars.map(car => (
                    <div key={car.id} style={cardStyle}>
                        <div>
                            <h3>{car.make} {car.model} ({car.year})</h3>
                            <p><b>Price:</b> ${car.price}</p>
                        </div>
                        <div style={{ ...cardActions, justifyContent: 'center' }}>
                            <Link to={`/cars/${car.id}`}>Details</Link>
                            <Link to={`/cars/edit/${car.id}`}>Edit</Link>
                        </div>
                        <div style={{ marginTop: '0.5rem', textAlign: 'center' }}>
                            <button onClick={() => handleDelete(car.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewCars;