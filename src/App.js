import Login from "./components/login";
import Create from "./components/create";
import Home from "./components/home";
import { Routes, Route } from "react-router-dom";
import "./styles/login.css"
import "./styles/sidebar.css"
import "./styles/chatbot.css"
import "./styles/weather.css"

function App(){
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create" element={<Create />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App;
