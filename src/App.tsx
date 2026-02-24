import './App.css'
import { useConnectivity } from './hooks/useConnectivity';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./components/features/emergencies/DashboardHome";
import EmergencyPage from "./pages/EmergencyPage";
import MapPage from "./pages/MapPage";
import EmergenciesListPage from './pages/EmergenciesListPage';


function App() {
  useConnectivity();
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/emergencies" element={<EmergencyPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="*" element={<div className="p-6">Página no encontrada</div>} />
          <Route path="/emergencies/list" element={<EmergenciesListPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
