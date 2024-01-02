"use client"
import React, { useState } from 'react';
import './form.css'; // Import your CSS file
import { useRouter } from 'next/router';
import { POST } from '../../../api/predictStroke/route';
import { addStrokePredictions } from '../../../lib/database';


const MyStrokeForm = ({ params }: { params: { phone: string } }) => {

  const [strokeFormData, setStrokeFormData] = useState({
    id: 0,
    gender: "",
    age: 0,
    hypertension: 0,
    heart_disease: 0,
    ever_married: "",
    work_type: "",
    Residence_type: "",
    avg_glucose_level: 0,
    bmi: 0,
    smoking_status: ""
  })

  const [strokePredict, setStrokePredict] = useState('')

  const handleStrokeChange = (e: any) => {
    const { name, value } = e.target;
    setStrokeFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    console.log("Stroke form data: ", strokeFormData)

    if (!strokeFormData)
      return alert("Stroke data is empty");

    
    await fetch("http://localhost:3000/api/predictStroke", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(strokeFormData),
    })
      .then((res) => res.json())
      .then((strokePredict) => {
        setStrokePredict(strokePredict.prediction)
      });

      try {
        console.log("Stroke predictions: ", strokePredict)
        console.log("Phone num: ", params.phone)
        let addToDatabase = await addStrokePredictions(params.phone, strokePredict)
        console.log("add to database status: ", addToDatabase)
      } catch(e: any) {
        console.log("There was an error adding the Stroke Prediction to the database: ", e)
      } 
  };

  return (
    <div>
      <p>Stroke parameters**</p>
      <form onSubmit={onSubmit}>
        {/* Render form inputs based on formData with placeholder data */}
        {Object.keys(strokeFormData).map((key) => (
          <div key={key}>
            <label htmlFor={key}>{key}</label>
            <input
              type={typeof strokeFormData[key] === 'number' ? 'number' : 'text'}
              id={key}
              name={key}
              value={strokeFormData[key]}
              placeholder={`Enter ${key}`}
              onChange={handleStrokeChange}
            />
          </div>
        ))}

        <button type="submit">Submit</button>
      </form>

      {
  strokePredict !== undefined
    ? <p>Stroke predict data: {strokePredict}</p>
    : <p>Submit form first</p>
}

    </div>
  )
}

export default MyStrokeForm;
