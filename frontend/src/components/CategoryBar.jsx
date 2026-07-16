function CategoryBar({ categories, selectedCategory, onSelectCategory }) {
    return (
        <div style={styles.wrapper}>
            <button
                style={{
                    ...styles.item,
                    ...(selectedCategory === null ? styles.itemActive : {}),
                }}
                onClick={() => onSelectCategory(null)}
            >
                Tất cả
            </button>

            {categories.map(category => (
                <button
                    key={category.id}
                    style={{
                        ...styles.item,
                        ...(selectedCategory === category.id ? styles.itemActive : {}),
                    }}
                    onClick={() => onSelectCategory(category.id)}
                >
                    {category.name}
                </button>
            ))}
        </div>
    )
}

const styles = {
    wrapper: {
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: '16px 32px',
        borderBottom: '1px solid #e0e0e0',
        marginBottom: '24px',
    },
    item: {
        padding: '8px 18px',
        borderRadius: '20px',
        border: '1px solid #ccc',
        backgroundColor: '#fff',
        color: '#333',
        cursor: 'pointer',
        fontSize: '14px',
        transition: 'all 0.2s',
    },
    itemActive: {
        backgroundColor: '#2e7d32',
        color: '#fff',
        borderColor: '#2e7d32',
    },
}

export default CategoryBar