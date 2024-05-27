// components/VisaComponent.jsx
import React from 'react';

const VisaComponent = () => {
    return (
      <div>
        <h2>Visa Payment Details</h2>
        <form>
          <label>Name:</label>
          <input type="text" />
          <label>Address:</label>
          <input type="text" />
          <label>Card Number:</label>
          <input type="text" />
          {/* Add more fields as necessary */}
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  };
  
  export default VisaComponent;