
import './App.css';
import {useState} from 'react'
import { Container,Col,Row } from 'react-bootstrap';
import CustomTable from './components/Details';
import Dashboard from './components/Dashboard';
import {ContextConfig} from './ContextConfig'
import {Routes,Route} from 'react-router'

function App() {
  const [job,setjob] = useState()
  return (
  <Container className='appcontainer' fluid>
    <ContextConfig.Provider value={{job,setjob}}>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/details' element={<CustomTable/>}/>
      </Routes>
    </ContextConfig.Provider>
  </Container>
  );
}

export default App;
