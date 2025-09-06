import { useState, useEffect } from 'react';

export const useGoals = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setGoals([
        {
          id: '1',
          title: 'Lose 10 pounds',
          type: 'weight_loss',
          target: 10,
          current: 3,
          unit: 'lbs',
          deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'active',
        },
        {
          id: '2',
          title: 'Run 5K',
          type: 'distance',
          target: 5,
          current: 2.5,
          unit: 'km',
          deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'active',
        },
        {
          id: '3',
          title: 'Workout 4 times per week',
          type: 'frequency',
          target: 4,
          current: 2,
          unit: 'times/week',
          deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'active',
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const addGoal = (goal) => {
    const newGoal = {
      ...goal,
      id: Date.now().toString(),
      current: 0,
      status: 'active',
    };
    setGoals(prev => [newGoal, ...prev]);
  };

  const updateGoal = (id, updates) => {
    setGoals(prev => prev.map(goal => 
      goal.id === id ? { ...goal, ...updates } : goal
    ));
  };

  const deleteGoal = (id) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

  return {
    goals,
    loading,
    addGoal,
    updateGoal,
    deleteGoal,
  };
};