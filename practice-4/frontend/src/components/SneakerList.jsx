import SneakerItem from './SneakerItem';

export default function SneakerList({ sneakers, onEdit, onDelete }) {
    return (
        <div className="sneaker-grid">
            {sneakers.map(sneaker => (
                <SneakerItem 
                    key={sneaker.id} 
                    sneaker={sneaker} 
                    onEdit={onEdit} 
                    onDelete={onDelete} 
                />
            ))}
        </div>
    );
}