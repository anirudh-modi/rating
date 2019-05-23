import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter,Route} from 'react-router-dom';
import Products from './pages/products';
import Product from './pages/product';

class App extends React.Component{
    render(){
        return (
        <BrowserRouter>
            <Route exact path='/' component={Products}/>
            <Route path='/products/:id' component={Product}/>
        </BrowserRouter>
        );
    }
}

const element = document.getElementById('app');

render(<App/>, element);