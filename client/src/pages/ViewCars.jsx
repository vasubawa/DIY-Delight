
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

    return (
        <div>
            <h2>All Cars</h2>
            {message && <p>{message}</p>}
            <ul>
                {cars.map(car => (
                    <li key={car.id}>
                        {car.make} {car.model} ({car.year}) - ${car.price}
                        <Link to={`/cars/${car.id}`}> Details </Link>
                        <Link to={`/cars/edit/${car.id}`}> Edit </Link>
                        <button onClick={() => handleDelete(car.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewCars;