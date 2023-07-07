import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [memberAges, setMemberAges] = useState([]);
  const [sumInsured, setSumInsured] = useState([]);
  const [cityTier, setCityTier] = useState([]);
  const [tenure, setTenure] = useState([]);
  const [premium, setPremium] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log({
        member_ages: memberAges,
        sum_insured: sumInsured,
        city_tier: cityTier,
        tenure: tenure,
      })
      const response = await axios.post('https://insurance-czrh.onrender.com/calculate-premium', {
        member_ages: memberAges,
        sum_insured: sumInsured,
        city_tier: cityTier,
        tenure: tenure,
      });
      
      setPremium(response.data.premium);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToCart = () => {
    console.log('Adding to cart...');
    // Implement add-to-cart functionality here
  };

  return (
    <div className="container">
      <h2>Health Insurance Plan</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="memberAges">Member Ages:</label>
          <input
            type="text"
            id="memberAges"
            className="form-control"
            value={memberAges}
            onChange={(e) => setMemberAges(e.target.value.split(','))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="sumInsured">Sum Insured:</label>
          <input
            type="text"
            id="sumInsured"
            className="form-control"
            value={sumInsured}
            onChange={(e) => setSumInsured(e.target.value.split(','))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cityTier">City Tier:</label>
          <input
            type="text"
            id="cityTier"
            className="form-control"
            value={cityTier}
            onChange={(e) => setCityTier(e.target.value.split(','))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="tenure">Tenure:</label>
          <input
            type="text"
            id="tenure"
            className="form-control"
            value={tenure}
            onChange={(e) => setTenure(e.target.value.split(','))}
          />
        </div>
        <button type="submit" className="btn btn-primary">Calculate Premium</button>
      </form>
      {premium && <p className="premium">Premium: {premium}</p>}
      {premium && (
        <button onClick={handleAddToCart} className="btn btn-success">Add to Cart</button>
      )}
    </div>
  );
};

export default App;
