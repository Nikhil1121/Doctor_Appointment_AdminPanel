import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { aToken, dashData, getDashData, cancelAppointment } = useContext(AdminContext);
  const navigate = useNavigate();

  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];
  };

  useEffect(() => {
    if (aToken) getDashData();
  }, [aToken]);

  if (!dashData) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="m-4 sm:m-5 flex-1">

      {/* Stats Cards - charo ek line me */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">

        {/* Doctors */}
        <div
          className="flex items-center gap-2 bg-white p-4 cursor-pointer rounded-xl border-2 border-gray-100 hover:shadow-md hover:scale-105 transition-all duration-300"
          onClick={() => navigate("/doctor-list")}
        >
          <img className="w-10 sm:w-12" src={assets.doctor_icon} alt="" />
          <div>
            <p className="text-xl sm:text-2xl font-semibold text-gray-600">{dashData.doctors}</p>
            <p className="text-gray-400 text-sm">Doctors</p>
          </div>
        </div>

        {/* Appointments */}
        <div
          className="flex items-center gap-2 bg-white p-4 cursor-pointer rounded-xl border-2 border-gray-100 hover:shadow-md hover:scale-105 transition-all duration-300"
          onClick={() => navigate("/all-appointments")}
        >
          <img className="w-10 sm:w-12" src={assets.appointments_icon} alt="" />
          <div>
            <p className="text-xl sm:text-2xl font-semibold text-gray-600">{dashData.appointments}</p>
            <p className="text-gray-400 text-sm">Appointments</p>
          </div>
        </div>

        {/* Patients */}
        <div
          className="flex items-center gap-2 bg-white p-4 cursor-pointer rounded-xl border-2 border-gray-100 hover:shadow-md hover:scale-105 transition-all duration-300"
          onClick={() => navigate("/patients-list")}
        >
          <img className="w-10 sm:w-12" src={assets.patients_icon} alt="" />
          <div>
            <p className="text-xl sm:text-2xl font-semibold text-gray-600">{dashData.patients}</p>
            <p className="text-gray-400 text-sm">Patients</p>
          </div>
        </div>

        {/* Deleted Doctors */}
        <div
          className="flex items-center gap-2 bg-white p-4 cursor-pointer rounded-xl border-2 border-red-50 hover:shadow-md hover:scale-105 transition-all duration-300"
          onClick={() => navigate("/deleted-doctors")}
        >
          <div className="w-10 sm:w-12 flex items-center justify-center">
            <span className="text-3xl">🗑️</span>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-semibold text-red-400">{dashData.deletedDoctors || 0}</p>
            <p className="text-red-300 text-sm">Deleted Doctors</p>
          </div>
        </div>

      </div>

      {/* Latest Appointments */}
      <div className="bg-white mt-6 rounded-xl border">
        <div className="flex items-center gap-2.5 px-4 py-4 rounded-t border-b">
          <img src={assets.list_icon} alt="" />
          <p className="font-semibold">Latest Appointments</p>
        </div>

        <div className="pt-2">
          {dashData.latestAppointments && dashData.latestAppointments.length > 0 ? (
            dashData.latestAppointments.map((item, index) => (
              <div
                className="flex items-center px-4 sm:px-6 py-3 gap-3 hover:bg-gray-50 border-b last:border-b-0 transition-all"
                key={index}
              >
                <img className="rounded-full w-10 h-10 object-cover" src={item.docData.image} alt="" />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">{item.docData.name}</p>
                  <p className="text-gray-500">Booking on {slotDateFormat(item.slotDate)}</p>
                </div>
                {item.cancelled ? (
                  <p className="text-red-400 text-xs font-medium">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-500 text-xs font-medium">Completed</p>
                ) : (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="text-xs text-red-400 border border-red-200 px-3 py-1 rounded-full hover:bg-red-500 hover:text-white transition-all"
                  >
                    Cancel
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">No appointments yet</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;