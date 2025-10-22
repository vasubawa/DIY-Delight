import React, { useState } from 'react';
import '../App.css';
import { createCar } from '../services/CarsAPI';
import { isValidCombination } from '../utilities/validation';

const optionPrices = {
  wheels: {
    standard: 0,
    alloy: 500,
    sport: 1000,
  },
  exterior: {
    red: 0,
    blue: 0,
    black: 200,
    custom: 500,
  },
  interior: {
    cloth: 0,
    leather: 800,
    sport: 1500,
  },
};
function getOptionPrice(feature, option) {
  if (optionPrices[feature] && optionPrices[feature][option] !== undefined) {
    return optionPrices[feature][option];
  }
  return 0;
}
function calculateTotalPrice(basePrice, selectedOptions) {
  let total = Number(basePrice) || 0;
  for (const [feature, option] of Object.entries(selectedOptions)) {
    total += getOptionPrice(feature, option);
  }
  return total;
}

const CreateCar = () => {
    const [form, setForm] = useState({
        make: '',
        model: '',
        year: '',
        price: '',
        wheels: 'standard',
        exterior: 'red',
        interior: 'cloth',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (e.target.name === 'interior' && e.target.value !== 'sport' && form.wheels === 'sport') {
            setForm(f => ({ ...f, wheels: 'standard', interior: e.target.value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const selectedOptions = { wheels: form.wheels, exterior: form.exterior, interior: form.interior };
        if (!isValidCombination(selectedOptions)) {
            setError('This combination of wheels and exterior is not allowed.');
            return;
        }
        const carData = {
            ...form,
            features: `wheels:${form.wheels},exterior:${form.exterior},interior:${form.interior}`
        };
        try {
            await createCar(carData);
            setMessage('Car created successfully!');
            setForm({ make: '', model: '', year: '', price: '', wheels: 'standard', exterior: 'red', interior: 'cloth' });
        } catch (err) {
            setMessage('Error creating car.');
        }
    };

    const totalPrice = calculateTotalPrice(form.price, {
        wheels: form.wheels,
        exterior: form.exterior,
        interior: form.interior,
    });

    const colorMap = {
        red: '🟥',
        blue: '🟦',
        black: '⬛',
        custom: '✨',
    };
    const wheelsMap = {
        standard: '⚫',
        alloy: '🛞',
        sport: '🏁',
    };
    const carVisual = (
        <div style={{ fontSize: '2.5rem', margin: '1em 0' }}>
            <span>{colorMap[form.exterior] || '🚗'}</span>
            <span style={{ marginLeft: '0.5em' }}>{wheelsMap[form.wheels] || '⚫⚫'}</span>
        </div>
    );

    const cardStyle = {
      maxWidth: '500px',
      margin: '2rem auto',
      padding: '2.5rem',
      background: 'rgba(20,20,20,0.85)',
      borderRadius: '16px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
      color: '#fff',
    };

    return (
        <div style={cardStyle}>
            <h2 style={{ textAlign: 'center' }}>Create Car</h2>
            {carVisual}
            <form onSubmit={handleSubmit}>
                <input name="make" placeholder="Make" value={form.make} onChange={handleChange} required />
                <input name="model" placeholder="Model" value={form.model} onChange={handleChange} required />
                <input name="year" placeholder="Year" value={form.year} onChange={handleChange} required />
                <input name="price" placeholder="Base Price" value={form.price} onChange={handleChange} required />
                <div>
                    <label>Wheels: </label>
                    <select name="wheels" value={form.wheels} onChange={handleChange} required>
                        <option value="standard">Standard</option>
                        <option value="alloy">Alloy (+$500)</option>
                        <option value="sport" disabled={form.interior !== 'sport'}>Sport (+$1000)</option>
                    </select>
                </div>
                <div>
                    <label>Exterior: </label>
                    <select name="exterior" value={form.exterior} onChange={handleChange} required>
                        <option value="red">Red</option>
                        <option value="blue">Blue</option>
                        <option value="black">Black (+$200)</option>
                    </select>
                </div>
                <div>
                    <label>Interior: </label>
                    <select name="interior" value={form.interior} onChange={handleChange} required>
                        <option value="cloth">Cloth</option>
                        <option value="leather">Leather (+$800)</option>
                        <option value="sport">Sport (+$1500)</option>
                    </select>
                </div>
                <div style={{ margin: '1em 0', fontWeight: 'bold' }}>
                    Total Price: ${isNaN(totalPrice) ? '0' : totalPrice}
                </div>
                <button type="submit">Create</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <p>{message}</p>}
        </div>
    );
};

export default CreateCar;