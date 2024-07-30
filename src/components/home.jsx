import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import Hero from './hero';
import Recipes from './recipes';

class Home extends Component {
    state = {  } 
    render() { 
        return <div>
            <Hero />
            <Recipes />
        </div>
    }
}
 
export default Home;