import React from 'react'
    type toastProps={
        error:boolean,
        message:string,
        toast:boolean,
        onClose:()=>void

    }
 const Toast: React.FC<toastProps>=({error,message,toast,onClose}) =>{

  return (
    <><div className={`w-full mb-1 transform ease-in-out transition-transform   duration-500 ${error?" bg-red-100 border-red-200":" bg-green-100 border-green-200"}
     ${toast?"translate-x-0":"translate-x-[150%] "}  border-1  rounded-xl  p-2`}>
  <button type='button' onClick={onClose} className='float-right cursor-pointer'>
    ✕
  </button>
<p className={error?"text-red-500":"text-green-500"}>{message?message:"error message"}</p>
</div></>
  )
}
export default Toast