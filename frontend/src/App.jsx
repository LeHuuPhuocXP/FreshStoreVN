import { useEffect, useState } from 'react'
import axios from 'axios'
import Header from './components/Header'
import Footer from './components/Footer'
import ProductCard from './components/ProductCard'
import CategoryBar from './components/CategoryBar'

function App() {
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)

    useEffect(() => {
        axios.get('http://localhost:8080/api/categories')
            .then(res => setCategories(res.data))
            .catch(err => console.error('Lỗi khi gọi API categories:', err))

        axios.get('http://localhost:8080/api/products')
            .then(res => setProducts(res.data))
            .catch(err => console.error('Lỗi khi gọi API products:', err))
    }, [])

    const filteredProducts = selectedCategory === null
        ? products
        : products.filter(p => p.category && p.category.id === selectedCategory)

    return (
        <div className="App" style={{ width: '100%', margin: 0 }}>
            <Header />

            <CategoryBar
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
            />

            <main style={{ padding: '0 32px 24px' }}>
                <h2 style={{ textAlign: 'center' }}>
                    {selectedCategory === null
                        ? 'Tất cả sản phẩm'
                        : categories.find(c => c.id === selectedCategory)?.name}
                </h2>

                {filteredProducts.length === 0 ? (
                    <p style={{ textAlign: 'center' }}>Chưa có sản phẩm nào.</p>
                ) : (
                    <div style={styles.productGrid}>
                        {filteredProducts.map(p => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    )
}

const styles = {
    productGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '16px',
        width: '100%',
    },
}

export default App