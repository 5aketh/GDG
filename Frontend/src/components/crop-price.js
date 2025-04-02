import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';

export default function CropPrice() {
  const [loadingMessageText, setLoadingMessageText] = useState("Fetching live crop data...");
  const [cropData, setCropData] = useState([]);
  async function fetchData() {
    try {
      const state = "Karnataka";
      const district = "Bangalore";
      const dataEndpoint = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001c0db9ee53b3649fb5406cd8dd552171e&format=json&filters[state.keyword]=${state}&filters[district]=${district}`; // Replace YOUR_API_KEY
      return dataEndpoint;
    } catch (error) {
      console.error("Error fetching location data:", error);
      setLoadingMessageText(`Error fetching location data: ${error.message}`);
      return null;
    }
  }
  
  async function fetchCropData() {
    const dataEndpoint = await fetchData();
    if (!dataEndpoint) return;
      try {
        const response = await fetch(dataEndpoint);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseData = await response.json();
        setLoadingMessageText(''); // Clear loading message
        setCropData(responseData.records);
      } catch (error) {
        setLoadingMessageText(`Error fetching crop data: ${error.message}`);
        console.error("Error fetching crop data:", error);
      }
  }
  
  useEffect(() => {
    fetchCropData();
    const intervalId = setInterval(fetchCropData, 5000); // Set up interval
    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }); // Empty dependency array means this runs once after the initial render

  const columnsToRemove = ['state', 'district', 'variety', 'arrival_date'];
  const columnRenames = {'market': 'Area', 'commodity': 'Vegetable'};
  const marketColumn = 'market';

  function renderCropDataAsTable() {
    if (!cropData || cropData.length === 0) {
      return (
        <tr>
          <td colSpan="99" style={{ textAlign: 'center', padding: '15px' }}>
            No crop data available for your location.
          </td>
        </tr>
      );
    }

    const headers = Object.keys(cropData[0])
    .filter(key => !columnsToRemove.includes(key))
    .map(key => columnRenames[key] || key)
    .map(headerText => (
    <th key={headerText}>{headerText.charAt(0).toUpperCase() + headerText.slice(1)}</th>
    ));

    const rows = cropData.map(item => {
      return (
        <tr key={item.id || Math.random()}> {/* Add a unique key */}
          {Object.keys(item).map(originalKey => {
            if (!columnsToRemove.includes(originalKey)) {
              let cellValue = item[originalKey];
              if (originalKey === marketColumn && typeof cellValue === 'string') {
                cellValue = cellValue.replace(/Bangalore/gi, '').trim();
                if (cellValue.startsWith(',')) {
                  cellValue = cellValue.substring(1).trim();
                }
                if (cellValue.endsWith(',')) {
                  cellValue = cellValue.slice(0, -1).trim();
                }
              }
              return <td key={originalKey}>{cellValue}</td>;
            }
            return null;
          })}
          </tr>
      );
    });
    return (
      <>
        <thead>
          <tr>{headers}</tr>
        </thead>
        <tbody>{rows}</tbody>
      </>
    );
  }
  return (
    <div>
      <Sidebar />
      <div id="crop-data-container">
        <div className="table-container">
          <table id="crop-table">
            {loadingMessageText === '' && renderCropDataAsTable()}
          </table>
        </div>
      </div>
    </div>
  );
}