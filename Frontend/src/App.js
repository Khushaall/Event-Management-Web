import './App.css';
import EventList from './components/EventList';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import MyEvent from './components/MyEvent';
import ProfilePage from './components/ProfilePage';
import SingleService from './components/SingleService'

function App() {

  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/eventlist" element={<EventList />} />
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/myevents" element={<MyEvent />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/singleservice" element={<SingleService />} />
        
        
      </Routes>
    </Router>
  );
};

export default App;
