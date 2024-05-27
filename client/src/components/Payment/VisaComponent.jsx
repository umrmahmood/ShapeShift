import React, { useState } from 'react';
import '../Payment/Bank.css';

const VisaComponent = () => {
  const [paymentForm, setPaymentForm] = useState({
    name: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });

  const [additionalInfoForm, setAdditionalInfoForm] = useState({
    firstName: '',
    lastName: '',
    country: '',
    city: '',
    pinCode: '',
    email: '',
    phone: '',
  });

  const handlePaymentFormChange = (e) => {
    const { name, value } = e.target;
    setPaymentForm({
      ...paymentForm,
      [name]: value,
    });
  };

  const handleAdditionalInfoFormChange = (e) => {
    const { name, value } = e.target;
    setAdditionalInfoForm({
      ...additionalInfoForm,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Payment Form submitted:', paymentForm);
    console.log('Additional Info Form submitted:', additionalInfoForm);
    // Handle form submission logic here
  };

  return (
    <div className="visa-form">
      <div className="payment-details">
        <h2>Payment Details</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name on Card:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={paymentForm.name}
              onChange={handlePaymentFormChange}
              placeholder="Enter full Name"
              required
            />
          </div>
          <div>
            <label htmlFor="cardNumber">Card Number:</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={paymentForm.cardNumber}
              onChange={handlePaymentFormChange}
              placeholder="0000 0000 0000 0000"
              required
            />
          </div>
          <div>
            <label htmlFor="expirationDate">Expiry Date:</label>
            <input
              type="text"
              id="expirationDate"
              name="expirationDate"
              value={paymentForm.expirationDate}
              onChange={handlePaymentFormChange}
              placeholder="MM/YY"
              required
            />
          </div>
          <div>
            <label htmlFor="cvv">CVV:</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              placeholder='000'
              value={paymentForm.cvv}
              onChange={handlePaymentFormChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">Submit Payment</button>
        </form>
      </div>
      <div className="additional-info">
        <h2>Personal Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="side-by-side">
            <div>
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={additionalInfoForm.firstName}
                onChange={handleAdditionalInfoFormChange}
                placeholder="Enter First Name"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={additionalInfoForm.lastName}
                onChange={handleAdditionalInfoFormChange}
                placeholder="Enter Last Name"
                required
              />
            </div>
          </div>
          <div className="side-by-side">
            <div className="side-by-side">
              <label htmlFor="country">Country:</label>
              <select
                id="country"
                name="country"
                value={additionalInfoForm.country}
                onChange={handleAdditionalInfoFormChange}
                required
              >
                <option value="">Select Country</option>
<option value="AF">Afghanistan</option>
<option value="AL">Albania</option>
<option value="DZ">Algeria</option>
<option value="AS">American Samoa</option>
<option value="AD">Andorra</option>
<option value="AO">Angola</option>
<option value="AI">Anguilla</option>
<option value="AQ">Antarctica</option>
<option value="AG">Antigua and Barbuda</option>
<option value="AR">Argentina</option>
<option value="AM">Armenia</option>
<option value="AW">Aruba</option>
<option value="AU">Australia</option>
<option value="AT">Austria</option>
<option value="AZ">Azerbaijan</option>
<option value="BS">Bahamas</option>
<option value="BH">Bahrain</option>
<option value="BD">Bangladesh</option>
<option value="BB">Barbados</option>
<option value="BY">Belarus</option>
<option value="BE">Belgium</option>
<option value="BZ">Belize</option>
<option value="BJ">Benin</option>
<option value="BM">Bermuda</option>
<option value="BT">Bhutan</option>
<option value="BO">Bolivia</option>
<option value="BA">Bosnia and Herzegovina</option>
<option value="BW">Botswana</option>
<option value="BV">Bouvet Island</option>
<option value="BR">Brazil</option>
<option value="IO">British Indian Ocean Territory</option>
<option value="BN">Brunei Darussalam</option>
<option value="BG">Bulgaria</option>
<option value="BF">Burkina Faso</option>
<option value="BI">Burundi</option>
<option value="KH">Cambodia</option>
<option value="CM">Cameroon</option>
<option value="CA">Canada</option>
<option value="CV">Cape Verde</option>
<option value="KY">Cayman Islands</option>
<option value="CF">Central African Republic</option>
<option value="TD">Chad</option>
<option value="CL">Chile</option>
<option value="CN">China</option>
<option value="CX">Christmas Island</option>
<option value="CC">Cocos (Keeling) Islands</option>
<option value="CO">Colombia</option>
<option value="KM">Comoros</option>
<option value="CG">Congo</option>
<option value="CD">Congo, The Democratic Republic of The</option>
<option value="CK">Cook Islands</option>
<option value="CR">Costa Rica</option>
<option value="CI">Cote D'ivoire</option>
<option value="HR">Croatia</option>
<option value="CU">Cuba</option>
<option value="CY">Cyprus</option>
<option value="CZ">Czech Republic</option>
<option value="DK">Denmark</option>
<option value="DJ">Djibouti</option>
<option value="DM">Dominica</option>
<option value="DO">Dominican Republic</option>
<option value="EC">Ecuador</option>
<option value="EG">Egypt</option>
<option value="SV">El Salvador</option>
<option value="GQ">Equatorial Guinea</option>
<option value="ER">Eritrea</option>
<option value="EE">Estonia</option>
<option value="ET">Ethiopia</option>
<option value="FK">Falkland Islands (Malvinas)</option>
<option value="FO">Faroe Islands</option>
<option value="FJ">Fiji</option>
<option value="FI">Finland</option>
<option value="FR">France</option>
<option value="GF">French Guiana</option>
<option value="PF">French Polynesia</option>
<option value="TF">French Southern Territories</option>
<option value="GA">Gabon</option>
<option value="GM">Gambia</option>
<option value="GE">Georgia</option>
<option value="DE">Germany</option>
<option value="GH">Ghana</option>
<option value="GI">Gibraltar</option>
<option value="GR">Greece</option>
<option value="GL">Greenland</option>
<option value="GD">Grenada</option>
<option value="GP">Guadeloupe</option>
<option value="GU">Guam</option>
<option value="GT">Guatemala</option>
<option value="GN">Guinea</option>
<option value="GW">Guinea-bissau</option>
<option value="GY">Guyana</option>
<option value="HT">Haiti</option>
<option value="HM">Heard Island and Mcdonald Islands</option>
<option value="VA">Holy See (Vatican City State)</option>
<option value="HN">Honduras</option>
<option value="HK">Hong Kong</option>
<option value="HU">Hungary</option>
<option value="IS">Iceland</option>
<option value="IN">India</option>
<option value="ID">Indonesia</option>
<option value="IR">Iran, Islamic Republic of</option>
<option value="IQ">Iraq</option>
<option value="IE">Ireland</option>
<option value="IL">Israel</option>
<option value="IT">Italy</option>
<option value="JM">Jamaica</option>
<option value="JP">Japan</option>
<option value="JO">Jordan</option>
<option value="KZ">Kazakhstan</option>
<option value="KE">Kenya</option>
<option value="KI">Kiribati</option>
<option value="KP">Korea, Democratic People's Republic of</option>
<option value="KR">Korea, Republic of</option>
<option value="KW">Kuwait</option>
<option value="KG">Kyrgyzstan</option>
<option value="LA">Lao People's Democratic Republic</option>
<option value="LV">Latvia</option>
<option value="LB">Lebanon</option>
<option value="LS">Lesotho</option>
<option value="LR">Liberia</option>
<option value="LY">Libyan Arab Jamahiriya</option>
<option value="LI">Liechtenstein</option>
<option value="LT">Lithuania</option>
<option value="LU">Luxembourg</option>
<option value="MO">Macao</option>
<option value="MK">Macedonia, The Former Yugoslav Republic of</option>
<option value="MG">Madagascar</option>
<option value="MW">Malawi</option>
<option value="MY">Malaysia</option>
<option value="MV">Maldives</option>
<option value="ML">Mali</option>
<option value="MT">Malta</option>
<option value="MH">Marshall Islands</option>
<option value="MQ">Martinique</option>
<option value="MR">Mauritania</option>
<option value="MU">Mauritius</option>
<option value="YT">Mayotte</option>
                {/* Add more country options as needed */}
              </select>
            </div>
            <div>
              <label htmlFor="phone">Phone Number:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={additionalInfoForm.phone}
                onChange={handleAdditionalInfoFormChange}
                placeholder="Enter Phone Number"
                required
              />
            </div>
          </div>
          <div className="side-by-side">
            <div>
              <label htmlFor="city">City:</label>
              <input
                type="text"
                id="city"
                name="city"
                value={additionalInfoForm.city}
                onChange={handleAdditionalInfoFormChange}
                placeholder="Enter City"
                required
              />
            </div>
            <div>
              <label htmlFor="pinCode">Pin Code:</label>
              <input
                type="text"
                id="pinCode"
                name="pinCode"
                value={additionalInfoForm.pinCode}
                onChange={handleAdditionalInfoFormChange}
                placeholder="Enter Pin Code"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={additionalInfoForm.email}
              onChange={handleAdditionalInfoFormChange}
              placeholder="Enter Email"
              required
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default VisaComponent;
