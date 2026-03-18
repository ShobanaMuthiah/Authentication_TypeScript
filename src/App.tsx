import Login from "./Page/Login.tsx"
import { io } from "socket.io-client"

function App() {
 
 const socket=io("http://localhost:5000")
 socket.on("connection",()=>{
  // displayMessage()
 })

  return (
    <>
    <Login  />
    </>
  )
}

export default App
