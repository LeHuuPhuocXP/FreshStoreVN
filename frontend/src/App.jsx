import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Header from './components/Header'
import Footer from './components/Footer'
import ProductCard from './components/ProductCard'
import PromoBanner from './components/PromoBanner'

function App() {
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8080/api/categories')
            .then(res => setCategories(res.data))
            .catch(err => console.error('Lỗi khi gọi API categories:', err))

        axios.get('http://localhost:8080/api/products')
            .then(res => setProducts(res.data))
            .catch(err => console.error('Lỗi khi gọi API products:', err))
    }, [])

    return (
        <div className="App">
            <Header />

            <div style={styles.wrapper}>
                <PromoBanner />

                {categories.length === 0 ? (
                    <p style={{ textAlign: 'center' }}>Chưa có danh mục nào.</p>
                ) : (
                    categories.map(category => {
                        const productsInCategory = products
                            .filter(p => p.category && p.category.id === category.id)
                            .slice(0, 5)

                        if (productsInCategory.length === 0) return null

                        return (
                            <div key={category.id} style={styles.categorySection}>
                                <div style={styles.categoryHeader}>
                                    <h3 style={styles.categoryTitle}>{category.name}</h3>
                                    <Link
                                        to={`/products?category=${category.id}`}
                                        style={styles.viewAllLink}
                                    >
                                        Xem tất cả →
                                    </Link>
                                </div>

                                <div style={styles.productGrid}>
                                    {productsInCategory.map(p => (
                                        <ProductCard key={p.id} product={p} />
                                    ))}
                                </div>
                            </div>
                        )
                    })
                )}
            </div>

            <Footer />
        </div>
    )
}

const styles = {
    wrapper: {
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '92px 32px 24px',
    },
    categorySection: {
        marginBottom: '40px',
    },
    categoryHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
    },
    categoryTitle: {
        margin: 0,
        fontSize: '20px',
    },
    viewAllLink: {
        color: '#2e7d32',
        textDecoration: 'none',
        fontSize: '14px',
        fontWeight: 'bold',
    },
    productGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '16px',
        width: '100%',
    },
}

export default App