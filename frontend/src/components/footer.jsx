import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer style={styles.footer}>
            <div style={styles.top}>
                <div style={styles.section}>
                    <h4 style={styles.heading}>🥬 FreshStoreVN</h4>
                    <p style={styles.text}>
                        Mang rau củ tươi sạch, nguồn gốc rõ ràng đến tận nhà bạn mỗi ngày.
                    </p>
                    <div style={styles.socials}>
                        <a href="#" style={styles.socialIcon}>📘</a>
                        <a href="#" style={styles.socialIcon}>📸</a>
                        <a href="#" style={styles.socialIcon}>🐦</a>
                    </div>
                </div>

                <div style={styles.section}>
                    <h4 style={styles.heading}>Về chúng tôi</h4>
                    <ul style={styles.list}>
                        <li><Link to="/about" style={styles.link}>Giới thiệu</Link></li>
                        <li><Link to="/contact" style={styles.link}>Liên hệ</Link></li>
                        <li><Link to="/careers" style={styles.link}>Tuyển dụng</Link></li>
                        <li><Link to="/blog" style={styles.link}>Tin tức</Link></li>
                    </ul>
                </div>

                <div style={styles.section}>
                    <h4 style={styles.heading}>Hỗ trợ khách hàng</h4>
                    <ul style={styles.list}>
                        <li><Link to="/shipping-policy" style={styles.link}>Chính sách giao hàng</Link></li>
                        <li><Link to="/return-policy" style={styles.link}>Chính sách đổi trả</Link></li>
                        <li><Link to="/faq" style={styles.link}>Câu hỏi thường gặp</Link></li>
                        <li><Link to="/terms" style={styles.link}>Điều khoản sử dụng</Link></li>
                    </ul>
                </div>

                <div style={styles.section}>
                    <h4 style={styles.heading}>Liên hệ</h4>
                    <p style={styles.contactItem}>📍 TP. Hồ Chí Minh, Việt Nam</p>
                    <p style={styles.contactItem}>📞 0123 456 789</p>
                    <p style={styles.contactItem}>✉️ contact@freshstorevn.com</p>
                    <p style={styles.contactItem}>🕒 8:00 - 21:00 (Thứ 2 - Chủ nhật)</p>
                </div>
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
        marginTop: '48px',
    },
    top: {
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '40px 32px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: '32px',
    },
    section: {
        minWidth: '200px',
        flex: '1 1 200px',
    },
    heading: {
        color: '#fff',
        marginBottom: '12px',
        fontSize: '16px',
    },
    text: {
        fontSize: '14px',
        lineHeight: '1.6',
    },
    socials: {
        display: 'flex',
        gap: '10px',
        marginTop: '12px',
        fontSize: '18px',
    },
    socialIcon: {
        textDecoration: 'none',
    },
    list: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    link: {
        color: '#ccc',
        textDecoration: 'none',
        fontSize: '14px',
    },
    contactItem: {
        fontSize: '14px',
        margin: '0 0 8px',
    },
    bottom: {
        textAlign: 'center',
        borderTop: '1px solid #444',
        padding: '16px',
        fontSize: '13px',
    },
}

export default Footer