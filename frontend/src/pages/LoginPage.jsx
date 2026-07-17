import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useAuth } from '../context/AuthContext'

function LoginPage() {
    const navigate = useNavigate()
    const { login } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')

        axios.post('http://localhost:8080/api/auth/login', { email, password })
            .then(res => {
                login(res.data)
                navigate('/')
            })
            .catch(err => {
                setError(err.response?.data?.message || 'Đăng nhập thất bại')
            })
    }
    return (
        <div>
            <Header />
            <div style={styles.wrapper}>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <h2>Đăng nhập</h2>

                    {error && <p style={styles.error}>{error}</p>}

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
                    />

                    <button type="submit" style={styles.button}>Đăng nhập</button>

                    <p style={styles.linkText}>
                        Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
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
    linkText: {
        textAlign: 'center',
        fontSize: '14px',
    },
}

export default LoginPage