import { useState } from 'react';
import { Plus, Target, Calendar, Trash2, Edit } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import { useGoals } from '../hooks/useGoals';
import { formatDate, calculatePercentage } from '../lib/utils';

const GoalsPage = () => {
  const { goals, loading, addGoal, updateGoal, deleteGoal } = useGoals();
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: 'weight_loss',
    target: '',
    unit: 'lbs',
    deadline: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addGoal({
      ...formData,
      target: parseFloat(formData.target),
    });
    setFormData({ title: '', type: 'weight_loss', target: '', unit: 'lbs', deadline: '' });
    setShowAddForm(false);
  };

  const updateProgress = (goalId, newProgress) => {
    updateGoal(goalId, { current: newProgress });
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
            <h1 className="text-3xl font-bold text-gray-900">Goals</h1>
            <p className="text-gray-600 mt-2">Set and track your fitness objectives</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="btn btn-primary"
          >
            <Plus size={20} />
            Add Goal
          </button>
        </div>

        {/* Add Goal Form */}
        {showAddForm && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Goal</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="input-label">Goal Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="input-field"
                    placeholder="e.g., Lose 10 pounds"
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
                    <option value="weight_loss">Weight Loss</option>
                    <option value="weight_gain">Weight Gain</option>
                    <option value="distance">Distance</option>
                    <option value="frequency">Frequency</option>
                    <option value="strength">Strength</option>
                  </select>
                </div>
                <div>
                  <label className="input-label">Target</label>
                  <input
                    type="number"
                    value={formData.target}
                    onChange={(e) => setFormData(prev => ({ ...prev, target: e.target.value }))}
                    className="input-field"
                    placeholder="10"
                    min="0.1"
                    step="0.1"
                    required
                  />
                </div>
                <div>
                  <label className="input-label">Unit</label>
                  <input
                    type="text"
                    value={formData.unit}
                    onChange={(e) => setFormData(prev => ({ ...prev, unit: e.target.value }))}
                    className="input-field"
                    placeholder="lbs, km, times/week"
                    required
                  />
                </div>
                <div>
                  <label className="input-label">Deadline</label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                    className="input-field"
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
              </div>
              <div className="flex space-x-3">
                <button type="submit" className="btn btn-primary">
                  Add Goal
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

        {/* Goals List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Your Goals</h2>
          </div>
          <div className="p-6">
            {goals.length > 0 ? (
              <div className="space-y-6">
                {goals.map((goal) => {
                  const progress = calculatePercentage(goal.current, goal.target);
                  const isCompleted = progress >= 100;
                  const deadline = new Date(goal.deadline);
                  const isOverdue = deadline < new Date() && !isCompleted;
                  
                  return (
                    <div key={goal.id} className="p-6 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{goal.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <Target size={16} />
                              <span>{goal.target} {goal.unit}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar size={16} />
                              <span className={isOverdue ? 'text-red-600' : ''}>
                                {formatDate(goal.deadline)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${
                            isCompleted
                              ? 'bg-green-100 text-green-800'
                              : isOverdue
                              ? 'bg-red-100 text-red-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {isCompleted ? 'Completed' : isOverdue ? 'Overdue' : 'Active'}
                          </span>
                          <button
                            onClick={() => deleteGoal(goal.id)}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Progress</span>
                          <span className="text-sm text-gray-600">{progress.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full transition-all duration-300 ${
                              isCompleted ? 'bg-green-500' : 'bg-primary'
                            }`}
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm text-gray-600">
                            {goal.current} / {goal.target} {goal.unit}
                          </span>
                          <div className="flex items-center space-x-2">
                            <input
                              type="number"
                              value={goal.current}
                              onChange={(e) => updateProgress(goal.id, parseFloat(e.target.value) || 0)}
                              className="w-20 px-2 py-1 text-sm border border-gray-300 rounded"
                              min="0"
                              step="0.1"
                            />
                            <span className="text-sm text-gray-500">{goal.unit}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Target size={24} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No goals yet</h3>
                <p className="text-gray-600 mb-4">Set your first fitness goal to get started</p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="btn btn-primary"
                >
                  Set Your First Goal
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GoalsPage;