
import './dotenv.js';
import { pool } from './database.js';

const createCarsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS cars;
    CREATE TABLE IF NOT EXISTS cars (
      id SERIAL PRIMARY KEY,
      make VARCHAR(100) NOT NULL,
      model VARCHAR(100) NOT NULL,
      year INTEGER NOT NULL,
      price NUMERIC(10,2) NOT NULL,
      features TEXT
    );
  `;
  try {
    await pool.query(createTableQuery);
    console.log('🎉 cars table created successfully');
  } catch (err) {
    console.error('⚠️ error creating cars table', err);
  }
};


const seedCarsTable = async () => {
  await createCarsTable();
  // Seed with Ford GT example
  const insertQuery = {
    text: 'INSERT INTO cars (make, model, year, price, features) VALUES ($1, $2, $3, $4, $5)'
  };
  const values = ['Ford', 'GT', 2022, 500000, 'V6 EcoBoost, Carbon Fiber Body, Rear-Wheel Drive'];
  try {
    await pool.query(insertQuery, values);
    console.log('Ford GT added successfully');
  } catch (err) {
    console.error('error inserting Ford GT', err);
  }
};

seedCarsTable();
