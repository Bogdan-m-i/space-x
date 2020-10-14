import React from 'react';
import './style.css';
import Header from './components/Header/header.js';
import Main from './components/Main/main.js';
import Features from './components/Features/features.js';
import Footer from './components/Footer/footer.js';
import Details from './components/Details/deatils.js';
import Calendar from './components/Calendar/calendar.js';

function App() {
  return (
  <>
  <Header />
  <Main />
  <Features />
  <Calendar />
  <Footer />
  <Details />
  </>
  );
}

export default App;
