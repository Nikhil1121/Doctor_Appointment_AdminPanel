import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability, backendUrl } = useContext(AdminContext);
  const [removingId, setRemovingId] = useState(null);
  const [confirmId, setConfirmId] = useState(null);

  const removeDoctor = async (docId) => {
    try {
      setRemovingId(docId);
      const { data } = await axios.post(
        backendUrl + "/api/admin/remove-doctor",
        { docId },
        { headers: { atoken: aToken } }
      );
      if (data.success) {
        toast.success("Doctor Removed!");
        setTimeout(() => { getAllDoctors(); setRemovingId(null); setConfirmId(null); }, 500);
      } else {
        toast.error(data.message);
        setRemovingId(null);
        setConfirmId(null);
      }
    } catch (error) {
      toast.error(error.message);
      setRemovingId(null);
      setConfirmId(null);
    }
  };

  useEffect(() => {
    if (aToken) getAllDoctors();
  }, [aToken]);

  return (
    <div className="m-3 sm:m-5 flex-1 overflow-y-auto max-h-[90vh]">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-medium">All Doctors
          <span className="ml-2 text-sm text-gray-400">({doctors.length} active)</span>
        </h1>
      </div>

      {doctors.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh] text-gray-500">
          <p className="text-lg">No doctors added yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {doctors.map((item, index) => (
            <div
              className={`border rounded-xl overflow-hidden bg-white hover:shadow-lg transition-all duration-300
                ${removingId === item._id ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
              key={index}
            >
              <div className="relative overflow-hidden">
                <img className="w-full h-48 object-cover" src={item.image} alt={item.name} />
                <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium
                  ${item.available ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}>
                  {item.available ? '● Available' : '● Unavailable'}
                </div>
              </div>
              <div className="p-4">
                <p className="text-neutral-800 font-semibold text-base">{item.name}</p>
                <p className="text-zinc-500 text-sm">{item.speciality}</p>
                <p className="text-zinc-400 text-xs mt-1">{item.degree} • {item.experience}</p>
                <div className="mt-3 flex items-center gap-2 text-sm">
                  <input onChange={() => changeAvailability(item._id)} type="checkbox" checked={item.available} className="cursor-pointer accent-primary w-4 h-4" />
                  <p className="text-gray-600">Mark Available</p>
                </div>
                {confirmId === item._id ? (
                  <div className="mt-3 flex gap-2">
                    <button onClick={() => removeDoctor(item._id)} className="flex-1 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-all font-medium">
                      {removingId === item._id ? 'Removing...' : 'Confirm ✓'}
                    </button>
                    <button onClick={() => setConfirmId(null)} className="flex-1 py-2 border border-gray-300 text-gray-600 rounded-lg text-sm hover:bg-gray-50 transition-all">
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setConfirmId(item._id)} className="mt-3 w-full py-2 bg-red-50 text-red-500 border border-red-200 rounded-lg text-sm hover:bg-red-500 hover:text-white transition-all duration-300">
                    🗑️ Remove Doctor
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorList;
