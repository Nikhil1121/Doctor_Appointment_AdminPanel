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
      if (data.success) {
        setPatients(data.users.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (aToken) getAllPatients();
  }, [aToken]);

  return (
    <div className="m-4 sm:m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium mb-4">
        All Patients
        <span className="ml-2 text-sm text-gray-500">
          (Total: {patients.length})
        </span>
      </h1>

      <div className="bg-white border rounded text-sm">
        <div className="hidden sm:grid grid-cols-[0.5fr_1.5fr_3fr_2fr_1.5fr_1.5fr] py-3 px-6 border-b bg-gray-50 text-gray-500 font-medium">
          <p>#</p>
          <p>Photo</p>
          <p>Name & Email</p>
          <p>Phone</p>
          <p>Gender</p>
          <p>DOB</p>
        </div>

        {patients.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No patients registered yet
          </div>
        ) : (
          patients.map((item, index) => (
            <div
              className="flex flex-col sm:grid sm:grid-cols-[0.5fr_1.5fr_3fr_2fr_1.5fr_1.5fr] items-start sm:items-center py-3 px-4 sm:px-6 border-b hover:bg-gray-50 gap-2 sm:gap-0"
              key={index}
            >
              <p className="hidden sm:block text-gray-500">{index + 1}</p>

              <img
                className="w-10 h-10 rounded-full object-cover bg-gray-100"
                src={item.image}
                alt={item.name}
              />

              <div>
                <p className="text-gray-800 font-medium">{item.name}</p>
                <p className="text-gray-500 text-xs">{item.email}</p>
              </div>

              <p className="text-gray-600">{item.phone || 'N/A'}</p>
              <p className="text-gray-600">{item.gender || 'N/A'}</p>
              <p className="text-gray-600">{item.dob || 'N/A'}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PatientsList;