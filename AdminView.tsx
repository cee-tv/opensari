import { useState } from 'react'
import { FiPlus, FiEdit, FiTrash } from 'react-icons/fi'

type Product = {
  id: number
  name: string
  price: number
  category: string
}

export default function AdminView() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Coke 1.5L', price: 75, category: 'Beverages' },
    { id: 2, name: 'Pancit Canton', price: 15, category: 'Noodles' },
    { id: 3, name: 'Royal 1.5L', price: 70, category: 'Beverages' },
    { id: 4, name: 'Lucky Me Beef', price: 12, category: 'Noodles' },
    { id: 5, name: 'Cloud 9', price: 10, category: 'Snacks' },
    { id: 6, name: 'Piattos', price: 18, category: 'Snacks' },
  ])

  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({ 
    name: '', 
    price: 0, 
    category: '' 
  })

  const categories = [...new Set(products.map(p => p.category))]

  const handleAddProduct = () => {
    const newProduct = {
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
      ...formData
    }
    setProducts([...products, newProduct])
    setFormData({ name: '', price: 0, category: '' })
  }

  const handleUpdateProduct = () => {
    if (editingId === null) return
    setProducts(products.map(p => 
      p.id === editingId ? { ...p, ...formData } : p
    ))
    setEditingId(null)
    setFormData({ name: '', price: 0, category: '' })
  }

  const handleEdit = (product: Product) => {
    setEditingId(product.id)
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category
    })
  }

  const handleDelete = (id: number) => {
    setProducts(products.filter(p => p.id !== id))
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Products</h1>
      
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? 'Edit Product' : 'Add New Product'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-2 border rounded"
              placeholder="e.g. Coke 1.5L"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
              className="w-full p-2 border rounded"
              placeholder="e.g. 75.00"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full p-2 border rounded"
            >
              <option value="">Select category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
        
        <button
          onClick={editingId ? handleUpdateProduct : handleAddProduct}
          className="bg-blue-600 text-white py-2 px-4 rounded flex items-center gap-2"
        >
          <FiPlus /> {editingId ? 'Update Product' : 'Add Product'}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Product</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="border-t">
                <td className="py-3 px-4">{product.name}</td>
                <td className="py-3 px-4">{product.category}</td>
                <td className="py-3 px-4">₱{product.price.toFixed(2)}</td>
                <td className="py-3 px-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FiTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
