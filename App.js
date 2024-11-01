import React, { useState } from 'react'; 

function App() {
  const [city, setCity] = useState("São Paulo");
  const [weatherForecast, setWeatherForecast] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff"); 
  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=f9ebbc17da93416b8d1191547242710&q=${city}&lang=pt`
      );
      
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setWeatherForecast(data);
        changeBackground(data.current.temp_c); 
      } else {
        throw new Error('Erro ao buscar a previsão do tempo'); 
      }
    } catch (error) {
      console.error(error);
    }
  };

  const changeBackground = (temp) => {
    
    if (temp > 15) {
      setBackgroundColor("#ffcc00"); 
    } else {
      setBackgroundColor("#3399ff"); 
    }
  };

  return (
    <div style={{ backgroundColor: backgroundColor, minHeight: '100vh' }}>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <a className="navbar-brand text-white" href="#top">
          Previsão Anhanguera
        </a>
      </nav>

      <main className="container">
        <div className="jumbotron">
          <h1>Verifique agora a Previsão do tempo da sua cidade</h1>
          <p className="lead">
            Digite o nome da cidade no campo abaixo e em seguida clique em pesquisar
          </p>
          <input 
            type="text" 
            value={city} 
            onChange={handleChange} 
            className="form-control mb-2"
            placeholder="Digite o nome da cidade"
          />
          <button onClick={handleSearch} className="btn btn-primary">
            Pesquisar
          </button>

          {weatherForecast && (
            <div className="mt-4">
              <h3>Previsão para {weatherForecast.location.name}</h3>
              <p>Temperatura: {weatherForecast.current.temp_c}°C</p>
              <p>Condição: {weatherForecast.current.condition.text}</p>
              <img src={weatherForecast.current.condition.icon} alt="Condição do tempo" />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;

