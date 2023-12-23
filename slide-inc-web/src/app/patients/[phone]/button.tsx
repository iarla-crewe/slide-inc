import React, { useState, useEffect } from 'react';
import { calculateHealthScore } from '../../lib/utils';
import { addHealthScore } from '../../lib/database';
import { getPatientsPredictions } from '../../lib/database';

interface HealthScoreButtonProps {
  phone: string;
}

const HealthScoreButton: React.FC<HealthScoreButtonProps> = ({ phone }) => {
  const [healthScore, setHealthScore] = useState<number | null>(null);

  const handleCalculateHealthScore = async () => {
    try {
      const predictions = await getPatientsPredictions(phone);

      if (predictions) {
        const score = calculateHealthScore(predictions.lung, predictions.heart, predictions.stroke);
        console.log("Health score :", score)
        setHealthScore(score);

        await addHealthScore(phone, score);
      }
    } catch (error) {
      console.error('Error handleing health score:', error);
    }
  };


  return (
    <div>
      <button onClick={handleCalculateHealthScore}>Calculate Health Score</button>
      {
        healthScore != null ?
        <p>Health Score: {healthScore}</p>
        :
        null
      }
    </div>
  );
};

export default HealthScoreButton;