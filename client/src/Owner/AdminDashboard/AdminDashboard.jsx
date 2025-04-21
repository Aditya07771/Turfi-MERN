import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const AdminDashboard = () => {
  const [owners, setOwners] = useState([]);
  const [activeTab, setActiveTab] = useState('pending');
  const [loading, setLoading] = useState(true);
  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const fetchAllOwners = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.get(`${backendUrl}/api/owner/all-requests`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.data.success) {
        setOwners(response.data.owners);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch owners');
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOwnerApproval = async (ownerId, status) => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        toast.error('Admin authentication token missing');
        navigate('/login');
        return;
      }

      const response = await axios.patch(
        `${backendUrl}/api/owner/approve/${ownerId}`,
        { status },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        toast.success(`Owner ${status} successfully`);
        fetchAllOwners();
      }
    } catch (error) {
      console.error('Approval error:', error);
      toast.error(error.response?.data?.message || `Failed to ${status} owner`);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    fetchAllOwners();
  }, []);

  const filteredOwners = owners.filter(owner => 
    activeTab === 'pending' ? 
    owner.accountStatus === 'pending' : 
    owner.accountStatus === activeTab
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mx-auto mb-4"></div>
          <p>Loading owners...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-4">
            {['pending', 'approved', 'rejected'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                  activeTab === tab
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)} Requests
              </button>
            ))}
          </nav>
        </div>

        {/* Request Table */}
        <div className="bg-white shadow-md rounded-lg">
          <div className="p-6">
            {filteredOwners.length === 0 ? (
              <p className="text-gray-500">No {activeTab} requests</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-3 text-left">Name</th>
                      <th className="p-3 text-left">Email</th>
                      <th className="p-3 text-left">Company</th>
                      <th className="p-3 text-left">Status</th>
                      <th className="p-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOwners.map((owner) => (
                      <tr key={owner._id} className="border-b">
                        <td className="p-3">{owner.fullName}</td>
                        <td className="p-3">{owner.email}</td>
                        <td className="p-3">{owner.companyName}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-sm ${
                            owner.accountStatus === 'approved' ? 'bg-green-100 text-green-800' :
                            owner.accountStatus === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {owner.accountStatus}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          {owner.accountStatus === 'pending' ? (
                            <div className="flex justify-center gap-2">
                              <button 
                                onClick={() => handleOwnerApproval(owner._id, 'approved')}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                              >
                                Approve
                              </button>
                              <button 
                                onClick={() => handleOwnerApproval(owner._id, 'rejected')}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleOwnerApproval(owner._id, 'pending')}
                              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                            >
                              Reset to Pending
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;