// import React from 'react'

// const AllApointments = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default AllApointments


import React from "react";

const AllAppointments = () => {
  // Dummy data
  const appointments = [
    {
      id: 1,
      patient: "Rahul Sharma",
      doctor: "Dr. Mehta",
      date: "2025-09-20",
      time: "10:30 AM",
      status: "Pending",
    },
    {
      id: 2,
      patient: "Priya Verma",
      doctor: "Dr. Kapoor",
      date: "2025-09-21",
      time: "02:00 PM",
      status: "Approved",
    },
    {
      id: 3,
      patient: "Amit Singh",
      doctor: "Dr. Khan",
      date: "2025-09-22",
      time: "11:00 AM",
      status: "Cancelled",
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Appointments</h2>

      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Patient</th>
            <th className="p-2 border">Doctor</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Time</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>

        <tbody>
          {appointments.map((appt) => (
            <tr key={appt.id} className="text-center">
              <td className="p-2 border">{appt.patient}</td>
              <td className="p-2 border">{appt.doctor}</td>
              <td className="p-2 border">{appt.date}</td>
              <td className="p-2 border">{appt.time}</td>
              <td
                className={`p-2 border font-medium ${
                  appt.status === "Approved"
                    ? "text-green-600"
                    : appt.status === "Cancelled"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {appt.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllAppointments;
