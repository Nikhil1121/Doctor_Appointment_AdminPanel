// import React from 'react'

// const Dashboard = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default Dashboard
import React from "react";

const Dashboard = () => {
  // Dummy stats data
  const stats = [
    {
      title: "Total Appointments",
      count: 120,
      color: "bg-blue-500",
    },
    {
      title: "Pending",
      count: 15,
      color: "bg-yellow-500",
    },
    {
      title: "Approved",
      count: 90,
      color: "bg-green-500",
    },
    {
      title: "Cancelled",
      count: 15,
      color: "bg-red-500",
    },
  ];

  // Dummy recent appointments
  const recentAppointments = [
    { id: 1, patient: "Rahul Sharma", doctor: "Dr. Mehta", time: "10:30 AM" },
    { id: 2, patient: "Priya Verma", doctor: "Dr. Kapoor", time: "11:00 AM" },
    { id: 3, patient: "Amit Singh", doctor: "Dr. Khan", time: "11:30 AM" },
  ];

  return (
    <div className="p-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`p-4 rounded-2xl shadow-md text-white ${stat.color}`}
          >
            <h2 className="text-lg font-semibold">{stat.title}</h2>
            <p className="text-2xl font-bold mt-2">{stat.count}</p>
          </div>
        ))}
      </div>

      {/* Recent Appointments */}
      <div className="bg-white p-4 rounded-2xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Recent Appointments</h2>

        <table className="w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Patient</th>
              <th className="p-2 border">Doctor</th>
              <th className="p-2 border">Time</th>
            </tr>
          </thead>
          <tbody>
            {recentAppointments.map((appt) => (
              <tr key={appt.id} className="hover:bg-gray-50">
                <td className="p-2 border">{appt.patient}</td>
                <td className="p-2 border">{appt.doctor}</td>
                <td className="p-2 border">{appt.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
