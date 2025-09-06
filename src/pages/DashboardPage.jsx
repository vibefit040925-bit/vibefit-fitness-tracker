import { useState, useEffect } from 'react';
import { Activity, Target, TrendingUp, Calendar } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import { useWorkouts } from '../hooks/useWorkouts';
import { useGoals } from '../hooks/useGoals';
import { formatDate, calculatePercentage } from '../lib/utils';

const DashboardPage = () => {
  const { workouts, loading: workoutsLoading } = useWorkouts();
  const { goals, loading: goalsLoading } = useGoals();

  const recentWorkouts = workouts.slice(0, 3);
  const activeGoals = goals.filter(goal => goal.status === 'active').slice(0, 3);

  const stats = {
    totalWorkouts: workouts.length,
    totalCalories: workouts.reduce((sum, workout) => sum + workout.calories, 0),
    activeGoals: goals.filter(goal => goal.status === 'active').length,
    completedGoals: goals.filter(goal => goal.status === 'completed').length,
  };

  if (workoutsLoading || goalsLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="spinner" style={{ borderTopColor: '#4AE54A' }} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's your fitness overview.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Workouts</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalWorkouts}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Calories Burned</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalCalories}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Goals</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeGoals}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed Goals</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completedGoals}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Workouts */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Recent Workouts</h2>
            </div>
            <div className="p-6">
              {recentWorkouts.length > 0 ? (
                <div className="space-y-4">
                  {recentWorkouts.map((workout) => (
                    <div key={workout.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">{workout.name}</h3>
                        <p className="text-sm text-gray-600">
                          {workout.duration} min • {workout.calories} cal
                        </p>
                        <p className="text-xs text-gray-500">{formatDate(workout.date)}</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          workout.type === 'cardio' 
                            ? 'bg-red-100 text-red-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {workout.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No workouts yet. Start your fitness journey!</p>
              )}
            </div>
          </div>

          {/* Active Goals */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Active Goals</h2>
            </div>
            <div className="p-6">
              {activeGoals.length > 0 ? (
                <div className="space-y-4">
                  {activeGoals.map((goal) => {
                    const progress = calculatePercentage(goal.current, goal.target);
                    return (
                      <div key={goal.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-gray-900">{goal.title}</h3>
                          <span className="text-sm text-gray-600">{progress.toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <p className="text-sm text-gray-600">
                          {goal.current} / {goal.target} {goal.unit}
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No active goals. Set your first goal!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;