"use client"
import React, { useState } from 'react';
import './form.css'; // Import your CSS file
import { useRouter } from 'next/router';
import { POST } from '../../../api/predictHeart/route';
import { addHeartPredictions } from '../../../lib/database';


const MyHeartForm = ({ params }: { params: { phone: string } }) => {

  const [heartFormData, setHeartFormData] = useState({
    Age: 0,
    Sex: 0,
    Chest_pain_type: 0,
    BP: 0,
    Cholesterol: 0,
    FBS_over_120: 0,
    EKG_results: 0,
    Max_HR: 0,
    Exercise_angina: 0,
    ST_depression: 0,
    Slope_of_ST: 0,
    Number_of_vessels_fluro: 0,
    Thallium: 0
  });  

  const [heartPredict, setHeartPredict] = useState('')

  const handleHeartChange = (e: any) => {
    const { name, value } = e.target;
    setHeartFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    console.log("Heart form data: ", heartFormData)

    if (!heartFormData)
      return alert("Heart data is empty");

    
    await fetch("http://localhost:3000/api/predictHeart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(heartFormData),
    })
      .then((res) => res.json())
      .then((heartPredict) => {
        setHeartPredict(heartPredict.prediction)
      });
      try {
        console.log("Heart predictions: ", heartPredict)
        let addToDatabase = await addHeartPredictions(params.phone, heartPredict)
        console.log("add to database status: ", addToDatabase)
      } catch(e: any) {
        console.log("There was an error adding the Heart Prediction to the database: ", e)
      } 
  };

  return (
    <div>
      <p>Heart parameters**</p>
      <form onSubmit={onSubmit}>
        {/* Render form inputs based on formData with placeholder data */}
        {Object.keys(heartFormData).map((key) => {
        const typedKey = key as keyof typeof heartFormData;
        return (
          <div key={typedKey}>
            <label htmlFor={typedKey}>{typedKey}</label>
            <input
              type={typeof heartFormData[typedKey] === 'number' ? 'number' : 'text'}
              id={typedKey}
              name={typedKey}
              value={heartFormData[typedKey]}
              placeholder={`Enter ${typedKey}`}
              onChange={handleHeartChange}
            />
          </div>
        );
      })}

        <button type="submit">Submit</button>
      </form>

      {
  heartPredict !== undefined
    ? <p>Heart predict data: {heartPredict}</p>
    : <p>Submit form first</p>
}

    </div>
  )
}

export default MyHeartForm;
