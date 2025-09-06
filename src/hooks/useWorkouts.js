import { useState, useEffect } from 'react';

export const useWorkouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setWorkouts([
        {
          id: '1',
          name: 'Morning Cardio',
          type: 'cardio',
          duration: 30,
          calories: 250,
          date: new Date().toISOString(),
          exercises: [
            { name: 'Running', duration: 20, calories: 200 },
            { name: 'Cool down walk', duration: 10, calories: 50 },
          ],
        },
        {
          id: '2',
          name: 'Strength Training',
          type: 'strength',
          duration: 45,
          calories: 180,
          date: new Date(Date.now() - 86400000).toISOString(),
          exercises: [
            { name: 'Push-ups', sets: 3, reps: 15 },
            { name: 'Squats', sets: 3, reps: 20 },
            { name: 'Planks', duration: 60 },
          ],
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const addWorkout = (workout) => {
    const newWorkout = {
      ...workout,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    setWorkouts(prev => [newWorkout, ...prev]);
  };

  const deleteWorkout = (id) => {
    setWorkouts(prev => prev.filter(workout => workout.id !== id));
  };

  return {
    workouts,
    loading,
    addWorkout,
    deleteWorkout,
  };
};