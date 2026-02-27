import Login from "./Page/Login.tsx"


function App() {
 
 

  return (
    <>
    <div className="h-screen flex bg-gradient-to-br from-pink-300  via-to-pink-100 to-purple-300   flex-col items-center p-2  justify-center">
    <div className="flex shadow-500/50 shadow-xl/30 h-auto bg-gray-100 border-3 w-full  md:w-2/3 overflow-hidden rounded-xl flex-wrap border-purple-500">
    <div className="basis-1/2 xs:basis-0 relative overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-violet-700 via-purple-500 to-pink-500">
  
  <div className="absolute w-64 h-64 rounded-full bg-purple-400/40 blur-3xl -top-16 -left-16" />
  <div className="absolute w-56 h-56 rounded-full bg-pink-400/30 blur-3xl -bottom-12 -right-12" />

  <div className="text-center px-8 z-10 animate-pulse">
    <div className="text-white text-3xl font-bold mb-3">Welcome Back</div>
    <p className="text-purple-200 text-sm">Sign in to continue your journey</p>
  </div>

</div>
<Login  />
</div>
</div>
    </>
  )
}

export default App
