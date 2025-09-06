import { useState } from 'react';
import { Plus, Calendar, Clock, Flame, Trash2 } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import { useWorkouts } from '../hooks/useWorkouts';
import { formatDate } from '../lib/utils';

const WorkoutsPage = () => {
  const { workouts, loading, addWorkout, deleteWorkout } = useWorkouts();
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'cardio',
    duration: '',
    calories: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addWorkout({
      ...formData,
      duration: parseInt(formData.duration),
      calories: parseInt(formData.calories),
    });
    setFormData({ name: '', type: 'cardio', duration: '', calories: '' });
    setShowAddForm(false);
  };

  if (loading) {
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Workouts</h1>
            <p className="text-gray-600 mt-2">Track and manage your fitness activities</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="btn btn-primary"
          >
            <Plus size={20} />
            Add Workout
          </button>
        </div>

        {/* Add Workout Form */}
        {showAddForm && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Workout</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="input-label">Workout Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="input-field"
                    placeholder="e.g., Morning Run"
                    required
                  />
                </div>
                <div>
                  <label className="input-label">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                    className="input-field"
                  >
                    <option value="cardio">Cardio</option>
                    <option value="strength">Strength</option>
                    <option value="flexibility">Flexibility</option>
                    <option value="sports">Sports</option>
                  </select>
                </div>
                <div>
                  <label className="input-label">Duration (minutes)</label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                    className="input-field"
                    placeholder="30"
                    min="1"
                    required
                  />
                </div>
                <div>
                  <label className="input-label">Calories Burned</label>
                  <input
                    type="number"
                    value={formData.calories}
                    onChange={(e) => setFormData(prev => ({ ...prev, calories: e.target.value }))}
                    className="input-field"
                    placeholder="250"
                    min="1"
                    required
                  />
                </div>
              </div>
              <div className="flex space-x-3">
                <button type="submit" className="btn btn-primary">
                  Add Workout
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Workouts List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Your Workouts</h2>
          </div>
          <div className="p-6">
            {workouts.length > 0 ? (
              <div className="space-y-4">
                {workouts.map((workout) => (
                  <div key={workout.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{workout.name}</h3>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          workout.type === 'cardio' 
                            ? 'bg-red-100 text-red-800'
                            : workout.type === 'strength'
                            ? 'bg-blue-100 text-blue-800'
                            : workout.type === 'flexibility'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {workout.type}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Clock size={16} />
                          <span>{workout.duration} min</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Flame size={16} />
                          <span>{workout.calories} cal</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar size={16} />
                          <span>{formatDate(workout.date)}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteWorkout(workout.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Plus size={24} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No workouts yet</h3>
                <p className="text-gray-600 mb-4">Start tracking your fitness activities</p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="btn btn-primary"
                >
                  Add Your First Workout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WorkoutsPage;