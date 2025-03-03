import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landingpage from "./pages/landingpage";
import Login from "./pages/login";
import Register from "./pages/register";
import Yourself from "./pages/yourself";
import Layout from "./components/Layout";
import Links from "./pages/links";
import Appearance from "./pages/appearance";
import Analytics from "./pages/analytics";
import Settings from "./pages/settings";
import { ProfileProvider } from "./context/ProfileContext"; // ✅ Import Profile Context

function App() {
  return (
    <ProfileProvider> {/* ✅ Wrap app in ProfileProvider */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/yourself" element={<Yourself />} />

          {/* Dashboard Layout with Nested Routes */}
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<Links />} /> {/* Default Page */}
            <Route path="appearance" element={<Appearance />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProfileProvider>
  );
}

export default App;

