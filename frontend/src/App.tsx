import './App.css'
import { Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home'
import Layout from './components/layout/Layout'
import BackendList from './pages/BackendList'
import FrontendList from './pages/FrontendList';
import AndroidList from './pages/AndroidList';
import CsList from './pages/CsList';
import Post from './pages/Post';


function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/backend' element={<BackendList />} />
        <Route path='/frontend' element={<FrontendList />} />
        <Route path='/android' element={<AndroidList />} />
        <Route path='/cs' element={<CsList />} />
        <Route path='/post/:id' element={<Post />}/>
      </Routes>
    </Layout>
    </QueryClientProvider>
  )
}

export default App
