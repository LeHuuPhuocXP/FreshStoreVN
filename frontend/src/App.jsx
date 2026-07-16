import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8080/api/products')
            .then(response => {
                setProducts(response.data)
            })
            .catch(error => {
                console.error('Lỗi khi gọi API:', error)
            })
    }, [])

    return (
        <div className="App">
            <h1>FreshStoreVN</h1>
            <h2>Danh sách sản phẩm</h2>
            {products.length === 0 ? (
                <p>Chưa có sản phẩm nào.</p>
            ) : (
                <ul>
                    {products.map(product => (
                        <li key={product.id}>
                            {product.name} - {product.price} đ
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default App