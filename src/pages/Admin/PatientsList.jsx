import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";

const PatientsList = () => {
  const { aToken, backendUrl } = useContext(AdminContext);
  const [patients, setPatients] = useState([]);

  const getAllPatients = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/all-patients", {
        headers: { atoken: aToken },
      });
      if (data.success) setPatients(data.users.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (aToken) getAllPatients();
  }, [aToken]);

  return (
    <div className="m-3 sm:m-5 flex-1 overflow-y-auto max-h-[90vh]">
      <h1 className="text-lg font-medium mb-4">
        All Patients
        <span className="ml-2 text-sm text-gray-500">(Total: {patients.length})</span>
      </h1>

      {patients.length === 0 ? (
        <div className="flex items-center justify-center min-h-[40vh] text-gray-500">
          <p>No patients registered yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {patients.map((item, index) => (
            <div key={index} className="bg-white border rounded-xl p-4 hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-3">
                <img className="w-14 h-14 rounded-full object-cover bg-gray-100 border" src={item.image} alt={item.name} />
                <div>
                  <p className="text-gray-800 font-semibold text-base">{item.name}</p>
                  <p className="text-gray-500 text-xs break-all">{item.email}</p>
                </div>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 w-16 shrink-0">📞 Phone:</span>
                  <span className="text-gray-700 font-medium">{item.phone || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 w-16 shrink-0">⚥ Gender:</span>
                  <span className="text-gray-700 font-medium">{item.gender || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 w-16 shrink-0">🎂 DOB:</span>
                  <span className="text-gray-700 font-medium">{item.dob || 'N/A'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientsList;