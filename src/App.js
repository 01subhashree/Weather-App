import "./App.css";
import Forecast from "./components/forcast/Forecast";
import CurrentLocation from "./components/CurrentLocation/CurrentLocation";

function App() {
  return (
    <div className="App">
      <CurrentLocation />
      <Forecast />
    </div>
  );
}

export default App;
