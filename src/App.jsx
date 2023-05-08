import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Progress from './pages/Progress';
import MoreGoals from './pages/MoreGoals';
import MoreHabits from './pages/MoreHabits';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/progress' element={<Progress />} />
      <Route path='/yourgoals' element={<MoreGoals />} />
      <Route path='/yourhabits' element={<MoreHabits />} />
    </Routes>
  );
}

export default App;
