import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { AuthProvider } from "./context/AuthContext";
import NavBar from "./components/NavBar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RoomsPage from "./pages/RoomsPage";
import { RoomProvider } from "./context/RoomContext";
import ProtectedRoute from "./ProtectedRoute";
import RoomFormPage from "./pages/RoomFormPage";
import RoomPage from "./pages/RoomPage";
import QueryProvider from "./components/QueryProvider";
import CalendarPage from "./pages/CalendarPage";

const App = () => {
  return (
    <QueryProvider>
      <AuthProvider>
        <RoomProvider>
          <BrowserRouter>
            <main>
              <NavBar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/rooms" element={<RoomsPage />} />
                <Route path="/reservs" element={<CalendarPage/>} />
                <Route path="/rooms/room/:id" element={<RoomPage />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/rooms/add-room" element={<RoomFormPage />} />
                  <Route path="/rooms/:id" element={<RoomFormPage />} />
                </Route>
              </Routes>
            </main>
          </BrowserRouter>
        </RoomProvider>
      </AuthProvider>
    </QueryProvider>
  );
};

export default App;
