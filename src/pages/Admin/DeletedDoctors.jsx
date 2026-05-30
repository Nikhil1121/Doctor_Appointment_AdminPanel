import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";

const DeletedDoctors = () => {
  const { aToken, backendUrl } = useContext(AdminContext);
  const [deletedDoctors, setDeletedDoctors] = useState([]);
  const [restoringId, setRestoringId] = useState(null);
  const [loading, setLoading] = useState(true);

  const getDeletedDoctors = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(backendUrl + "/api/admin/deleted-doctors", {
        headers: { atoken: aToken },
      });
      if (data.success) {
        setDeletedDoctors(data.doctors);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const restoreDoctor = async (docId) => {
    try {
      setRestoringId(docId);
      const { data } = await axios.post(
        backendUrl + "/api/admin/restore-doctor",
        { docId },
        { headers: { atoken: aToken } }
      );
      if (data.success) {
        toast.success("Doctor Restored Successfully! ✅");
        setTimeout(() => {
          getDeletedDoctors();
          setRestoringId(null);
        }, 500);
      } else {
        toast.error(data.message);
        setRestoringId(null);
      }
    } catch (error) {
      toast.error(error.message);
      setRestoringId(null);
    }
  };

  useEffect(() => {
    if (aToken) getDeletedDoctors();
  }, [aToken]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500">Loading deleted doctors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="m-4 sm:m-5 max-h-[90vh] overflow-y-scroll">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-lg font-medium">Deleted Doctors</h1>
        <span className={`px-3 py-1 rounded-full text-sm font-medium
          ${deletedDoctors.length > 0 ? 'bg-red-100 text-red-500' : 'bg-green-100 text-green-600'}`}>
          {deletedDoctors.length} deleted
        </span>
      </div>

      {deletedDoctors.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-gray-500">
          <div className="text-6xl mb-4">✅</div>
          <p className="text-xl font-medium text-gray-700">No Deleted Doctors</p>
          <p className="text-sm mt-2 text-gray-400">All doctors are currently active</p>
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {deletedDoctors.map((item, index) => (
            <div
              className={`border border-red-100 rounded-xl overflow-hidden bg-white shadow-sm
                hover:shadow-md transition-all duration-300
                ${restoringId === item._id ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
              key={index}
              style={{
                transition: 'all 0.4s ease',
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="relative">
                <img
                  className="w-full h-48 object-cover grayscale opacity-60"
                  src={item.image}
                  alt={item.name}
                />
                <div className="absolute inset-0 bg-red-900/10 flex items-center justify-center">
                  <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow">
                    🗑️ Deleted
                  </span>
                </div>
              </div>

              <div className="p-4">
                <p className="text-neutral-700 font-semibold text-base">{item.name}</p>
                <p className="text-zinc-500 text-sm">{item.speciality}</p>
                <p className="text-zinc-400 text-xs mt-1">{item.degree} • {item.experience}</p>
                <p className="text-zinc-400 text-xs">Fees: ₹{item.fees}</p>

                <button
                  onClick={() => restoreDoctor(item._id)}
                  disabled={restoringId === item._id}
                  className={`mt-4 w-full py-2 rounded-lg text-sm font-medium transition-all duration-300
                    ${restoringId === item._id
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-green-50 text-green-600 border border-green-300 hover:bg-green-500 hover:text-white hover:shadow-md active:scale-95'
                    }`}
                >
                  {restoringId === item._id ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                      Restoring...
                    </span>
                  ) : (
                    '↩️ Restore Doctor'
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeletedDoctors;