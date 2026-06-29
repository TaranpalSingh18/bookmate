import {BrowserRouter, Routes, Route} from "react-router-dom"

import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Events from "./pages/Events"
import EventCard from "./components/EventCard"


const App = () =>{
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Events/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App