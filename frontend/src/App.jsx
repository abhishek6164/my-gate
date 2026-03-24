import React from 'react'
import EntryForm from './components/form/EntryForm'
import Signup from './pages/auth/Signup'
import Login from './pages/auth/Login'
import AdminDashboard from './pages/admin/AdminDashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/entry" element={<EntryForm />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
