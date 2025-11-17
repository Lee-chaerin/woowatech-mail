import './App.css'
import { Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home'
import Layout from './components/layout/Layout'
import BackendList from './pages/BackendList'


function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/backend' element={<BackendList />} />
      </Routes>
    </Layout>
    </QueryClientProvider>
  )
}

export default App
