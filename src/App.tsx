import './App.css'
import { useConnectivity } from './hooks/useConnectivity';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./components/features/emergencies/DashboardHome";
import EmergencyPage from "./pages/EmergencyPage";
import MapPage from "./pages/MapPage";


function App() {
  useConnectivity();
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/emergencies" element={<EmergencyPage />} />
          <Route path="/map" element={<MapPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
