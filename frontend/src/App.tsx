import './App.css'
import { Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home'
import Layout from './components/layout/Layout'
import Backend from './pages/Backend'
import Frontend from './pages/Frontend';
import Android from './pages/Android';
import Cs from './pages/Cs';
import Post from './pages/Post';


function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/backend' element={<Backend />} />
        <Route path='/frontend' element={<Frontend />} />
        <Route path='/android' element={<Android />} />
        <Route path='/cs' element={<Cs />} />
        <Route path='/:category/:id' element={<Post />}/>
      </Routes>
    </Layout>
    </QueryClientProvider>
  )
}

export default App
