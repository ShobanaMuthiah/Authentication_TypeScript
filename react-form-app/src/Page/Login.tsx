import React, { useEffect, useRef, useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { useNavigate } from 'react-router'
import Toast from '../Component/Toast';
import { GoogleLogin } from '@react-oauth/google';
// import { jwtDecode } from 'jwt-decode';
import { socket } from '../utils/socket';
import { api } from '../utils/api';
import { useDispatch } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../Context/Slice/UserSlice';
import axios from 'axios';
export default function Login() {
  const navigate = useNavigate();
  // const {setUser}=useAuth()
  // const setUser=
  const dispatch = useDispatch();
  const inputFocus = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputFocus.current?.focus()
  }, [])
  const [toast, setToast] = useState<boolean>(false)
  const [show, setShow] = useState<boolean>(false)

  const [username, setUsername] = useState<string>("")
  const [usermail, setUsermail] = useState<string>("")
  const [response, setResponse] = useState<string>("")
  const [error, setError] = useState<boolean>(false)
  const [userpassword, setUserpassword] = useState<string>("")

  useEffect(() => {
    if (response !== "") {

      setToast(true)
    }

  }, [response])

  function toggleShow() {
    setShow(!show)
  }

  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {

    setUsermail(e.target.value)
  }
  function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {

    setUserpassword(e.target.value)
  }

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(e)
    // setResponse("")
    // setUsermail("")
    // setUsername("")
    // setUserpassword("")
    setToast(false)
    console.log(usermail)
    dispatch(signInStart())
    try {

    const res = await api.post("/user/LoginForm",
      { email: usermail, password: userpassword }
    )
      console.log(res)

      if (res.statusText === "OK") {
        
        let data = res.data

        setResponse(data.message)
        if (data.status === "Success") {
          dispatch(signInSuccess(data.user))
          if (!socket.connected) socket.connect();
          socket.emit('join', data.user.id);
          navigate("/dashboard")
          setError(false)
          return;
        }
        else {
          setError(true)
          setResponse(data.message)
        }
      }
      else {
        console.log("error: ")
        setError(true)
        setResponse(res.data.message)
      }
    }
catch (error) {

      setError(true)
      if(axios.isAxiosError(error)){
        setResponse(error.response?.data?.message??"Login failed")
      }
      else{
        setResponse(error as string)

      }
    }
  }
  const handleOauth = async (e: {}) => {
    console.log(e)
    setResponse("")
    setUsermail("")
    setUsername("")
    setUserpassword("")
    setToast(false)
    // console.log(e)


try {
    const res = await api.post("/user/loginOAuth", e
    )
    
      if (res.statusText === "OK") {
        const data = res.data
        setResponse(data.message)
        if (data.status === "Success") {
          setError(false)
          navigate('/dashboard')
          return;
        }
        setError(true)
      }
      else{
      setError(true)
        setResponse(res.data.message)

      }

    } catch (error) {

      setError(true)
      if(axios.isAxiosError(error)){
        setResponse(error.response?.data?.message??"Login failed")
      }
      else{
        setResponse(error as string)

      }
    }



  }


  return (
    <div className="h-screen flex bg-gradient-to-br from-pink-300  via-to-pink-100 to-purple-300   flex-col items-center p-2  justify-center">
      <div className="flex shadow-500/50 shadow-xl/30 h-auto bg-gray-100 border-3 w-full  md:w-2/3 overflow-hidden rounded-xl flex-wrap border-purple-500">
        <div className=" sm:w-1/2  hidden md:block relative overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-violet-700 via-purple-500 to-pink-500">

          <div className="absolute w-64 h-64 rounded-full bg-purple-400/40 blur-3xl -top-16 -left-16" />
          <div className="absolute w-56 h-56 rounded-full bg-pink-400/30 blur-3xl -bottom-12 -right-12" />

          <div className="xs:hidden  text-center px-8 z-10 animate-pulse">
            <div className="text-white text-3xl font-bold mb-3">Welcome Back</div>
            <p className="text-purple-200 text-sm">Sign in to continue your journey</p>
          </div>

        </div>
        <div className='w-full md:w-1/2'>
          <form className='p-3 py-9 text-xs px-5 ' method="post" onSubmit={handleSubmit}>
            <div className='text-lg font-medium text-center mb-3 '>Sign in Account</div>

            <div className='py-3 px-3 text-center items-center justify-center flex text-gray-600 mx-2 cursor-pointer mt-2 rounded-md'>
              <GoogleLogin text='signin_with' context='signin' use_fedcm_for_prompt={false} logo_alignment='center' shape='pill'
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse)
                  handleOauth(credentialResponse)
                  //  setResponse("Successfuly Created your account")
                  //  navigate("/")


                }}
                onError={() => console.error("sing up failed")} />
            </div>
            <div>
              <div className="flex px-10 my-4">
                <div className='flex-1 border-t-1 mt-2 border-gray-300 '></div>
                <span className='px-3'>or</span>
                <div className='flex-1 border-t-1 border-gray-300 mt-2'></div>
              </div>
              <label htmlFor="" className='text-gray-600 ' id='user_mail'>
                Email Address
              </label>

              <input type="email" ref={inputFocus} required className='border-gray-200 my-2 text-xs w-full p-2 rounded-md border-2' placeholder='Enter your email address' onChange={handleEmail} value={usermail} name='email' id='email' />
            </div>

            <div>
              <label htmlFor="" className='text-gray-600' id='user_password'>
                Password
              </label>
              <div className='relative '>
                <input type={show ? "text" : "password"} required className='my-2 border-gray-200 text-xs w-full p-2 rounded-md border-2 pr-10' placeholder='Create your password' onChange={handlePassword} value={userpassword} name='password' id='password' />
                <span onClick={toggleShow} className='absolute right-3 top-1/2 -translate-y-1/2 text-lg  cursor-pointer'>{show ? <FaRegEye /> : <FaRegEyeSlash />}</span>
              </div>
            </div>

            <button type="submit" className='bg-purple-400 my-3 p-2 rounded-2xl cursor-pointer text-center w-full'>Sign in</button>
            <Toast error={error} message={response} toast={toast} onClose={() => setToast(false)} />

            <div className='flex-row-reverse flex '>
              <a href='/reset' className='font-medium text-xs cursor-pointer mb-2'>Forgot password?</a></div>

            <p>Don't have an account? <a className='font-bold cursor-pointer' href='/signup'>Sign Up</a></p>
          </form>
        </div>
      </div>
    </div>
  )
}