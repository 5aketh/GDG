import Login from "./components/login";
import Create from "./components/create";
import Home from "./components/home";
import Support from './components/support';
import Shop2Buy from './components/buy';
import Shop2Sell from "./components/sell";
import Settings from "./components/settings";
import CropPrice from "./components/crop-price";
import Weather from "./components/weather";
import { Routes, Route } from "react-router-dom";
import "./styles/login.css"
import "./styles/sidebar.css"
import "./styles/chatbot.css"
import "./styles/weather.css"
import "./styles/forecast.css"
import "./styles/support.css"
import "./styles/shop.css"
import "./styles/crop-price.css"
import "./styles/rotating-content.css"
import "./styles/settings.css"

function App(){
  return (
    <div className="App">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Audiowide&display=swap" rel="stylesheet" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&display=swap" rel="stylesheet" />
      </head>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create" element={<Create />} />
        <Route path="/home" element={<Home />} />
        <Route path="/support" element={<Support />} />
        <Route path="/shop/buy" element={<Shop2Buy />} />
        <Route path="/shop/sell" element={<Shop2Sell />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/tools/market" element={<CropPrice />} />
        <Route path="/tools/weather" element={<Weather />} />
      </Routes>
    </div>
  )
}

export default App;
