import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment, confirmAppointment } = useContext(AdminContext);

  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];
  };

  const calculateAge = (dob) => {
    if (!dob || dob === 'Not Selected') return 'N/A';
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age > 0 ? age : 'N/A';
  };

  useEffect(() => {
    if (aToken) getAllAppointments();
  }, [aToken]);

  return (
    <div className="w-full max-w-6xl m-4 sm:m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll">

        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_2fr] py-3 px-6 border-b bg-gray-50 text-gray-500 font-medium sticky top-0">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {appointments.length === 0 ? (
          <div className="p-10 text-center text-gray-500">No appointments found</div>
        ) : (
          appointments.map((item, index) => (
            <div
              className="flex flex-col sm:grid sm:grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_2fr] items-start sm:items-center text-gray-500 py-3 px-4 sm:px-6 border-b hover:bg-gray-50 gap-2 sm:gap-0"
              key={index}
            >
              <p className="hidden sm:block">{index + 1}</p>

              <div className="flex items-center gap-2">
                <img className="w-8 h-8 rounded-full object-cover bg-gray-100" src={item.userData.image} alt="" />
                <p>{item.userData.name}</p>
              </div>

              <p>{calculateAge(item.userData.dob)}</p>

              <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>

              <div className="flex items-center gap-2">
                <img className="w-8 h-8 rounded-full object-cover bg-gray-100" src={item.docData.image} alt="" />
                <p>{item.docData.name}</p>
              </div>

              <p>₹{item.amount}</p>

              <div className="flex items-center gap-2">
                {item.cancelled ? (
                  <span className="text-red-400 text-xs font-medium px-2 py-1 bg-red-50 rounded-full">Cancelled</span>
                ) : item.isCompleted ? (
                  <span className="text-green-500 text-xs font-medium px-2 py-1 bg-green-50 rounded-full">Completed</span>
                ) : item.isConfirmed ? (
                  <span className="text-blue-500 text-xs font-medium px-2 py-1 bg-blue-50 rounded-full">Confirmed ✅</span>
                ) : (
                  <>
                    <button
                      onClick={() => confirmAppointment(item._id)}
                      className="text-xs text-green-500 border border-green-300 px-3 py-1 rounded-full hover:bg-green-500 hover:text-white transition-all"
                    >
                      ✓ Confirm
                    </button>
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="text-xs text-red-400 border border-red-200 px-3 py-1 rounded-full hover:bg-red-500 hover:text-white transition-all"
                    >
                      ✕ Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllAppointments;
