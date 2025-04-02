import React, { useRef, useState, useEffect } from 'react';

export default function RotatingContent() {
  const cuboidRef = useRef(null);
  const [rotateY, setRotateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const rotationDuration = 4000;
  const pauseDuration = 10000;
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const autoRotateTimeout = useRef(null);

  useEffect(() => {
    const cuboid = cuboidRef.current;
    if (!cuboid) return;

    function rotateToNextFace() {
      setIsAutoRotating(true);
      cuboid.style.transition = `transform ${rotationDuration}ms linear`;
      setRotateY(prevRotateY => prevRotateY - 90);
      setTimeout(() => {
        setIsAutoRotating(false);
        cuboid.style.transition = 'transform 0.3s ease-out'; 
        autoRotateTimeout.current = setTimeout(rotateToNextFace, pauseDuration);
      }, rotationDuration);
    }

    function stopAutoRotation() {
      clearTimeout(autoRotateTimeout.current);
      setIsAutoRotating(false);
      cuboid.style.transition = 'transform 0.3s ease-out'; 
    }

    const handleMouseDown = (e) => {
      setIsDragging(true);
      setStartX(e.clientX);
      stopAutoRotation(); 
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const currentX = e.clientX;
      const deltaX = currentX - startX;
      setRotateY(prevRotateY => prevRotateY + deltaX * 0.2);
      setStartX(currentX);
    };

    const handleMouseUp = () => {
      snapToFace();
      startDelayedAutoRotation(); 
    };

    const handleMouseLeave = () => {
      if (isDragging) {
        snapToFace();
        startDelayedAutoRotation();
      }
      setIsDragging(false);
    };

    const handleTouchStart = (e) => {
      setIsDragging(true);
      setStartX(e.touches[0].clientX);
      stopAutoRotation(); 
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      const currentX = e.touches[0].clientX;
      const deltaX = currentX - startX;
      setRotateY(prevRotateY => prevRotateY + deltaX * 0.2);
      setStartX(currentX);
    };

    const handleTouchEnd = () => {
      snapToFace();
      startDelayedAutoRotation(); 
    };

    const handleTouchCancel = () => {
      snapToFace();
      startDelayedAutoRotation();
      setIsDragging(false);
    };

    function snapToFace() {
      setIsDragging(false);
      cuboid.style.transition = 'transform 0.3s ease-out';
      const targetRotation = Math.round(rotateY / 90) * 90;
      setRotateY(targetRotation);
    }

    function startDelayedAutoRotation() {
      if (!isAutoRotating) {
        autoRotateTimeout.current = setTimeout(rotateToNextFace, pauseDuration);
      }
    }

    
    cuboid.addEventListener('mousedown', handleMouseDown);
    cuboid.addEventListener('mousemove', handleMouseMove);
    cuboid.addEventListener('mouseup', handleMouseUp);
    cuboid.addEventListener('mouseleave', handleMouseLeave);
    cuboid.addEventListener('touchstart', handleTouchStart);
    cuboid.addEventListener('touchmove', handleTouchMove);
    cuboid.addEventListener('touchend', handleTouchEnd);
    cuboid.addEventListener('touchcancel', handleTouchCancel);

    
    startDelayedAutoRotation();

    
    return () => {
      cuboid.removeEventListener('mousedown', handleMouseDown);
      cuboid.removeEventListener('mousemove', handleMouseMove);
      cuboid.removeEventListener('mouseup', handleMouseUp);
      cuboid.removeEventListener('mouseleave', handleMouseLeave);
      cuboid.removeEventListener('touchstart', handleTouchStart);
      cuboid.removeEventListener('touchmove', handleTouchMove);
      cuboid.removeEventListener('touchend', handleTouchEnd);
      cuboid.removeEventListener('touchcancel', handleTouchCancel);
      clearTimeout(autoRotateTimeout.current);
    };
  }); 

  return (
    <div className="cuboid-container">
      <div ref={cuboidRef} className="cuboid" style={{ transform: `rotateX(0deg) rotateY(${rotateY}deg)` }}>

        <div className="face front">
            <img src="https://img.freepik.com/premium-vector/indian-farmer-holding-green-crops_1308360-47.jpg" alt="Famers" width={'200vw'} />
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '2vw' }}>
                <h2 style={{ color: '#fff', fontFamily: 'Audiowide, sans-serif' }}>
                    Annadata
                </h2>
                <p style={{ color: '#fff', fontSize: '1vw' }}>
                    A one stop solution for all agriculture related problems.
                </p>
            </div>
        </div>

        <div className="face back">
            <img src="https://images.freecreatives.com/wp-content/uploads/2016/07/sky-vectors.jpg" alt="Weather" width={'200vw'} />
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '2vw' }}>
                <h2 style={{ color: '#fff', fontFamily: 'Audiowide, sans-serif' }}>
                    Weather
                </h2>
                <p style={{ color: '#fff', fontSize: '1vw' }}>
                    Get accurate weather related updates and forecast data.
                </p>
            </div>
        </div>

        <div className="face right">
            <img src="https://img.freepik.com/free-vector/investor-with-laptop-monitoring-growth-dividends-trader-sitting-stack-money-investing-capital-analyzing-profit-graphs-vector-illustration-finance-stock-trading-investment_74855-8432.jpg" alt="Market" width={'200vw'} />
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '2vw' }}>
                <h2 style={{ color: '#fff', fontFamily: 'Audiowide, sans-serif' }}>
                    Market prices
                </h2>
                <p style={{ color: '#fff', fontSize: '1vw' }}>
                    Get accurate prices of crops in your nearby localities.
                </p>
            </div>
        </div>

        <div className="face left">
            <img src="https://static.vecteezy.com/system/resources/previews/001/409/906/non_2x/man-shopping-in-e-commerce-marketplace-vector.jpg" alt="Market" width={'200vw'} />
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '2vw' }}>
                <h2 style={{ color: '#fff', fontFamily: 'Audiowide, sans-serif' }}>
                    Market prices
                </h2>
                <p style={{ color: '#fff', fontSize: '1vw' }}>
                    Get accurate live prices of crops being sold in your locality.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}