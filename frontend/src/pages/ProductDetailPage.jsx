import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import Header from "../components/header"
import Footer from "../components/footer"
import ProductCard from "../components/ProductCard"
import { useCart } from "../context/CartContext"

function ProductDetailPage() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [relatedProducts, setRelatedProducts] = useState([])
    const [quantity, setQuantity] = useState(1)
    const { addToCart } = useCart()

    useEffect(() => {
        axios.get(`http://localhost:8080/api/products/${id}`)
            .then(res => {
                setProduct(res.data)
                setQuantity(1)
            })
            .catch(err => console.error("Loi khi lay chi tiet san pham:", err))
    }, [id])

    useEffect(() => {
        if (!product) return
        axios.get("http://localhost:8080/api/products")
            .then(res => {
                const filtered = res.data.filter(p =>
                    p.id !== product.id &&
                    p.category && product.category &&
                    p.category.id === product.category.id
                )
                setRelatedProducts(filtered.slice(0, 5))
            })
            .catch(err => console.error("Loi khi lay san pham goi y:", err))
    }, [product])

    if (!product) {
        return (
            <div>
                <Header />
                <p style={{ textAlign: "center", padding: "40px" }}>Dang tai...</p>
                <Footer />
            </div>
        )
    }

    return (
        <div>
            <Header />

            <div style={styles.wrapper}>
                <main style={styles.container}>
                    <div style={styles.imageWrapper}>
                        {product.imageUrl ? (
                            <img src={product.imageUrl} alt={product.name} style={styles.image} />
                        ) : (
                            <div style={styles.placeholder}>🥬</div>
                        )}
                    </div>

                    <div style={styles.info}>
                        <h2 style={styles.name}>{product.name}</h2>

                        {product.category && (
                            <p style={styles.category}>Danh muc: {product.category.name}</p>
                        )}

                        {product.origin && (
                            <p style={styles.origin}>Xuat xu: {product.origin}</p>
                        )}

                        <p style={styles.price}>
                            {Number(product.price).toLocaleString("vi-VN")} d
                        </p>

                        <p style={styles.stock}>
                            {product.stockQuantity > 0
                                ? `Con ${product.stockQuantity} san pham`
                                : "Het hang"}
                        </p>

                        <div style={styles.divider} />

                        <div style={styles.quantityWrapper}>
                            <label>So luong: </label>
                            <button
                                style={styles.quantityButton}
                                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                            >
                                -
                            </button>
                            <span style={styles.quantityValue}>{quantity}</span>
                            <button
                                style={styles.quantityButton}
                                onClick={() => setQuantity(q => Math.min(product.stockQuantity, q + 1))}
                            >
                                +
                            </button>
                        </div>

                        <button
                            style={styles.addButton}
                            disabled={product.stockQuantity === 0}
                            onClick={() => addToCart(product, quantity)}
                        >
                            🛒 Thêm vào giỏ
                        </button>

                        <div style={styles.extraInfo}>
                            <p>🚚 Giao hang trong 2-4 gio tai noi thanh</p>
                            <p>✅ Cam ket rau cu tuoi, co nguon goc ro rang</p>
                            <p>↩️ Doi tra mien phi neu san pham khong dat yeu cau</p>
                        </div>
                    </div>
                </main>

                {relatedProducts.length > 0 && (
                    <section style={styles.relatedSection}>
                        <h3 style={styles.relatedTitle}>San pham goi y</h3>
                        <div style={styles.relatedGrid}>
                            {relatedProducts.map(p => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </section>
                )}
            </div>

            <Footer />
        </div>
    )
}

const styles = {
    wrapper: {
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "92px 32px 0",
    },
    container: {
        display: "flex",
        gap: "48px",
        padding: "40px 0",
        flexWrap: "wrap",
        alignItems: "flex-start",
    },
    imageWrapper: {
        flex: "0 0 480px",
        height: "480px",
        backgroundColor: "#f2f2f2",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
        objectFit: "contain",
    },
    placeholder: {
        fontSize: "80px",
    },
    info: {
        flex: "1 1 320px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        paddingTop: "8px",
    },
    name: {
        margin: 0,
        fontSize: "28px",
        fontWeight: "bold",
    },
    category: {
        margin: 0,
        color: "#555",
    },
    origin: {
        margin: 0,
        color: "#777",
    },
    price: {
        margin: "10px 0",
        fontSize: "30px",
        fontWeight: "bold",
        color: "#2e7d32",
    },
    stock: {
        margin: 0,
        color: "#555",
    },
    divider: {
        borderTop: "1px solid #e0e0e0",
        margin: "16px 0",
    },
    quantityWrapper: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "16px",
    },
    quantityButton: {
        width: "32px",
        height: "32px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        backgroundColor: "#fff",
        cursor: "pointer",
        fontSize: "18px",
    },
    quantityValue: {
        fontSize: "16px",
        minWidth: "24px",
        textAlign: "center",
    },
    addButton: {
        padding: "14px 24px",
        backgroundColor: "#2e7d32",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "16px",
        width: "100%",
        maxWidth: "320px",
    },
    extraInfo: {
        marginTop: "24px",
        padding: "16px",
        backgroundColor: "#f7f9f7",
        borderRadius: "8px",
        fontSize: "14px",
        color: "#555",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
    },
    relatedSection: {
        padding: "20px 0 48px",
        borderTop: "1px solid #e0e0e0",
    },
    relatedTitle: {
        fontSize: "20px",
        marginBottom: "20px",
    },
    relatedGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "16px",
    },
}

export default ProductDetailPage