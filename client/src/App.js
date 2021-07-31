import './App.css';
import Nav from './components/Nav/Nav'
import { createStore } from "redux";
import reducers from './redux/Reducers';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router-dom';
import LogIn from './components/LogIn/LogIn'
import Footer from './components/Footer/Footer'
import Graph from './components/Graph/Graph'
import Home from './pages/Home'
import Vacations from './pages/Vacations'
import Register from './pages/Register'


const store = createStore(reducers);

function App() {
    return (
        //for the render
        <Provider store={store}>
            <BrowserRouter>
            <LogIn />
            <Nav></Nav>
            <div className="App">
                <Route path="/" exact component={Home} />
                <Route path="/vacations" component={Vacations} />
                <Route path="/register" component={Register} />
                <Route path="/graphs" component={Graph} />
            </div>
            </BrowserRouter>
            <Footer></Footer>
        </Provider>
        
    );
}

export default App;
