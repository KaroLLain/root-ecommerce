import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Footer from "./Components/Footer";
import Header from "./Components/Header";

import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

export default function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes> 
            <Route path='/' Component={HomeScreen} exact/>
            <Route path='/product/:id' Component={ProductScreen}/>
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

