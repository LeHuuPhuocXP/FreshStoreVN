import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import Header from '../components/Header'
import Footer from '../components/Footer'

function RegisterPage() {
    const navigate = useNavigate()
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        axios.post('http://localhost:8080/api/auth/register', { fullName, email, password })
            .then(() => {
                setSuccess('Đăng ký thành công! Đang chuyển đến trang đăng nhập...')
                setTimeout(() => navigate('/login'), 1500)
            })
            .catch(err => {
                setError(err.response?.data?.message || 'Đăng ký thất bại')
            })
    }

    return (
        <div>
            <Header />
            <div style={styles.wrapper}>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <h2>Đăng ký tài khoản</h2>

                    {error && <p style={styles.error}>{error}</p>}
                    {success && <p style={styles.success}>{success}</p>}

                    <input
                        type="text"
                        placeholder="Họ và tên"
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        style={styles.input}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        style={styles.input}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        style={styles.input}
                        required
                        minLength={6}
                    />

                    <button type="submit" style={styles.button}>Đăng ký</button>

                    <p style={styles.linkText}>
                        Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
                    </p>
                </form>
            </div>
            <Footer />
        </div>
    )
}

const styles = {
    wrapper: {
        maxWidth: '400px',
        margin: '0 auto',
        padding: '120px 32px 60px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    input: {
        padding: '10px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        fontSize: '14px',
    },
    button: {
        padding: '12px',
        backgroundColor: '#2e7d32',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '15px',
    },
    error: {
        color: '#d32f2f',
        fontSize: '14px',
    },
    success: {
        color: '#2e7d32',
        fontSize: '14px',
    },
    linkText: {
        textAlign: 'center',
        fontSize: '14px',
    },
}

export default RegisterPage
