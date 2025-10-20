
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../App.css';
import { getCar, deleteCar } from '../services/CarsAPI';

const CarDetails = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        async function fetchCar() {
            try {
                const data = await getCar(id);
                setCar(data);
            } catch {
                setMessage('Error loading car.');
            }
        }
        fetchCar();
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm('Delete this car?')) return;
        try {
            await deleteCar(id);
            setMessage('Car deleted.');
        } catch {
            setMessage('Error deleting car.');
        }
    };

    if (!car) return <div>{message || 'Loading car...'}</div>;

    return (
        <div>
            <h2>Car Details</h2>
            <p><b>Make:</b> {car.make}</p>
            <p><b>Model:</b> {car.model}</p>
            <p><b>Year:</b> {car.year}</p>
            <p><b>Price:</b> ${car.price}</p>
            <p><b>Features:</b> {car.features}</p>
            <Link to={`/cars/edit/${car.id}`}>Edit</Link>
            <button onClick={handleDelete}>Delete</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CarDetails;