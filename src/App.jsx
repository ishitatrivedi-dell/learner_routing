import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Bank from "./components/jsx/Bank.jsx";
import Cocktail from "./components/jsx/Cocktail.jsx";
import Mealdb from "./components/jsx/Mealdb.jsx";
import Potter from "./components/jsx/Potter.jsx";
import About from "./components/jsx/About.jsx";
function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/bank" element={<Bank />} />
        <Route path="/cocktail" element={<Cocktail />} />
        <Route path="/mealdb" element={<Mealdb />} />
        <Route path="/potter" element={<Potter />} />
        
      </Routes>
    </Router>
  );
}

export default App;
