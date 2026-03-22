import SneakerCard from './SneakerCard';

export default function SneakerList({ sneakers, onEdit, onDelete }) {
    return (
        <div className="sneaker-grid">
            {sneakers.map(sneaker => (
                <SneakerCard 
                    key={sneaker.id} 
                    sneaker={sneaker} 
                    onEdit={onEdit} 
                    onDelete={onDelete} 
                />
            ))}
        </div>
    );
}