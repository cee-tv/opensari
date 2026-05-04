import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { FiHome, FiShoppingCart, FiPlus, FiEdit, FiTrash, FiLock } from 'react-icons/fi'
import CustomerView from './CustomerView'
import AdminView from './AdminView'

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold flex items-center gap-2">
            <FiHome /> Sari Sari Store
          </Link>
          <div className="flex gap-4">
            <Link to="/" className="flex items-center gap-1">
              <FiShoppingCart /> Products
            </Link>
            <button 
              onClick={() => setIsAdmin(!isAdmin)}
              className="flex items-center gap-1"
            >
              <FiLock /> {isAdmin ? 'Customer View' : 'Admin Login'}
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-4">
        {isAdmin ? <AdminView /> : <CustomerView />}
      </main>
    </div>
  )
}
