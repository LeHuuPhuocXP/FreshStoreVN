import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'

function CartPage() {
    const { items, removeFromCart, updateQuantity, totalPrice } = useCart()

    return (
        <div>
            <Header />

            <div style={styles.wrapper}>
                <h2>Giỏ hàng của bạn</h2>

                {items.length === 0 ? (
                    <div style={styles.empty}>
                        <p>Giỏ hàng đang trống.</p>
                        <Link to="/products" style={styles.continueLink}>Tiếp tục mua sắm →</Link>
                    </div>
                ) : (
                    <>
                        <div style={styles.list}>
                            {items.map(item => (
                                <div key={item.id} style={styles.item}>
                                    <div style={styles.itemImageWrapper}>
                                        {item.imageUrl ? (
                                            <img src={item.imageUrl} alt={item.name} style={styles.itemImage} />
                                        ) : (
                                            <div style={styles.placeholder}>🥬</div>
                                        )}
                                    </div>

                                    <div style={styles.itemInfo}>
                                        <h4 style={{ margin: 0 }}>{item.name}</h4>
                                        <p style={{ margin: '4px 0', color: '#2e7d32', fontWeight: 'bold' }}>
                                            {Number(item.price).toLocaleString('vi-VN')} đ
                                        </p>
                                    </div>

                                    <div style={styles.quantityWrapper}>
                                        <button
                                            style={styles.quantityButton}
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        >
                                            -
                                        </button>
                                        <span style={{ minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                                        <button
                                            style={styles.quantityButton}
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <p style={styles.itemTotal}>
                                        {Number(item.price * item.quantity).toLocaleString('vi-VN')} đ
                                    </p>

                                    <button
                                        style={styles.removeButton}
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div style={styles.summary}>
                            <span style={styles.summaryLabel}>Tổng cộng:</span>
                            <span style={styles.summaryTotal}>
                {Number(totalPrice).toLocaleString('vi-VN')} đ
              </span>
                        </div>

                        <button style={styles.checkoutButton}>Tiến hành thanh toán</button>
                    </>
                )}
            </div>

            <Footer />
        </div>
    )
}

const styles = {
    wrapper: {
        maxWidth: '900px',
        margin: '0 auto',
        padding: '92px 32px 60px',
    },
    empty: {
        textAlign: 'center',
        padding: '60px 0',
    },
    continueLink: {
        color: '#2e7d32',
        textDecoration: 'none',
        fontWeight: 'bold',
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        marginTop: '20px',
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '12px',
        border: '1px solid #e0e0e0',
        borderRadius: '10px',
    },
    itemImageWrapper: {
        width: '70px',
        height: '70px',
        flexShrink: 0,
        backgroundColor: '#f2f2f2',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    itemImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    placeholder: {
        fontSize: '28px',
    },
    itemInfo: {
        flex: '1 1 auto',
    },
    quantityWrapper: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    quantityButton: {
        width: '28px',
        height: '28px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        backgroundColor: '#fff',
        cursor: 'pointer',
    },
    itemTotal: {
        minWidth: '100px',
        textAlign: 'right',
        fontWeight: 'bold',
    },
    removeButton: {
        background: 'none',
        border: 'none',
        color: '#d32f2f',
        fontSize: '18px',
        cursor: 'pointer',
    },
    summary: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '24px',
        paddingTop: '16px',
        borderTop: '1px solid #e0e0e0',
        fontSize: '18px',
    },
    summaryLabel: {
        fontWeight: 'bold',
    },
    summaryTotal: {
        fontWeight: 'bold',
        color: '#2e7d32',
        fontSize: '22px',
    },
    checkoutButton: {
        width: '100%',
        marginTop: '20px',
        padding: '14px',
        backgroundColor: '#2e7d32',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '16px',
    },
}

export default CartPage