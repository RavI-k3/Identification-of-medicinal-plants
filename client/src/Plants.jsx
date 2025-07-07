// client/src/Plants.jsx
import { useEffect, useState } from 'react';

function Plants() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/plants`)  // Change this to your backend URL after deployment
      .then(res => res.json())
      .then(data => setPlants(data))
      .catch(err => console.error('Error fetching plants:', err));
  }, []);

  return (
    <div>
      <h2>Medicinal Plants</h2>
      <ul>
        {plants.map((plant, index) => (
          <li key={index}>
            <strong>{plant.name}</strong>: {plant.use}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Plants;
