import { Button } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import AddBookPage from './pages/AddBookPage.jsx'
import Navbar from './components/Navbar.jsx'
import AccountPage from './pages/AccountPage.jsx'

function App() {
  return (
    <Box minH={"100vh"}>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/addBook" element={<AddBookPage />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </Box>
  )
}

export default App
