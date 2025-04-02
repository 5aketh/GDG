import React, { useEffect } from 'react';

export default function Sidebar() {
  useEffect(() => {
    const menuButton = document.querySelector("#menub");
    const sidebar = document.getElementById("sidebar");
    const homeElement = document.getElementById("home");
    const shopElement = document.getElementById("shop");
    const settingElement = document.getElementById("setting");
    const logoutElement = document.getElementById("logout");
    const supportElement = document.getElementById("support");

    if (menuButton) { 
      menuButton.onclick = function() {
        if (!homeElement || !shopElement || !settingElement || !logoutElement || !supportElement) {
          console.error("One or more sidebar elements not found.");
          return; 
        }

        if (homeElement.style.display === "none" || homeElement.style.display === "") {
          sidebar.style.width = "15vw";
          homeElement.style.display = "block";
          shopElement.style.display = "block";
          supportElement.style.display = "block";
          settingElement.style.display = "block";
          logoutElement.style.display = "block";
        } else {
          sidebar.style.width = "5.5vw";
          homeElement.style.display = "none";
          shopElement.style.display = "none";
          supportElement.style.display = "none";
          settingElement.style.display = "none";
          logoutElement.style.display = "none";
        }
      };
    } else {
      console.error("Menu button not found.");
    }
  }, []);

  return (
      <div className="background">
        <div className="header-content">
          <div className="logo-large">
            <p>Annadata</p>
            <p style={{ marginLeft: '5vw', fontFamily: "Kalam, cursive", fontWeight: 700, fontStyle: 'normal' }}>अन्नदाता</p>
          </div>
          <nav className="curved-nav">
            <a href="/home">Home</a>
            <div className="dropdown">
              <a href="/" className="dropbtn">Tools</a>
              <div className="dropdown-content">
                <a href="/tools/market">Market Prices</a>
                <a href="/tools/weather">Weather</a>
              </div>
            </div>
            <div className="dropdown">
              <a href="/#" className="dropbtn">Shop</a>
              <div className="dropdown-content">
                <a href="/shop/buy">Buy</a>
                <a href="/shop/sell">Sell</a>
              </div>
            </div>
            <a href="/support">Contact</a>
            <a href="/settings">Settings</a>
          </nav>
        </div>
      </div>
  );
}