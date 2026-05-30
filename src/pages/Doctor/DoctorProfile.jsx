import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const DoctorProfile = () => {
  const { dToken, profileData, getProfileData, backendUrl } = useContext(DoctorContext)
  const [isEdit, setIsEdit] = useState(false)
  const [fees, setFees] = useState('')
  const [address, setAddress] = useState({ line1: '', line2: '' })
  const [available, setAvailable] = useState(false)

  const updateProfile = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/doctor/update-profile',
        { fees, address, available },
        { headers: { dtoken: dToken } }
      )
      if (data.success) {
        toast.success('Profile Updated! ✅')
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (dToken) getProfileData()
  }, [dToken])

  useEffect(() => {
    if (profileData) {
      setFees(profileData.fees)
      setAddress(profileData.address)
      setAvailable(profileData.available)
    }
  }, [profileData])

  if (!profileData) {
    return (
      <div className='flex items-center justify-center min-h-[60vh]'>
        <div className='w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin'></div>
      </div>
    )
  }

  return (
    <div className='m-4 sm:m-5'>
      <div className='flex flex-col gap-4 max-w-2xl'>

        {/* Profile Image & Basic Info */}
        <div className='bg-white rounded-2xl border p-6'>
          <div className='flex flex-col sm:flex-row gap-6 items-start'>
            <img className='w-32 h-32 rounded-2xl object-cover bg-primary/10' src={profileData.image} alt="" />
            <div className='flex-1'>
              <p className='text-2xl font-bold text-gray-800'>{profileData.name}</p>
              <p className='text-primary font-medium mt-1'>{profileData.speciality}</p>
              <p className='text-gray-500 text-sm mt-1'>{profileData.degree}</p>
              <div className='mt-3 flex flex-wrap gap-2'>
                <span className='bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium'>{profileData.experience}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${profileData.available ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}>
                  {profileData.available ? '● Available' : '● Unavailable'}
                </span>
              </div>
            </div>
          </div>

          <div className='mt-4'>
            <p className='text-sm font-medium text-gray-700 mb-1'>About</p>
            <p className='text-gray-500 text-sm leading-6'>{profileData.about}</p>
          </div>
        </div>

        {/* Editable Info */}
        <div className='bg-white rounded-2xl border p-6'>
          <p className='text-lg font-semibold mb-4'>Profile Settings</p>

          <div className='flex flex-col gap-4'>
            <div>
              <p className='text-sm font-medium text-gray-700 mb-1'>Consultation Fees (₹)</p>
              {isEdit ? (
                <input
                  type='number'
                  value={fees}
                  onChange={(e) => setFees(e.target.value)}
                  className='border border-gray-300 rounded-lg w-full p-2.5 focus:outline-primary'
                />
              ) : (
                <p className='text-primary font-bold text-xl'>₹{profileData.fees}</p>
              )}
            </div>

            <div>
              <p className='text-sm font-medium text-gray-700 mb-1'>Address</p>
              {isEdit ? (
                <div className='flex flex-col gap-2'>
                  <input
                    type='text'
                    value={address.line1}
                    onChange={(e) => setAddress(prev => ({ ...prev, line1: e.target.value }))}
                    className='border border-gray-300 rounded-lg w-full p-2.5 focus:outline-primary'
                    placeholder='Address Line 1'
                  />
                  <input
                    type='text'
                    value={address.line2}
                    onChange={(e) => setAddress(prev => ({ ...prev, line2: e.target.value }))}
                    className='border border-gray-300 rounded-lg w-full p-2.5 focus:outline-primary'
                    placeholder='Address Line 2'
                  />
                </div>
              ) : (
                <p className='text-gray-500 text-sm'>{profileData.address.line1}, {profileData.address.line2}</p>
              )}
            </div>

            <div className='flex items-center gap-2'>
              <input
                type='checkbox'
                checked={isEdit ? available : profileData.available}
                onChange={(e) => isEdit && setAvailable(e.target.checked)}
                className='w-4 h-4 accent-primary cursor-pointer'
              />
              <p className='text-sm text-gray-700'>Available for appointments</p>
            </div>
          </div>

          <div className='mt-6 flex gap-3'>
            {isEdit ? (
              <>
                <button onClick={updateProfile} className='bg-primary text-white px-8 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity'>
                  Save Changes
                </button>
                <button onClick={() => setIsEdit(false)} className='border border-gray-300 text-gray-600 px-6 py-2.5 rounded-lg text-sm hover:bg-gray-50 transition-all'>
                  Cancel
                </button>
              </>
            ) : (
              <button onClick={() => setIsEdit(true)} className='bg-primary text-white px-8 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity'>
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile