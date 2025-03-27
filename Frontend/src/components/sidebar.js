import React, { useEffect } from 'react';

export default function Sidebar() {
    useEffect(() => {
        let menu_button = document.querySelector("#menub");
        let homeElement = document.getElementById("home"); // Store the element itself
        menu_button.onclick = function() {
            let sidebar = document.getElementById("sidebar");
            let shopElement = document.getElementById("shop");
            let settingElement = document.getElementById("setting");
            let logoutElement = document.getElementById("logout");
            let supportElement = document.getElementById("support");

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
            }
        }, [])
    return (
        <div className="homebody">
            <div className="sidebar" id="sidebar">
                <div id="menub">
                    <svg xmlns="http://www.w3.org/2000/svg" height="2vw" viewBox="0 -960 960 960" width="2vw" fill="#fff">
                        <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
                    </svg>
                    
                    <ul style={{paddingTop: "2vw"}}>
                        <li>
                            <a href={`/home`}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="2vw" viewBox="0 -960 960 960" width="2vw" fill="#fff">
                                    <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
                                </svg>
                                <span className="menuText" id="home">Home</span>
                            </a>
                        </li>
                        <li>
                            <a href={`/shop`}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="2vw" viewBox="0 -960 960 960" width="2vw" fill="#fff">
                                    <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/>
                                </svg>
                                <span className="menuText" id="shop">Shopping</span>
                            </a>
                        </li>
                        <li>
                            <a href={`/support`}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="2vw" viewBox="0 -960 960 960" width="2vw" fill="#fff">
                                    <path d="M440-120v-80h320v-284q0-117-81.5-198.5T480-764q-117 0-198.5 81.5T200-484v244h-40q-33 0-56.5-23.5T80-320v-80q0-21 10.5-39.5T120-469l3-53q8-68 39.5-126t79-101q47.5-43 109-67T480-840q68 0 129 24t109 66.5Q766-707 797-649t40 126l3 52q19 9 29.5 27t10.5 38v92q0 20-10.5 38T840-249v49q0 33-23.5 56.5T760-120H440Zm-80-280q-17 0-28.5-11.5T320-440q0-17 11.5-28.5T360-480q17 0 28.5 11.5T400-440q0 17-11.5 28.5T360-400Zm240 0q-17 0-28.5-11.5T560-440q0-17 11.5-28.5T600-480q17 0 28.5 11.5T640-440q0 17-11.5 28.5T600-400Zm-359-62q-7-106 64-182t177-76q89 0 156.5 56.5T720-519q-91-1-167.5-49T435-698q-16 80-67.5 142.5T241-462Z"/>
                                </svg>
                                <span class="menuText" id="support">Support</span>
                            </a>
                        </li>
                        <li>
                            <a href="/#">
                                <svg xmlns="http://www.w3.org/2000/svg" height="2vw" viewBox="0 -960 960 960" width="2vw" fill="#fff">
                                    <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"/>
                                </svg>
                                <span class="menuText" id="setting">Settings</span>
                            </a>
                        </li>
                        <li>
                            <a href="/#">
                                <svg xmlns="http://www.w3.org/2000/svg" height="2vw" viewBox="0 -960 960 960" width="2vw" fill="#fff">
                                    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/>
                                </svg>
                                <span class="menuText" id="logout">Logout</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
