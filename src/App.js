import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './style.css';
import Header from './components/Header/header.js';
import Main from './components/Main/main.js';
import Features from './components/Features/features.js';
import Footer from './components/Footer/footer.js';
import Details from './components/Details/deatils.js';
import Calendar from './components/Calendar/calendar.js';
import Home from './components/Home/Home.js';

import FetchData from './service/FetchData.js';

class App extends React.Component {

  fetchData = new FetchData()

  state = {
    rocket: 'Falcon 1',
    rocketFeatures: null,
    rockets: [],
    company: null,
  };

  componentDidMount() {
    this.updateRocket();
    this.updateCompany();
  }

  updateRocket() {
    this.fetchData.getRocket()
    .then((data) => { 
      this.setState({ rockets: data.map(item => item.name) });
      return data;
    })
    .then((data) => data.find((item) => item.name === this.state.rocket))
    .then((rocketFeatures) => { this.setState({rocketFeatures}) });
  }

  changeRocket = (rocket) => {
    this.setState({
      rocket
    }, this.updateRocket());
  }

  updateCompany = () => {
    this.fetchData.getCompany()
      .then(company => this.setState({company}));
  }

  render() {
    return (
      <BrowserRouter>
        <Header rockets={this.state.rockets} changeRocket={this.changeRocket}/>

        <Route exact path='/'>
          {(this.state.company) ? <Home company={this.state.company}/> : null}
        </Route>

        <Route path='/rocket'>
          <Main rocket={this.state.rocket} />
          {(this.state.rocketFeatures) ? <Features rocketFeatures={this.state.rocketFeatures}/> : null}
        </Route>

        <Route path='/calendar'>
          <Calendar />
        </Route>

        <Route path='/details'>
          <Details />
        </Route>

        {(this.state.company) ? <Footer links={this.state.company.links}/> : null}
      </BrowserRouter>
    );
  }

}

export default App;
