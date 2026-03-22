import { useState, useEffect } from 'react';
import SneakerList from './components/SneakerList';
import SneakerForm from './components/SneakerForm';

const API_URL = 'http://localhost:3001/sneakers';

function App() {
    const [sneakers, setSneakers] = useState([]);
    const [editingSneaker, setEditingSneaker] = useState(null);

    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(setSneakers);
    }, []);

    const refresh = () => fetch(API_URL).then(res => res.json()).then(setSneakers);

    return (
        <div className="container">
            <h1>🛍️ Магазин кроссовок</h1>
            
            <SneakerForm 
                onSubmit={refresh} 
                editingSneaker={editingSneaker} 
                setEditingSneaker={setEditingSneaker} 
            />
            
            <SneakerList 
                sneakers={sneakers} 
                onEdit={setEditingSneaker} 
                onDelete={refresh} 
            />
        </div>
    );
}

export default App;