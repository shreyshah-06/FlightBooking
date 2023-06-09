import './App.css';
import { Box } from '@mui/material';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar';
import Homepage from './pages/homepage';
import Flights from './pages/flights';
import Login from './pages/login';
import Register from './pages/register';
import BookFlight from './components/flightCard';
function App() {
  return (
    <BrowserRouter>
    <Box>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/booking' element={<BookFlight/>}></Route>
      </Routes>
    </Box>
  </BrowserRouter>
  );
}

export default App;
