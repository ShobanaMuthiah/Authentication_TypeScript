import React, { useEffect, useRef, useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { useNavigate } from 'react-router'
import Toast from '../Component/Toast';
// 
export default function Login() {
  const navigate=useNavigate();
const accounts = [{email:'test@email.com',password:'1234'}]
const inputFocus=useRef<HTMLInputElement>(null)

useEffect(()=>{
  inputFocus.current?.focus()
},[])
const [toast,setToast]=useState<boolean>(false)
const [show,setShow]=useState<boolean>(false)

     const [username,setUsername]=useState<string>("") 
  const [usermail,setUsermail]=useState<string>("") 
  const [response,setResponse]=useState<string>("")
  const [error,setError]=useState<boolean>(false)
  const [userpassword,setUserpassword]=useState<string>("") 

useEffect(()=>{
  if(response!==""){

    setToast(true)
  } 

},[response])

function toggleShow(){
  setShow(!show)
}

  function handleUsername(e: React.ChangeEvent<HTMLInputElement>){
    setUsername(e.target.value)
// console.log(e.target.value)

  }
  function handleEmail(e:React.ChangeEvent<HTMLInputElement>){

    setUsermail(e.target.value)
  }
    function handlePassword(e:React.ChangeEvent<HTMLInputElement>){

    setUserpassword(e.target.value)
  }
  function handleSubmit(e:React.SubmitEvent<HTMLFormElement>){
console.log("form submit")
e.preventDefault();
setResponse("")
setUsermail("")
setUsername("")
setUserpassword("")
setToast(false)
console.log(username,usermail,userpassword)

setTimeout(()=>{

if(accounts[0].email!==usermail){

setError(true)
setResponse("Given Email id is not same as the Default")
}
else if(accounts[0].password!==userpassword){
setError(true)


    setResponse("Given password is not same as the Default")
}
else{

setResponse("Successfully Logged in")
setError(false)
navigate('/dashboard' )

    // console.log(response)
}
},0)

  }


  return (
    <div className='basis-1/2'>
      <form action="/userForm"  className='p-3 py-9 text-xs px-5 ' method="post" onSubmit={handleSubmit}>
      <div className='text-lg font-medium text-center mb-3 '>Sign in Account</div>
      <p className='py-3 px-3 text-center text-gray-600 border-1 border-gray-200 mx-2 cursor-pointer mt-2 rounded-md'>Sign in with Google</p>
      <div>
        <div className="flex px-10 my-4">
            <div className='flex-1 border-t-1 mt-2 border-gray-300 '></div>
        <span className='px-3'>or</span>
<div className='flex-1 border-t-1 border-gray-300 mt-2'></div>
        </div>
    <label htmlFor="" className='text-gray-600 ' id='user_mail'>
      Email Address
    </label>

<input type="email" ref={inputFocus} required className='border-gray-200 my-2 text-xs w-full p-2 rounded-md border-2' placeholder='Enter your email address' onChange={handleEmail} value={usermail} name='email' id='email'/>
</div>
  <div>
    <label htmlFor="username" className='text-gray-600' id='user_name'>
      User Name
    </label>

<input type="name"  placeholder='Enter your Full name' className='my-2 border-gray-200 text-xs w-full p-2 rounded-md border-2' onChange={handleUsername} value={username} name='name'  id='username'/>
</div>

<div>
    <label htmlFor="" className='text-gray-600' id='user_password'> 
      Password
    </label>
<div className='relative '>
<input type={show?"text":"password"} required className='my-2 border-gray-200 text-xs w-full p-2 rounded-md border-2 pr-10' placeholder='Create your password' onChange={handlePassword} value={userpassword} name='password' id='password'/>
<span onClick={toggleShow} className='absolute right-3 top-1/2 -translate-y-1/2 text-lg  cursor-pointer'>{show?<FaRegEye />: <FaRegEyeSlash />}</span>
</div>
</div>

<button type="submit" className='bg-purple-400 my-3 p-2 rounded-2xl cursor-pointer text-center w-full'>Sign in</button>
 <Toast  error={error} message={response} toast={toast} onClose={()=>setToast(false)}/>

<div className='flex-row-reverse flex '>
    <a href='/reset' className='font-medium text-xs cursor-pointer mb-2'>Forgot password?</a></div>

<p>Don't have an account? <a className='font-bold cursor-pointer' href='/signup'>Sign Up</a></p>
  </form>
    </div>
  )
}