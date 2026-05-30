import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, completeAppointment, cancelAppointment } = useContext(DoctorContext)
  const navigate = useNavigate()

  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_")
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }

  useEffect(() => {
    if (dToken) getDashData()
  }, [dToken])

  if (!dashData) {
    return (
      <div className='flex items-center justify-center min-h-[60vh]'>
        <div className='flex flex-col items-center gap-3'>
          <div className='w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin'></div>
          <p className='text-gray-500'>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='m-4 sm:m-5'>

      {/* Stats Cards */}
      <div className='grid grid-cols-3 gap-3 mb-6'>

        {/* Earnings */}
        <div
          onClick={() => navigate('/doctor-appointments')}
          className='bg-white p-4 rounded-xl border-2 border-gray-100 hover:shadow-md hover:scale-105 transition-all cursor-pointer'
        >
          <div className='flex items-center gap-3'>
            <div className='text-3xl'>💰</div>
            <div>
              <p className='text-xl font-bold text-gray-700'>₹{dashData.earnings}</p>
              <p className='text-gray-400 text-sm'>Earnings</p>
            </div>
          </div>
        </div>

        {/* Appointments */}
        <div
          onClick={() => navigate('/doctor-appointments')}
          className='bg-white p-4 rounded-xl border-2 border-gray-100 hover:shadow-md hover:scale-105 transition-all cursor-pointer'
        >
          <div className='flex items-center gap-3'>
            <div className='text-3xl'>📅</div>
            <div>
              <p className='text-xl font-bold text-gray-700'>{dashData.appointments}</p>
              <p className='text-gray-400 text-sm'>Appointments</p>
            </div>
          </div>
        </div>

        {/* Patients */}
        <div
          onClick={() => navigate('/doctor-appointments')}
          className='bg-white p-4 rounded-xl border-2 border-gray-100 hover:shadow-md hover:scale-105 transition-all cursor-pointer'
        >
          <div className='flex items-center gap-3'>
            <div className='text-3xl'>👥</div>
            <div>
              <p className='text-xl font-bold text-gray-700'>{dashData.patients}</p>
              <p className='text-gray-400 text-sm'>Patients</p>
            </div>
          </div>
        </div>

      </div>

      {/* Latest Appointments */}
      <div className='bg-white rounded-xl border'>
        <div className='flex items-center justify-between px-4 py-4 border-b'>
          <div className='flex items-center gap-2.5'>
            <img src={assets.list_icon} alt="" />
            <p className='font-semibold'>Latest Appointments</p>
          </div>
          <button
            onClick={() => navigate('/doctor-appointments')}
            className='text-primary text-sm hover:underline'
          >
            View All →
          </button>
        </div>

        <div>
          {dashData.latestAppointments.length === 0 ? (
            <div className='p-6 text-center text-gray-500'>No appointments yet</div>
          ) : (
            dashData.latestAppointments.map((item, index) => (
              <div
                className='flex items-center px-4 sm:px-6 py-3 gap-3 hover:bg-gray-50 border-b last:border-b-0 cursor-pointer transition-all'
                key={index}
                onClick={() => navigate('/doctor-appointments')}
              >
                <img className='rounded-full w-10 h-10 object-cover' src={item.userData.image} alt="" />
                <div className='flex-1'>
                  <p className='text-gray-800 font-medium text-sm'>{item.userData.name}</p>
                  <p className='text-gray-500 text-xs'>Booking on {slotDateFormat(item.slotDate)} at {item.slotTime}</p>
                </div>
                {item.cancelled ? (
                  <span className='text-red-400 text-xs font-medium px-2 py-1 bg-red-50 rounded-full'>Cancelled</span>
                ) : item.isCompleted ? (
                  <span className='text-green-500 text-xs font-medium px-2 py-1 bg-green-50 rounded-full'>Completed</span>
                ) : (
                  <div className='flex gap-2' onClick={e => e.stopPropagation()}>
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className='text-xs border border-red-200 text-red-400 px-3 py-1 rounded-full hover:bg-red-500 hover:text-white transition-all'
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => completeAppointment(item._id)}
                      className='text-xs border border-green-300 text-green-500 px-3 py-1 rounded-full hover:bg-green-500 hover:text-white transition-all'
                    >
                      Complete
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard