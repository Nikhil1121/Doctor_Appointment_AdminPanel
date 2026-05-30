import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);
  const [isOpen, setIsOpen] = useState(false);

  const adminNavItems = [
    { to: "/admin-dashboard", icon: assets.home_icon, label: "Dashboard" },
    { to: "/all-appointments", icon: assets.appointment_icon, label: "Appointments" },
    { to: "/add-doctor", icon: assets.add_icon, label: "Add Doctor" },
    { to: "/doctor-list", icon: assets.people_icon, label: "Doctors List" },
  ];

  const doctorNavItems = [
    { to: "/doctor-dashboard", icon: assets.home_icon, label: "Dashboard" },
    { to: "/doctor-appointments", icon: assets.appointment_icon, label: "Appointments" },
    { to: "/doctor-profile", icon: assets.people_icon, label: "My Profile" },
  ];

  const navItems = aToken ? adminNavItems : doctorNavItems;

  if (!aToken && !dToken) return null;

  return (
    <>
      <button
        className="md:hidden fixed bottom-4 left-4 z-50 bg-primary text-white p-3 rounded-full shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black/40 z-30" onClick={() => setIsOpen(false)} />
      )}

      <div className={`fixed md:static top-0 left-0 h-full md:h-auto z-40 bg-white border-r transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} md:min-h-screen w-64 md:w-auto`}>
        <div className="md:hidden flex justify-end p-4">
          <button onClick={() => setIsOpen(false)} className="text-gray-500">✕</button>
        </div>
        <ul className="text-[#515151] mt-5">
          {navItems.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-4 md:px-9 md:min-w-60 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : "hover:bg-gray-50"}`
              }
              to={to}
              onClick={() => setIsOpen(false)}
            >
              <img className="w-5" src={icon} alt="" />
              <p className="text-sm">{label}</p>
            </NavLink>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
