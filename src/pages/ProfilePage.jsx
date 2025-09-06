import { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save, X } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import { useAuth } from '../hooks/useAuth';

const ProfilePage = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'Demo User',
    email: user?.email || 'demo@vibefit.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    birthDate: '1990-01-01',
    height: '5\'10"',
    weight: '170 lbs',
    fitnessLevel: 'intermediate',
    goals: 'Weight loss and muscle building',
  });

  const handleSave = () => {
    // Here you would typically save to your backend
    console.log('Saving profile:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form data
    setFormData({
      name: user?.name || 'Demo User',
      email: user?.email || 'demo@vibefit.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      birthDate: '1990-01-01',
      height: '5\'10"',
      weight: '170 lbs',
      fitnessLevel: 'intermediate',
      goals: 'Weight loss and muscle building',
    });
    setIsEditing(false);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
            <p className="text-gray-600 mt-2">Manage your personal information and preferences</p>
          </div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-primary"
            >
              <Edit2 size={20} />
              Edit Profile
            </button>
          ) : (
            <div className="flex space-x-3">
              <button
                onClick={handleSave}
                className="btn btn-primary"
              >
                <Save size={20} />
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="btn btn-secondary"
              >
                <X size={20} />
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-primary to-green-400 rounded-full flex items-center justify-center">
                  <User size={32} className="text-white" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">{formData.name}</h2>
                <p className="text-gray-600">{formData.email}</p>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-primary">12</p>
                      <p className="text-sm text-gray-600">Workouts</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">3</p>
                      <p className="text-sm text-gray-600">Goals</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="input-label">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="input-field"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <User size={20} className="text-gray-400" />
                        <span>{formData.name}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="input-label">Email Address</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="input-field"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Mail size={20} className="text-gray-400" />
                        <span>{formData.email}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="input-label">Phone Number</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="input-field"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Phone size={20} className="text-gray-400" />
                        <span>{formData.phone}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="input-label">Location</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        className="input-field"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <MapPin size={20} className="text-gray-400" />
                        <span>{formData.location}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="input-label">Birth Date</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={formData.birthDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, birthDate: e.target.value }))}
                        className="input-field"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Calendar size={20} className="text-gray-400" />
                        <span>{new Date(formData.birthDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="input-label">Fitness Level</label>
                    {isEditing ? (
                      <select
                        value={formData.fitnessLevel}
                        onChange={(e) => setFormData(prev => ({ ...prev, fitnessLevel: e.target.value }))}
                        className="input-field"
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <span className="capitalize">{formData.fitnessLevel}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="input-label">Height</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.height}
                        onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))}
                        className="input-field"
                        placeholder="5'10&quot;"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <span>{formData.height}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="input-label">Weight</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.weight}
                        onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                        className="input-field"
                        placeholder="170 lbs"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <span>{formData.weight}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="input-label">Fitness Goals</label>
                  {isEditing ? (
                    <textarea
                      value={formData.goals}
                      onChange={(e) => setFormData(prev => ({ ...prev, goals: e.target.value }))}
                      className="input-field"
                      rows="3"
                      placeholder="Describe your fitness goals..."
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <span>{formData.goals}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;