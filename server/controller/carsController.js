// Cars Controller
const pool = require('../config/database');

// Get all cars
const getAllCars = async () => {
  const result = await pool.query('SELECT * FROM cars');
  return result.rows;
};

// Get a car by ID
const getCarById = async (id) => {
  const result = await pool.query('SELECT * FROM cars WHERE id = $1', [id]);
  return result.rows[0];
};

// Create a new car
const createCar = async (carData) => {
  const { make, model, year, price, features } = carData;
  const result = await pool.query(
    'INSERT INTO cars (make, model, year, price, features) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [make, model, year, price, features]
  );
  return result.rows[0];
};

// Update a car
const updateCar = async (id, carData) => {
  const { make, model, year, price, features } = carData;
  const result = await pool.query(
    'UPDATE cars SET make = $1, model = $2, year = $3, price = $4, features = $5 WHERE id = $6 RETURNING *',
    [make, model, year, price, features, id]
  );
  return result.rows[0];
};

// Delete a car
const deleteCar = async (id) => {
  await pool.query('DELETE FROM cars WHERE id = $1', [id]);
  return { message: 'Car deleted' };
};

module.exports = {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
};
