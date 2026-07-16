function Header() {
    return (
        <header style={styles.header}>
            <div style={styles.logo}>
                🥬 FreshStoreVN
            </div>

            <nav style={styles.nav}>
                <a href="/" style={styles.navLink}>Trang chủ</a>
                <a href="/products" style={styles.navLink}>Sản phẩm</a>
                <a href="/about" style={styles.navLink}>Giới thiệu</a>
                <a href="/contact" style={styles.navLink}>Liên hệ</a>
            </nav>

            <div style={styles.actions}>
                <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    style={styles.searchInput}
                />
                <button style={styles.cartButton}>🛒 Giỏ hàng</button>
                <button style={styles.loginButton}>Đăng nhập</button>
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
    },
    logo: {
        fontSize: '22px',
        fontWeight: 'bold',
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
        padding: '6px 12px',
        backgroundColor: '#fff',
        color: '#2e7d32',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    loginButton: {
        padding: '6px 12px',
        backgroundColor: 'transparent',
        color: '#fff',
        border: '1px solid #fff',
        borderRadius: '4px',
        cursor: 'pointer',
    },
}

export default Header