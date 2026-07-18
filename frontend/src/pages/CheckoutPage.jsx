import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

function CheckoutPage() {
    const navigate = useNavigate()
    const { items, totalPrice, clearCart } = useCart()
    const { user } = useAuth()

    const [customerName, setCustomerName] = useState(user?.fullName || '')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [note, setNote] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('COD')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')

        if (items.length === 0) {
            setError('Giỏ hàng đang trống')
            return
        }

        setLoading(true)

        const payload = {
            customerName,
            phone,
            address,
            note,
            paymentMethod,
            items: items.map(item => ({
                productId: item.id,
                quantity: item.quantity,
            })),
        }

        axios.post('http://localhost:8080/api/orders', payload)
            .then(res => {
                clearCart()
                navigate('/order-success', { state: { orderId: res.data.orderId, total: res.data.totalAmount } })
            })
            .catch(err => {
                setError(err.response?.data?.message || 'Đặt hàng thất bại, vui lòng thử lại')
            })
            .finally(() => setLoading(false))
    }

    if (items.length === 0) {
        return (
            <div>
                <Header />
                <div style={styles.wrapper}>
                    <p style={{ textAlign: 'center' }}>Giỏ hàng đang trống, không thể thanh toán.</p>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div>
            <Header />

            <div style={styles.wrapper}>
                <h2>Thanh toán đơn hàng</h2>

                <div style={styles.container}>
                    <form onSubmit={handleSubmit} style={styles.form}>
                        <h3 style={styles.sectionTitle}>Thông tin giao hàng</h3>

                        {error && <p style={styles.error}>{error}</p>}

                        <input
                            type="text"
                            placeholder="Họ và tên người nhận"
                            value={customerName}
                            onChange={e => setCustomerName(e.target.value)}
                            style={styles.input}
                            required
                        />
                        <input
                            type="tel"
                            placeholder="Số điện thoại"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            style={styles.input}
                            required
                        />
                        <textarea
                            placeholder="Địa chỉ giao hàng"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            style={{ ...styles.input, minHeight: '70px', resize: 'vertical' }}
                            required
                        />
                        <textarea
                            placeholder="Ghi chú (tùy chọn)"
                            value={note}
                            onChange={e => setNote(e.target.value)}
                            style={{ ...styles.input, minHeight: '50px', resize: 'vertical' }}
                        />

                        <h3 style={styles.sectionTitle}>Phương thức thanh toán</h3>

                        <label style={styles.radioLabel}>
                            <input
                                type="radio"
                                name="payment"
                                value="COD"
                                checked={paymentMethod === 'COD'}
                                onChange={e => setPaymentMethod(e.target.value)}
                            />
                            💵 Thanh toán khi nhận hàng (COD)
                        </label>

                        <label style={styles.radioLabel}>
                            <input
                                type="radio"
                                name="payment"
                                value="BANK_TRANSFER"
                                checked={paymentMethod === 'BANK_TRANSFER'}
                                onChange={e => setPaymentMethod(e.target.value)}
                            />
                            🏦 Chuyển khoản ngân hàng
                        </label>

                        <button type="submit" style={styles.submitButton} disabled={loading}>
                            {loading ? 'Đang xử lý...' : 'Xác nhận đặt hàng'}
                        </button>
                    </form>

                    <div style={styles.summary}>
                        <h3 style={styles.sectionTitle}>Đơn hàng của bạn</h3>
                        {items.map(item => (
                            <div key={item.id} style={styles.summaryItem}>
                                <span>{item.name} x{item.quantity}</span>
                                <span>{Number(item.price * item.quantity).toLocaleString('vi-VN')} đ</span>
                            </div>
                        ))}
                        <div style={styles.summaryTotal}>
                            <span>Tổng cộng</span>
                            <span>{Number(totalPrice).toLocaleString('vi-VN')} đ</span>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

const styles = {
    wrapper: {
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '92px 32px 60px',
    },
    container: {
        display: 'flex',
        gap: '32px',
        flexWrap: 'wrap',
        marginTop: '20px',
    },
    form: {
        flex: '1 1 400px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    sectionTitle: {
        fontSize: '16px',
        marginTop: '12px',
        marginBottom: '4px',
    },
    input: {
        padding: '10px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        fontSize: '14px',
        fontFamily: 'inherit',
    },
    radioLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px',
        padding: '10px',
        border: '1px solid #e0e0e0',
        borderRadius: '6px',
    },
    submitButton: {
        marginTop: '16px',
        padding: '14px',
        backgroundColor: '#2e7d32',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    error: {
        color: '#d32f2f',
        fontSize: '14px',
    },
    summary: {
        flex: '1 1 300px',
        padding: '20px',
        backgroundColor: '#f7f9f7',
        borderRadius: '10px',
        height: 'fit-content',
    },
    summaryItem: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '14px',
        marginBottom: '8px',
    },
    summaryTotal: {
        display: 'flex',
        justifyContent: 'space-between',
        fontWeight: 'bold',
        fontSize: '18px',
        marginTop: '12px',
        paddingTop: '12px',
        borderTop: '1px solid #ddd',
        color: '#2e7d32',
    },
}

export default CheckoutPage