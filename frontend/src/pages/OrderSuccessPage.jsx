import { Link, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

function OrderSuccessPage() {
    const location = useLocation()
    const { orderId, total } = location.state || {}

    return (
        <div>
            <Header />

            <div style={styles.wrapper}>
                <h2>Đặt hàng thành công!</h2>

                {orderId && (
                    <>
                        <p>Mã đơn hàng: <strong>#{orderId}</strong></p>
                        <p>Tổng tiền: <strong>{Number(total).toLocaleString('vi-VN')} đ</strong></p>
                    </>
                )}

                <p style={{ color: '#555' }}>
                    Chúng tôi sẽ liên hệ với bạn sớm để xác nhận đơn hàng.
                </p>

                <Link to="/products" style={styles.link}>Tiếp tục mua sắm</Link>
            </div>

            <Footer />
        </div>
    )
}

const styles = {
    wrapper: {
        maxWidth: '500px',
        margin: '0 auto',
        padding: '140px 32px 80px',
        textAlign: 'center',
    },
    icon: {
        fontSize: '64px',
        marginBottom: '16px',
    },
    link: {
        display: 'inline-block',
        marginTop: '24px',
        padding: '12px 24px',
        backgroundColor: '#2e7d32',
        color: '#fff',
        textDecoration: 'none',
        borderRadius: '8px',
    },
}

export default OrderSuccessPage