"use client"
import React, { useState } from 'react';
import './form.css'; // Import your CSS file
import { useRouter } from 'next/router';
import { POST } from '@/app/api/predictLung/route';

const MyForm = () => {
  const [lungFormData, setLungFormData] = useState({
    chest_pain_type: '',
    bp: '',
    cholesterol: '',
    fbs_over_120: '',
    ekg_results: '',
    max_hr: '',
    exercise_angina: '',
    st_depression: '',
    slope_of_st: '',
    number_of_vessels_fluro: '',
    thallium: '',
  })

  const handleLungChange = (e) => {
    const { name, value } = e.target;
    setLungFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  let lungdata = {
    "GENDER": "F",
    "AGE": 45,
    "SMOKING": 0,
    "YELLOW_FINGERS": 0,
    "ANXIETY": 1,
    "PEER_PRESSURE": 0,
    "CHRONIC DISEASE": 0,
    "FATIGUE": 1,
    "ALLERGY": 0,
    "WHEEZING": 1,
    "ALCOHOL CONSUMING": 1,
    "COUGHING": 1,
    "SHORTNESS OF BREATH": 1,
    "SWALLOWING DIFFICULTY": 0,
    "CHEST PAIN": 2
  }

	const callAPI = async () => {
		try {
			const res = await fetch(
				`http://127.0.0.1:5000/predictLung`, {
          method: 'POST',
          body: JSON.stringify(lungdata)
        }
			);
			const data = await res.json();
			alert(data);
		} catch (err) {
			console.log(err);
		}
	};


  return (
    <div>
      <p>Lung parameters**</p>
      <form onSubmit={callAPI}>
        {/* Render form inputs based on formData with placeholder data */}
        {Object.keys(lungFormData).map((key) => (
          <div key={key}>
            <label htmlFor={key}>{key}</label>
            <input
              type={typeof lungFormData[key] === 'number' ? 'number' : 'text'}
              id={key}
              name={key}
              value={lungFormData[key]}
              placeholder={`Enter ${key}`}
              onChange={handleLungChange}
            />
          </div>
        ))}

        <button type="submit">Submit</button>
      </form>

    </div>
  )
}

export default MyForm;
