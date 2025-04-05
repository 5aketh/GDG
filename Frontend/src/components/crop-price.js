import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';

const stateDistrictData = {
  "Andaman and Nicobar": ["North and Middle Andaman", "South Andaman", "Nicobar"],
  "Andhra Pradesh": ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam", "Vijayanagaram", "West Godavari"],
  "Arunachal Pradesh": ["East Siang", "Lohit", "Lower Dibang Valley", "Lower Subansiri", "Papum Pare", "Tawang", "Tirap", "Upper Subansiri", "West Kameng", "West Siang"],
  "Assam": ["Barpeta", "BONGAIGAON", "Cachar", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Goalpara", "Golaghat", "Hailakandi", "Jorhat", "Kamrup", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "MORIGAON", "Nagaon", "Nalbari", "Sibsagar", "Sonitpur", "Tinsukia"],
  "Bihar": ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Chhapra", "Darbhanga", "East Champaran/ Motihari", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur/Bhabhua", "Katihar", "Khagaria", "Kishanganj", "Luckeesarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnea", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"],
  "Chandigarh": ["Chandigarh"],
  "Chhattisgarh": ["Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Gariyaband", "Janjgir", "Jashpur", "Kabirdham", "Kanker", "Kondagaon", "Korba", "Koria", "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sukma", "Surajpur", "Surguja"],
  "Goa": ["North Goa", "South Goa"],
  "Gujarat": ["Ahmedabad", "Amreli", "Anand", "Banaskanth", "Bharuch", "Bhavnagar", "Botad", "Chhota Udaipur", "Dahod", "Dang", "Devbhumi Dwarka", "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagarh", "Kachchh", "Kheda", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahals", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "The Dangs", "Vadodara(Baroda)"],
  "Haryana": ["Ambala", "Bhiwani", "Faridabad", "Fatehabad", "Gurgaon", "Hisar", "Jhajar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh-Narnaul", "Mewat", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"],
  "Himachal Pradesh": ["Bilaspur", "Chamba", "Kangra", "Kullu", "Mandi", "Shimla", "Sirmore", "Solan", "Una"],
  "Jammu and Kashmir": ["Anantnag", "Baramulla", "Budgam", "Jammu", "Kathua", "Kupwara", "Pulwama", "Rajouri", "Srinagar", "Udhampur"],
  "Jharkhand": ["Bokaro", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ranchi", "Sahebgang", "Seraikela(Kharsawan)", "Simdega", "West Singhbhum"],
  "Karnataka": ["Bagalkot", "Bangalore", "Belgam", "Bellary", "Bidar", "Bijapur", "Chamarajanagar", "Chikmagalur", "Chitradurga", "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri", "Karwar(Uttar Kannad)", "Kodagu", "Kolar", "Koppal", "Madikeri(Kodagu)", "Mandya", "Mangalore(Dakshin Kannad)", "Mysore", "Raichur", "Shimoga", "Tumkur", "Udupi", "Yadgiri"],
  "Kerala": ["Alappuzha", "Alleppey", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode(Calicut)", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thirssur", "Wayanad"],
  "Madhya Pradesh": ["Agar Malwa", "Alirajpur", "Anupur", "Ashoknagar", "Badwani", "Balaghat", "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shehdol", "Sheopur", "Shivpuri", "Sidhi", "Singroli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"],
  "Maharashtra": ["Ahmednagar", "Akola", "Amrawati", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Chattrapati Sambhajinagar", "Dharashiv(Usmanabad)", "Dhule", "Gadchiroli", "Gondiya", "Hingoli", "Jalgaon", "Jalana", "Kolhapur", "Latur", "Mumbai", "Murum", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sholapur", "Thane", "Wardha", "Yavatmal"],
  "Manipur": ["Bishnupur", "Imphal East", "Imphal West", "Kakching", "Thoubal"],
  "Meghalaya": ["East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "Nongpoh (R-Bhoi)", "South Garo Hills", "South West Garo Hills", "South West Khasi Hills", "West Garo Hills", "West Jaintia Hills", "West Khasi Hills"],
  "Mizoram": ["Aizawl", "Lungli"],
  "NCT of Delhi": ["Delhi"],
  "Nagaland": ["Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", "Peren", "Phek", "Tuensang", "Tsemenyu", "Wokha", "Zunheboto"],
  "Odisha": ["Angul", "Balasore", "Bargarh", "Bhadrak", "Bolangir", "Boudh", "Cuttack", "Debagarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Keonjhar", "Khurdha", "Koraput", "Malkangiri", "Mayurbhanj", "Nayagarh", "Nowarangpur", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Sonepur", "Sundergarh"],
  "Pondicherry": ["Karaikal", "Pondicherry"],
  "Punjab": ["Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh", "Fazilka", "Ferozepur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Ludhiana", "Mansa", "Moga", "Mohali", "Muktsar", "Nawanshahr", "Pathankot", "Patiala", "Ropar (Rupnagar)", "Sangrur", "Tarntaran", "kapurthala"],
  "Rajasthan": ["Ajmer", "Alwar", "Anupgarh", "Balotra", "Banswara", "Baran", "Barmer", "Beawar", "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Deedwana Kuchaman", "Deeg", "Dholpur", "Dudu", "Dungarpur", "Ganganagar", "Ganganagar City", "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu", "Jodhpur", "Jodhpur Rural", "Karauli", "Kekri", "Khairthal Tijara", "Kota", "Kotputli- Behror", "Nagaur", "Neem Ka Thana", "Pali", "Phalodi", "Pratapgarh", "Rajsamand", "Sanchore", "Sikar", "Sirohi", "Swai Madhopur", "Tonk", "Udaipur"],
  "Sikkim": ["East", "South Sikkim (Namchi", "West Sikkim (Gyalsing)"],
  "Tamil Nadu": ["Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kancheepuram", "Karur", "Krishnagiri", "Madurai", "Nagapattinam", "Nagercoil (Kannyiakumari)", "Namakkal", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "The Nilgiris", "Theni", "Thiruchirappalli", "Thirunelveli", "Thirupathur", "Thirupur", "Thiruvannamalai", "Thiruvarur", "Thiruvellore", "Tuticorin", "Vellore", "Viluppuram", "Virudhunagar"],
  "Telangana": ["Adilabad", "Hyderabad", "Jagityal", "Karimnagar", "Khammam", "Mahbubnagar", "Medak", "Nalgonda", "Nizamabad", "Ranga Reddy", "Warangal"],
  "Tripura": ["Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South District", "Unakoti", "West District"],
  "Uttar Pradesh": ["Agra", "Aligarh", "Ambedkarnagar", "Amethi", "Amroha", "Auraiya", "Ayodhya", "Azamgarh", "Badaun", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti", "Bhadohi(Sant Ravi Nagar)", "Bijnor", "Bulandshahar", "Chandauli", "Chitrakut", "Deoria", "Etah", "Etawah", "Farukhabad", "Fatehpur", "Firozabad", "Gautam Buddh Nagar", "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun (Orai)", "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat", "Kasganj", "Kaushambi", "Khiri", "Kushinagar", "Lakhimpur", "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau(Maunathbhanjan)", "Meerut", "Mirzapur", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Prayagraj", "Raebarelli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", "Shamli", "Shravasti", "Siddharthnagar", "Sitapur", "Sonbhadra", "Unnao", "Varanasi"],
  "Uttarakhand": ["Champawat", "Dehradoon", "Garhwal (Pauri)", "Haridwar", "Nanital", "UdhamSinghNagar"],
  "West Bengal": ["Alipurduar", "Bankura", "Birbhum", "Burdwan", "Coochbehar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Malda", "Medinipur(E)", "Medinipur(W)", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Bardhaman", "Purba Bardhaman", "Puruliya", "South 24 Parganas", "Uttar Dinajpur"],
};

const columnsToRemove = ['state', 'district', 'variety', 'arrival_date'];
const columnRenames = { 'market': 'Area', 'commodity': 'Vegetable' };
const marketColumn = 'market';
const API_KEY = '579b464db66ec23bdd000001c0db9ee53b3649fb5406cd8dd552171e';

export default function CropPrice() {
  const [loadingMessageText, setLoadingMessageText] = useState("Fetching live crop data...");
  const [cropData, setCropData] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [districtOptions, setDistrictOptions] = useState([]);

  useEffect(() => {
    if (selectedState) {
      const newDistrictOptions = stateDistrictData[selectedState].map(district => ({
        value: district,
        text: district,
      }));
      setDistrictOptions(newDistrictOptions);
    } else {
      setDistrictOptions([]);
      setSelectedDistrict('');
    }
  }, [selectedState]);

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
  };

  const handleSearch = async () => {
    await fetchCropData();
  };

  const fetchData = async () => {
    if (!selectedState || !selectedDistrict) {
      setLoadingMessageText("Please select both State and District.");
      setCropData([]);
      return null;
    }

    const dataEndpoint = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${API_KEY}&format=json&filters[state.keyword]=${selectedState}&filters[district]=${selectedDistrict}`;
    return dataEndpoint;
  };

  const fetchCropData = async () => {
    const dataEndpoint = await fetchData();
    if (!dataEndpoint) return;

    setLoadingMessageText("Fetching crop data...");
    try {
      const response = await fetch(dataEndpoint);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      setLoadingMessageText('');
      setCropData(responseData.records);
    } catch (error) {
      setLoadingMessageText(`Error fetching crop data: ${error.message}`);
      console.error("Error fetching crop data:", error);
      setCropData([]);
    }
  };

  const renderCropDataAsTable = () => {
    if (loadingMessageText) {
      return <p style={{ textAlign: 'center', padding: '15px' }}>{loadingMessageText}</p>;
    }

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
          <tr key={item.id || Math.random()}>
            {Object.keys(item).map(originalKey => {
              if (!columnsToRemove.includes(originalKey)) {
                let cellValue = item[originalKey];
                if (originalKey === marketColumn && typeof cellValue === 'string') {
                  cellValue = cellValue.replace(selectedDistrict, '').trim();
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
    };
  
    return (
      <div>
        <Sidebar />
        <div id="crop-data-container">
          <div className='input-container'>
            <select id="state" name="state" onChange={handleStateChange} value={selectedState}>
              <option value="">Select State/Union Territory</option>
              {Object.keys(stateDistrictData).map(state => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
  
            <select id="district" name="district" onChange={handleDistrictChange} value={selectedDistrict}>
              <option value="">Select District</option>
              {districtOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
  
            <button className='search-button' onClick={handleSearch}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
              </svg>
            </button>
          </div>
          <div className="table-container">
            <table id="crop-table">
              {renderCropDataAsTable()}
            </table>
          </div>
        </div>
      </div>
    );
  }
