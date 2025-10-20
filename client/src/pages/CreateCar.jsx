
import React, { useState } from 'react';
import '../App.css';
import { createCar } from '../services/CarsAPI';

const CreateCar = () => {
    const [form, setForm] = useState({ make: '', model: '', year: '', price: '', features: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createCar(form);
            setMessage('Car created successfully!');
            setForm({ make: '', model: '', year: '', price: '', features: '' });
        } catch (err) {
            setMessage('Error creating car.');
        }
    };

    return (
        <div>
            <h2>Create Car</h2>
            <form onSubmit={handleSubmit}>
                <input name="make" placeholder="Make" value={form.make} onChange={handleChange} required />
                <input name="model" placeholder="Model" value={form.model} onChange={handleChange} required />
                <input name="year" placeholder="Year" value={form.year} onChange={handleChange} required />
                <input name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
                <input name="features" placeholder="Features" value={form.features} onChange={handleChange} />
                <button type="submit">Create</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CreateCar;