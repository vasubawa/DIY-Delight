import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../App.css';
import { getCar, deleteCar } from '../services/CarsAPI';

function parseFeatures(features) {
  const result = { wheels: 'standard', exterior: 'red', interior: 'cloth' };
  if (!features) return result;
  features.split(',').forEach(pair => {
    const [key, value] = pair.split(':');
    if (key && value) result[key.trim()] = value.trim();
  });
  return result;
}

const CarDetails = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        async function fetchCar() {
            try {
                const car = await getCar(id);
                setCar(car);
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

    if (!car) return <div style={{ color: '#fff', textAlign: 'center' }}>Loading...</div>;
    const features = parseFeatures(car.features);

    const cardStyle = {
        maxWidth: '500px',
        margin: '2rem auto',
        padding: '2.5rem',
        background: 'rgba(20,20,20,0.85)',
        borderRadius: '16px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
        color: '#fff',
        textAlign: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
    };

    return (
        <div style={cardStyle}>
            <h2>Car Details</h2>
            <p><strong>Make:</strong> {car.make}</p>
            <p><strong>Model:</strong> {car.model}</p>
            <p><strong>Year:</strong> {car.year}</p>
            <p><strong>Price:</strong> ${car.price}</p>
            <p><strong>Wheels:</strong> {features.wheels}</p>
            <p><strong>Exterior:</strong> {features.exterior}</p>
            <p><strong>Interior:</strong> {features.interior}</p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <Link to={`/cars/edit/${car.id}`}>Edit</Link>
                <button onClick={handleDelete}>Delete</button>
            </div>
            <Link to="/cars" style={{ color: '#90caf9', marginTop: '1rem' }}>Back to Cars</Link>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CarDetails;