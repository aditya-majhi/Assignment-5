import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StrategyCreationPage from "./pages/StrategyCreation";
import StrategyDashboardPage from "./pages/Dashboard";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 w-[100%]">
        <Header />
        <Routes>
          <Route path="/" element={<StrategyDashboardPage />} />
          <Route path="/create" element={<StrategyCreationPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
