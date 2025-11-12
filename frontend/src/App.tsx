import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './components/layout/Layout'
import BackendList from './pages/BackendList'

function App() {

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/backend' element={<BackendList />} />
      </Routes>
    </Layout>
  )
}

export default App
