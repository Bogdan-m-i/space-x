import React from 'react';
import './style.css';
import Header from './components/Header/header.js';
import Main from './components/Main/main.js';
import Features from './components/Features/features.js';
import Footer from './components/Footer/footer.js';
import Details from './components/Details/deatils.js';
import Calendar from './components/Calendar/calendar.js';

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
      .then(company => this.setState({company}, ()=>console.log(this.state.company.links)));
  }

  render() {
    return (
      <>
        <Header rockets={this.state.rockets} changeRocket={this.changeRocket}/>
        <Main rocket={this.state.rocket} />
        {(this.state.rocketFeatures) ? <Features rocketFeatures={this.state.rocketFeatures}/> : null}
        <Calendar />
        {(this.state.company) ? <Footer links={this.state.company.links}/> : null}
        <Details />
      </>
    );
  }

}

export default App;
