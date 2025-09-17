// import React from 'react'

// const DoctorList = () => {
//   return (
//     <div>
        
//     </div>
//   )
// }

// export default DoctorList
import React from "react";

const DoctorList = () => {
  // Dummy doctor data
  const doctors = [
    {
      id: 1,
      name: "Dr. Mehta",
      speciality: "Cardiologist",
      experience: "10 Years",
      fees: 500,
      image:
        "https://cdn-icons-png.flaticon.com/512/387/387561.png", // doctor icon
    },
    {
      id: 2,
      name: "Dr. Kapoor",
      speciality: "Dentist",
      experience: "7 Years",
      fees: 300,
      image:
        "https://cdn-icons-png.flaticon.com/512/387/387561.png",
    },
    {
      id: 3,
      name: "Dr. Khan",
      speciality: "Dermatologist",
      experience: "5 Years",
      fees: 400,
      image:
        "https://cdn-icons-png.flaticon.com/512/387/387561.png",
    },
  ];

  return (
    <div className="p-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6">Doctor List</h1>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col items-center">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-20 h-20 rounded-full mb-4"
              />
              <h2 className="text-xl font-semibold">{doctor.name}</h2>
              <p className="text-gray-600">{doctor.speciality}</p>
              <p className="text-gray-500 text-sm">Experience: {doctor.experience}</p>
              <p className="text-gray-800 font-medium mt-2">Fees: ₹{doctor.fees}</p>

              <button
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
