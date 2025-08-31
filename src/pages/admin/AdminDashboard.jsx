import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Simulate fetching data (replace with actual API calls)
  useEffect(() => {
    setIsLoading(true);
    setError('');
    setTimeout(() => {
      setUsers([
        { id: 'user_1', name: 'Alice Smith', email: 'alice@example.com', status: 'Active' },
        { id: 'user_2', name: 'Bob Johnson', email: 'bob@example.com', status: 'Active' },
        { id: 'user_3', name: 'Charlie Brown', email: 'charlie@example.com', status: 'Suspended' },
      ]);
      setCompanies([
        { id: 'comp_1', name: 'Global Corp', email: 'contact@global.com', status: 'Active' },
        { id: 'comp_2', name: 'Local Mart', email: 'support@local.com', status: 'Pending' },
      ]);
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleDeleteUser = async (userId) => {
    if (window.confirm(`Are you sure you want to delete user ${userId}? This action cannot be undone.`)) {
      setError('');
      // Simulate API call to delete user
      // In production: await fetch(`/api/admin/users/${userId}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${adminToken}` } });
      setIsLoading(true);
      setTimeout(() => {
        setUsers(users.filter(user => user.id !== userId));
        setIsLoading(false);
        alert(`User ${userId} deleted successfully! (Simulated)`);
      }, 1000);
    }
  };

  const handleDeleteCompany = async (companyId) => {
    if (window.confirm(`Are you sure you want to delete company ${companyId}? This action cannot be undone.`)) {
      setError('');
      // Simulate API call to delete company
      // In production: await fetch(`/api/admin/companies/${companyId}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${adminToken}` } });
      setIsLoading(true);
      setTimeout(() => {
        setCompanies(companies.filter(company => company.id !== companyId));
        setIsLoading(false);
        alert(`Company ${companyId} deleted successfully! (Simulated)`);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h2>

        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>}

        {isLoading && <div className="text-center text-gray-600 mb-4">Loading data...</div>}

        {/* User Management */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Customer Management</h3>
          {users.length === 0 && !isLoading ? (
            <p className="text-gray-500">No customers found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-900 ml-4"
                          disabled={isLoading}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Company Management */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Company Management</h3>
          {companies.length === 0 && !isLoading ? (
            <p className="text-gray-500">No companies found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {companies.map((company) => (
                    <tr key={company.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{company.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{company.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{company.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          company.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {company.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleDeleteCompany(company.id)}
                          className="text-red-600 hover:text-red-900 ml-4"
                          disabled={isLoading}
                        >
                          Delete
                        </button>
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
  );
};

export default AdminDashboard;
