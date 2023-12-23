import React, {useState, useEffect} from 'react';
import { calculateHealthScore } from '@/app/lib/utils';
import { addHealthScore } from '@/app/lib/database';
import { getPatientsPredictions } from '@/app/lib/database';

interface HealthScoreButtonProps {
    phone: string;
  }
  
  const HealthScoreButton: React.FC<HealthScoreButtonProps> = ({ phone }) => {
    const [healthScore, setHealthScore] = useState<number | null>(null);
  
    useEffect(() => {
      console.log('useEffect triggered');
      handleCalculateHealthScore();
    }, []); 
  
    const handleCalculateHealthScore = async () => {
        try {
          const predictions = await getPatientsPredictions(phone);
      
          if (predictions) {
            const score = calculateHealthScore(predictions.lung, predictions.heart, predictions.stroke);
            setHealthScore(score);
      
            await addHealthScore(phone, score);
          }
        } catch (error) {
          console.error('Error calculating health score:', error);
        }
      };
      
  
    return (
      <div>
        {healthScore !== null && (
          <div>
            <p>Health Score: {healthScore}</p>
          </div>
        )}
        <button onClick={handleCalculateHealthScore}>Calculate Health Score</button>
      </div>
    );
  };
  
  export default HealthScoreButton;