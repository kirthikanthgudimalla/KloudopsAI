'use client';

import { useState } from 'react';
import { 
  User, 
  Settings, 
  BarChart3, 
  Briefcase, 
  Users, 
  Plus,
  Bell,
  Search,
  Filter
} from 'lucide-react';
import DevOpsAnimatedBackground from '@/components/DevOpsAnimatedBackground';
import KloudOpsLogo from '@/components/KloudOpsLogo';

export default function Dashboard() {
  const [userType] = useState('devops-user'); // This would come from auth context
  const [activeTab, setActiveTab] = useState('overview');

  // Mock user data - would come from API
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    userType: 'devops-user',
    company: 'Tech Corp',
    avatar: '/api/placeholder/40/40'
  };

  const stats = {
    'devops-user': [
      { label: 'Active Projects', value: '12', icon: Briefcase },
      { label: 'Team Members', value: '8', icon: Users },
      { label: 'Services Used', value: '5', icon: Settings },
      { label: 'This Month Cost', value: '$2,450', icon: BarChart3 }
    ],
    'job-seeker': [
      { label: 'Applications Sent', value: '23', icon: Briefcase },
      { label: 'Interview Scheduled', value: '3', icon: Users },
      { label: 'Profile Views', value: '156', icon: BarChart3 },
      { label: 'Skill Matches', value: '89%', icon: Settings }
    ],
    'freelancer': [
      { label: 'Active Projects', value: '7', icon: Briefcase },
      { label: 'Total Clients', value: '24', icon: Users },
      { label: 'This Month Revenue', value: '$8,750', icon: BarChart3 },
      { label: 'Success Rate', value: '98%', icon: Settings }
    ]
  };

  const currentStats = stats[userType as keyof typeof stats] || stats['devops-user'];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-50">
      <DevOpsAnimatedBackground />
      {/* Navigation */}
      <nav className="relative z-10 bg-white/95 backdrop-blur-sm shadow-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <KloudOpsLogo size="md" />
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-blue-600 p-2">
                <Bell className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-2">
                <img
                  className="h-8 w-8 rounded-full"
                  src={userData.avatar}
                  alt={userData.name}
                />
                <span className="text-sm font-medium text-gray-900">{userData.name}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-6 border border-white/20">
              <div className="text-center mb-6">
                <img
                  className="h-20 w-20 rounded-full mx-auto mb-4"
                  src={userData.avatar}
                  alt={userData.name}
                />
                <h3 className="text-lg font-semibold text-gray-900">{userData.name}</h3>
                <p className="text-sm text-gray-600 capitalize">
                  {userType.replace('-', ' ')}
                </p>
              </div>
              
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'overview'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>Overview</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('projects')}
                  className={`w-full flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'projects'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Briefcase className="h-4 w-4" />
                  <span>
                    {userType === 'job-seeker' ? 'Applications' : 'Projects'}
                  </span>
                </button>
                
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'profile'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'settings'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'overview' && (
              <div>
                <div className="mb-8">
                  <h1 className="text-2xl font-bold text-gray-900">
                    Welcome back, {userData.name}!
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Here's what's happening with your account today.
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {currentStats.map((stat, index) => (
                    <div key={index} className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-6 border border-white/20">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <stat.icon className="h-8 w-8 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/20">
                  <div className="px-6 py-4 border-b border-gray-200/20">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {[1, 2, 3].map((item) => (
                        <div key={item} className="flex items-center space-x-4">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">
                              {userType === 'devops-user' && 'New CI/CD pipeline deployed successfully'}
                              {userType === 'job-seeker' && 'Applied to Senior DevOps Engineer position'}
                              {userType === 'freelancer' && 'Completed cloud migration project'}
                            </p>
                            <p className="text-xs text-gray-500">2 hours ago</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {userType === 'job-seeker' ? 'My Applications' : 'My Projects'}
                  </h1>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center">
                    <Plus className="h-4 w-4 mr-2" />
                    {userType === 'job-seeker' ? 'Browse Jobs' : 'New Project'}
                  </button>
                </div>

                <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/20">
                  <div className="px-6 py-4 border-b border-gray-200/20 flex items-center space-x-4">
                    <div className="flex-1 relative">
                      <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                      <Filter className="h-4 w-4" />
                      <span>Filter</span>
                    </button>
                  </div>
                  
                  <div className="p-6">
                    <div className="text-center text-gray-500 py-12">
                      <Briefcase className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>No {userType === 'job-seeker' ? 'applications' : 'projects'} yet.</p>
                      <p className="text-sm">
                        {userType === 'job-seeker' 
                          ? 'Start applying to DevOps positions today!'
                          : 'Create your first project to get started.'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h1>
                
                <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-6 border border-white/20">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          defaultValue={userData.name}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          defaultValue={userData.email}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    
                    {userType === 'devops-user' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company Name
                        </label>
                        <input
                          type="text"
                          defaultValue={userData.company}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    )}
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bio
                      </label>
                      <textarea
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h1>
                
                <div className="space-y-6">
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-6 border border-white/20">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Email Notifications</p>
                          <p className="text-sm text-gray-600">Receive updates via email</p>
                        </div>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Push Notifications</p>
                          <p className="text-sm text-gray-600">Receive push notifications</p>
                        </div>
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-6 border border-white/20">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Security</h3>
                    <div className="space-y-4">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Change Password
                      </button>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium block">
                        Enable Two-Factor Authentication
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
