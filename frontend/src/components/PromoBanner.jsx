function PromoBanner() {
    return (
        <div style={styles.banner}>
            <img
                src="https://th.bing.com/th/id/R.6a78f12db28ebba84fe83b7ce61d61f4?rik=%2blsBPY1PmG9yCg&riu=http%3a%2f%2fwebnongsan.web2t.vn%2fwp-content%2fuploads%2f2019%2f12%2fBanner-nong-san-emi.jpg&ehk=L1qVfPfPt8jTb3m7Jc46en491a9632%2feNCAYemvNeOA%3d&risl=&pid=ImgRaw&r=0"
                alt="Khuyen mai"
                style={styles.image}
                onError={(e) => { e.target.style.display = 'none' }}
            />
        </div>
    )
}

const styles = {
    banner: {
        width: '100%',
        maxHeight: '500px',
        overflow: 'hidden',
        borderRadius: '10px',
        marginBottom: '32px',
        backgroundColor: '#f2f2f2',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
    },
}

export default PromoBanner
