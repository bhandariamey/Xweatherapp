import { useState } from 'react';

function App() {
  const [city, setCity] = useState('');
  const [searching, setSearching] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = "328ce548aa354837b6593800232611";

  const handleSubmit = async () => {
    setSearching(true);
    setError(null);

    try {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
      if (response.ok) {
        const resData = await response.json();
        setData(resData);
      } else {
        setError("Failed to fetch weather data");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to fetch weather data");
    } finally {
      setSearching(false);
    }
  };

  return (
    <>
      <div className="App">
        <input type="text" placeholder='Enter city name' onChange={(e) => { setCity(e.target.value) }} value={city} />
        <button onClick={handleSubmit}>Search</button>

        {searching && <p>Loading data...</p>}
        {error && <p>{error}</p>}

        {data &&
          <div className='weather-cards' style={{ display: 'flex', flex: '1' }}>
            <div className='weather-card' style={{ border: '1px solid', margin: '10px', textAlign: 'center' }}>
              <h3>Temperature</h3>
              <p>{data.current.feelslike_c}C</p>
            </div>
            <div className='weather-card' style={{ border: '1px solid', margin: '10px', textAlign: 'center' }}>
              <h3>Humidity</h3>
              <p>{data.current.humidity}%</p>
            </div>
            <div className='weather-card' style={{ border: '1px solid', margin: '10px', textAlign: 'center' }}>
              <h3>Condition</h3>
              <p>{data.current.condition.text}</p>
            </div>
            <div className='weather-card' style={{ border: '1px solid', margin: '10px', textAlign: 'center' }}>
              <h3>Wind Speed</h3>
              <p>{data.current.wind_kph}kph</p>
            </div>
          </div>
        }
      </div>
    </>
  );
}

export default App;
