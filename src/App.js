import React, { Component } from 'react';

import Routes from './routes';
import NavigationService from './services/navigation';

// import { Container } from './styles';

export default class App extends Component {
  registerService = ref => {
    NavigationService.setTopLevelNavigator(ref);
  };

  render() {
    return <Routes ref={this.registerService} />;
  }
}
