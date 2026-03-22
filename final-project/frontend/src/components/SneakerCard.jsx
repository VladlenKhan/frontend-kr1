export default function SneakerCard({ sneaker, onAddToCart, onEdit, onDelete }) {
    // Если фото нет — показываем рандомное
    const imageUrl = sneaker.image && sneaker.image.trim() !== "" 
        ? sneaker.image 
        : `https://picsum.photos/id/${parseInt(sneaker.id) % 1000 + 100}/600/400`;

    return (
        <div className="sneaker-card">
            <img src={imageUrl} alt={sneaker.name} />
            <div className="card-body">
                <h3>{sneaker.name}</h3>
                <p>{sneaker.description}</p>
                <p className="price">{sneaker.price.toLocaleString('ru-RU')} ₽</p>
                
                <div style={{display: 'flex', gap: '10px', marginTop: '15px'}}>
                    <button className="btn btn-add" onClick={() => onAddToCart(sneaker)}>
                        В корзину
                    </button>
                    <button className="btn btn-edit" onClick={() => onEdit(sneaker)}>
                        ✏️
                    </button>
                    <button className="btn btn-delete" onClick={onDelete}>
                        🗑️
                    </button>
                </div>
            </div>
        </div>
    );
}