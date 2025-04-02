import Login from "./components/login";
import Create from "./components/create";
import Home from "./components/home";
import Support from './components/support';
import Shop from './components/shop';
import { Routes, Route } from "react-router-dom";
import "./styles/login.css"
import "./styles/sidebar.css"
import "./styles/chatbot.css"
import "./styles/weather.css"
import "./styles/forecast.css"
import "./styles/support.css"
import "./styles/shop.css"

function App(){
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<Create />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/support" element={<Support />} />
      </Routes>
    </div>
  )
}

export default App;
