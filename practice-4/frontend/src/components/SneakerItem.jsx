export default function SneakerItem({ sneaker, onEdit, onDelete }) {
    const handleDelete = () => {
        if (window.confirm('Удалить товар?')) {
            fetch(`http://localhost:3001/sneakers/${sneaker.id}`, { method: 'DELETE' })
                .then(onDelete);
        }
    };

    return (
        <div className="sneaker-card">
            <img src={`https://picsum.photos/id/${sneaker.id}/400/300`} alt={sneaker.name} />
            <div className="card-body">
                <h3>{sneaker.name}</h3>
                <p>{sneaker.description}</p>
                <p><strong>{sneaker.price} ₽</strong></p>
                <button className="btn btn-edit" onClick={() => onEdit(sneaker)}>Редактировать</button>
                <button className="btn btn-delete" onClick={handleDelete} style={{marginLeft: '10px'}}>Удалить</button>
            </div>
        </div>
    );
}