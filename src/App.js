import "./App.css";
import Navbar from "./components/Navbar";
import Nic from "./components/Nic";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>

      <div className="App-body">
        <Nic />
      </div>
    </div>
  );
}

export default App;
