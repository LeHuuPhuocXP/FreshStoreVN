import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function ProductCard({ product }) {
    const { addToCart } = useCart()

    const handleAddToCart = (e) => {
        e.preventDefault()   // ngăn Link điều hướng khi bấm nút
        e.stopPropagation()
        addToCart(product, 1)
    }

    return (
        <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={styles.card}>
                <div style={styles.imageWrapper}>
                    {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} style={styles.image} />
                    ) : (
                        <div style={styles.placeholder}>🥬</div>
                    )}
                </div>

                <div style={styles.info}>
                    <h4 style={styles.name}>{product.name}</h4>

                    {product.origin && (
                        <p style={styles.origin}>Xuất xứ: {product.origin}</p>
                    )}

                    <p style={styles.price}>
                        {Number(product.price).toLocaleString('vi-VN')} đ
                    </p>

                    {product.stockQuantity !== undefined && (
                        <p style={styles.stock}>
                            {product.stockQuantity > 0
                                ? `Còn ${product.stockQuantity} sản phẩm`
                                : 'Hết hàng'}
                        </p>
                    )}

                    <button
                        style={styles.addButton}
                        disabled={product.stockQuantity === 0}
                        onClick={handleAddToCart}
                    >
                        🛒 Thêm vào giỏ
                    </button>
                </div>
            </div>
        </Link>
    )
}
const styles = {
    card: {
        width: '100%',
        maxWidth: '220px',
        border: '1px solid #e0e0e0',
        borderRadius: '10px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
        backgroundColor: '#fff',
    },
    imageWrapper: {
        height: '150px',
        backgroundColor: '#f2f2f2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    placeholder: {
        fontSize: '48px',
    },
    info: {
        padding: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
    name: {
        margin: 0,
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#222',
    },
    origin: {
        margin: 0,
        fontSize: '13px',
        color: '#777',
    },
    price: {
        margin: '4px 0',
        fontSize: '17px',
        fontWeight: 'bold',
        color: '#2e7d32',
    },
    stock: {
        margin: 0,
        fontSize: '13px',
        color: '#555',
    },
    addButton: {
        marginTop: '8px',
        padding: '8px',
        backgroundColor: '#2e7d32',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '14px',
    },
}

export default ProductCard