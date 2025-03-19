import Sidebar from './sidebar';
import Chatbot from './chatbot';
import Weather from './weather';
import Forecast from './forecast';

export default function Home() {
    return (
        <>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <Sidebar />
                <div style={{paddingTop: "5vh", paddingLeft: "5vw"}}>
                    <Weather />
                    <Forecast />
                </div>
                <div style={{position: 'absolute', left: '68vw', top: '15vh'}}>
                    <Chatbot />
                </div>
                
            </div>
        </>
    );
}
