function Footer() {
    return (
        <footer style={styles.footer}>
            <div style={styles.section}>
                <h4>FreshStoreVN</h4>
                <p>Mang rau củ tươi sạch đến tận nhà bạn mỗi ngày.</p>
            </div>

            <div style={styles.section}>
                <h4>Liên kết</h4>
                <ul style={styles.list}>
                    <li><a href="/" style={styles.link}>Trang chủ</a></li>
                    <li><a href="/products" style={styles.link}>Sản phẩm</a></li>
                    <li><a href="/about" style={styles.link}>Giới thiệu</a></li>
                </ul>
            </div>

            <div style={styles.section}>
                <h4>Liên hệ</h4>
                <p>📍 TP. Hồ Chí Minh, Việt Nam</p>
                <p>📞 0123 456 789</p>
                <p>✉️ contact@freshstorevn.com</p>
            </div>

            <div style={styles.bottom}>
                © 2026 FreshStoreVN. All rights reserved.
            </div>
        </footer>
    )
}

const styles = {
    footer: {
        backgroundColor: '#1b1b1b',
        color: '#ccc',
        padding: '32px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: '24px',
        marginTop: '40px',
    },
    section: {
        minWidth: '200px',
    },
    list: {
        listStyle: 'none',
        padding: 0,
    },
    link: {
        color: '#ccc',
        textDecoration: 'none',
        lineHeight: '1.8',
    },
    bottom: {
        width: '100%',
        textAlign: 'center',
        borderTop: '1px solid #444',
        marginTop: '16px',
        paddingTop: '16px',
        fontSize: '14px',
    },
}

export default Footer