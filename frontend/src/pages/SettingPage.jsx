import { useState } from "react";

const SettingsPage = () => {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    notifications: true
  });

  return (
    <div className="max-w-5xl mx-auto p-6 pt-20">
      <h1 className="text-2xl font-bold mb-8">Account Settings</h1>
      
      <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          <div className="space-y-4">
            <input
              type="text"
              label="Name"
              value={formData.name}
              className="w-full p-2 border rounded"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <input
              type="email"
              label="Email"
              value={formData.email}
              className="w-full p-2 border rounded"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Security</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Change Password
          </button>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Preferences</h2>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.notifications}
              onChange={(e) => setFormData({...formData, notifications: e.target.checked})}
            />
            Receive email notifications
          </label>
        </div>
      </div>
    </div>
  );
};


export default SettingsPage;