import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import CategoryBar from '../components/CategoryBar'

function ProductsPage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const categoryIdParam = searchParams.get('category')

    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(
        categoryIdParam ? Number(categoryIdParam) : null
    )

    useEffect(() => {
        axios.get('http://localhost:8080/api/categories')
            .then(res => setCategories(res.data))
            .catch(err => console.error(err))

        axios.get('http://localhost:8080/api/products')
            .then(res => setProducts(res.data))
            .catch(err => console.error(err))
    }, [])

    const handleSelectCategory = (id) => {
        setSelectedCategory(id)
        if (id === null) {
            setSearchParams({})
        } else {
            setSearchParams({ category: id })
        }
    }

    const filteredProducts = selectedCategory === null
        ? products
        : products.filter(p => p.category && p.category.id === selectedCategory)

    return (
        <div>
            <Header />

            <div style={styles.wrapper}>
                <CategoryBar
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={handleSelectCategory}
                />

                <h2 style={{ textAlign: 'center', margin: '16px 0 24px' }}>
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
    productGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '16px',
    },
}

export default ProductsPage