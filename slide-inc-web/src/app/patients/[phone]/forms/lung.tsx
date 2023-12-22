"use client"
import React, { useState } from 'react';
import './form.css'; // Import your CSS file
import { useRouter } from 'next/router';
import { POST } from '../../../api/predictLung/route';
import { addLungPredictions } from '../../../lib/database';


const MyLungForm = ({ params }: { params: { phone: string } }) => {

  const [lungFormData, setLungFormData] = useState({
    gender: "",
    age: 0,
    smoking: 0,
    yellow_fingers: 0,
    anxiety: 0,
    peer_pressure: 0,
    cronic_disease: 0,
    fatigue: 0,
    allergy: 0,
    wheezing: 0,
    alcohol_consuming: 0,
    coughing: 0,
    shortness_of_breath: 0,
    swallowing_difficulty: 0,
    chest_pain: 0
  })

  const [lungPredict, setLungPredict] = useState('')

  const handleLungChange = (e) => {
    const { name, value } = e.target;
    setLungFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    console.log("Lung form data: ", lungFormData)

    if (!lungFormData)
      return alert("lung data is empty");

    
    await fetch("http://localhost:3000/api/predictLung", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lungFormData),
    })
      .then((res) => res.json())
      .then((lungPredict) => {
        setLungPredict(lungPredict.prediction)
      });

      try {
        console.log("Lung predictions: ", lungPredict)
        console.log("Phone num: ", params.phone)
        let addToDatabase = await addLungPredictions(params.phone, lungPredict)
        console.log("add to database status: ", addToDatabase)
      } catch(e: any) {
        console.log("There was an error adding the Lung Prediction to the database: ", e)
      } 
  };

  return (
    <div>
      <p>Lung parameters**</p>
      <form onSubmit={onSubmit}>
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

      {
  lungPredict !== undefined
    ? <p>Lung predict data: {lungPredict}</p>
    : <p>Submit form first</p>
}

    </div>
  )
}

export default MyLungForm;
