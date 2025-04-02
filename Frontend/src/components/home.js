import Sidebar from './sidebar';
import Chatbot from './chatbot';
import RotatingContent from './rotating-content';

export default function Home() {
    return (
        <>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <Sidebar />

                <div style={{ position: 'fixed', left: '20vw', top: '40vh', zIndex: 1000 }}>
                    <RotatingContent />
                </div>
                
                <div style={{ position: 'fixed', left: '68vw', top: '15vh', zIndex: 1000 }}>
                    <Chatbot />
                </div>
            </div>
        </>
    );
}
