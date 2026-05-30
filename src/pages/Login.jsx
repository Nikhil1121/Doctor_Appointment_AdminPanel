import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const { setAToken, backendUrl } = useContext(AdminContext)
  const { setDToken } = useContext(DoctorContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
        if (data.success) {
          localStorage.setItem('aToken', data.token)
          setAToken(data.token)
          toast.success('Welcome Admin! 👋')
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
        if (data.success) {
          localStorage.setItem('dToken', data.token)
          setDToken(data.token)
          toast.success('Welcome Doctor! 👨‍⚕️')
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center px-4'>
      <div className='flex flex-col gap-4 m-auto items-start p-8 w-full max-w-md border rounded-2xl text-gray-600 text-sm shadow-xl bg-white'>

        <div className='w-full text-center'>
          <p className='text-2xl font-semibold'>
            <span className='text-primary'>{state}</span> Login
          </p>
          <p className='text-gray-400 text-sm mt-1'>Please login to continue</p>
        </div>

        <div className='w-full'>
          <p className='font-medium mb-1'>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className='border border-gray-300 rounded-lg w-full p-2.5 focus:outline-primary'
            type="email"
            required
            placeholder='Enter your email'
          />
        </div>

        <div className='w-full'>
          <p className='font-medium mb-1'>Password</p>
          <div className='relative'>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className='border border-gray-300 rounded-lg w-full p-2.5 pr-10 focus:outline-primary'
              type={showPassword ? 'text' : 'password'}
              required
              placeholder='Enter your password'
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'
            >
              {showPassword ? (
                // Eye Off Icon
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21" />
                </svg>
              ) : (
                // Eye Icon
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <button
          type='submit'
          className='bg-primary text-white w-full py-2.5 rounded-lg text-base font-medium hover:opacity-90 transition-opacity'
        >
          Login
        </button>

        {state === 'Admin' ? (
          <p className='w-full text-center'>
            Doctor Login?{' '}
            <span onClick={() => setState('Doctor')} className='text-primary underline cursor-pointer font-medium'>
              Click here
            </span>
          </p>
        ) : (
          <p className='w-full text-center'>
            Admin Login?{' '}
            <span onClick={() => setState('Admin')} className='text-primary underline cursor-pointer font-medium'>
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  )
}

export default Login