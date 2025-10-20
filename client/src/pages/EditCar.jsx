
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import { getCar, updateCar } from '../services/CarsAPI';

const EditCar = () => {
    const { id } = useParams();
    const [form, setForm] = useState({ make: '', model: '', year: '', price: '', features: '' });
    const [message, setMessage] = useState('');

    useEffect(() => {
        async function fetchCar() {
            try {
                const car = await getCar(id);
                setForm(car);
            } catch {
                setMessage('Error loading car.');
            }
        }
        fetchCar();
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateCar(id, form);
            setMessage('Car updated successfully!');
        } catch {
            setMessage('Error updating car.');
        }
    };

    return (
        <div>
            <h2>Edit Car</h2>
            <form onSubmit={handleSubmit}>
                <input name="make" placeholder="Make" value={form.make} onChange={handleChange} required />
                <input name="model" placeholder="Model" value={form.model} onChange={handleChange} required />
                <input name="year" placeholder="Year" value={form.year} onChange={handleChange} required />
                <input name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
                <input name="features" placeholder="Features" value={form.features} onChange={handleChange} />
                <button type="submit">Update</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default EditCar;