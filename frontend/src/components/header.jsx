import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

function Header() {
    const { user, logout } = useAuth()
    const { totalItems } = useCart()

    return (
        <header style={styles.header}>
            <Link to="/" style={styles.logo}>🥬 FreshStoreVN</Link>

            <nav style={styles.nav}>
                <Link to="/" style={styles.navLink}>Trang chủ</Link>
                <Link to="/products" style={styles.navLink}>Sản phẩm</Link>
                <Link to="/about" style={styles.navLink}>Giới thiệu</Link>
                <Link to="/contact" style={styles.navLink}>Liên hệ</Link>
            </nav>

            <div style={styles.actions}>
                <input type="text" placeholder="Tìm kiếm sản phẩm..." style={styles.searchInput} />
                <Link to="/cart" style={styles.cartButton}>
                    🛒 Giỏ hàng <span style={styles.cartBadge}>{totalItems}</span>
                </Link>

                {user ? (
                    <>
                        <span style={{ fontSize: '14px' }}>Xin chào, {user.fullName}</span>
                        <button onClick={logout} style={styles.loginButton}>Đăng xuất</button>
                    </>
                ) : (
                    <Link to="/login" style={styles.loginButton}>Đăng nhập</Link>
                )}
            </div>
        </header>
    )
}
const styles = {
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 32px',
        backgroundColor: '#2e7d32',
        color: '#fff',
        flexWrap: 'wrap',
        gap: '12px',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
    },
    logo: {
        fontSize: '22px',
        fontWeight: 'bold',
        color: '#fff',
        textDecoration: 'none',
    },
    nav: {
        display: 'flex',
        gap: '20px',
    },
    navLink: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '15px',
    },
    actions: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    searchInput: {
        padding: '6px 10px',
        borderRadius: '4px',
        border: 'none',
        outline: 'none',
    },
    cartButton: {
        position: 'relative',
        padding: '6px 12px',
        backgroundColor: '#fff',
        color: '#2e7d32',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        textDecoration: 'none',
        fontSize: '14px',
    },
    cartBadge: {
        position: 'absolute',
        top: '-6px',
        right: '-6px',
        backgroundColor: '#d32f2f',
        color: '#fff',
        borderRadius: '50%',
        width: '18px',
        height: '18px',
        fontSize: '11px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginButton: {
        padding: '6px 12px',
        backgroundColor: 'transparent',
        color: '#fff',
        border: '1px solid #fff',
        borderRadius: '4px',
        cursor: 'pointer',
        textDecoration: 'none',
        fontSize: '14px',
    },
}

export default Header