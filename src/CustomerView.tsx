import { useState } from 'react'
import { FiShoppingCart } from 'react-icons/fi'

type Product = {
  id: number
  name: string
  price: number
  category: string
}

const sampleProducts: Product[] = [
  { id: 1, name: 'Coke 1.5L', price: 75, category: 'Beverages' },
  { id: 2, name: 'Pancit Canton', price: 15, category: 'Noodles' },
  { id: 3, name: 'Royal 1.5L', price: 70, category: 'Beverages' },
  { id: 4, name: 'Lucky Me Beef', price: 12, category: 'Noodles' },
  { id: 5, name: 'Cloud 9', price: 10, category: 'Snacks' },
  { id: 6, name: 'Piattos', price: 18, category: 'Snacks' },
]

export default function CustomerView() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const categories = ['All', ...new Set(sampleProducts.map(p => p.category))]

  const filteredProducts = selectedCategory === 'All' 
    ? sampleProducts 
    : sampleProducts.filter(p => p.category === selectedCategory)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Price List</h1>
      
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              selectedCategory === category 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="text-gray-600">{product.category}</p>
              </div>
              <span className="font-bold text-blue-600">₱{product.price.toFixed(2)}</span>
            </div>
            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded flex items-center justify-center gap-2">
              <FiShoppingCart /> Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
