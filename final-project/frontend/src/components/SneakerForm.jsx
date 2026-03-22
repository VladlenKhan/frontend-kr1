import { useState, useEffect } from 'react';

export default function SneakerForm({ onSuccess, editingSneaker, setEditingSneaker }) {
    const [form, setForm] = useState({ name: '', price: '', description: '' });

    useEffect(() => {
        if (editingSneaker) setForm(editingSneaker);
    }, [editingSneaker]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const method = editingSneaker ? 'PATCH' : 'POST';
        const url = editingSneaker 
            ? `http://localhost:3001/sneakers/${editingSneaker.id}` 
            : 'http://localhost:3001/sneakers';

        fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        }).then(() => {
            onSuccess();
            setForm({ name: '', price: '', description: '' });
            setEditingSneaker(null);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{editingSneaker ? 'Редактировать товар' : 'Добавить новые кроссовки'}</h2>
            <input 
                placeholder="Название модели" 
                value={form.name} 
                onChange={e => setForm({...form, name: e.target.value})} 
                required 
            />
            <input 
                type="number" 
                placeholder="Цена (руб)" 
                value={form.price} 
                onChange={e => setForm({...form, price: e.target.value})} 
                required 
            />
            <input 
                placeholder="Описание" 
                value={form.description} 
                onChange={e => setForm({...form, description: e.target.value})} 
            />
            <button type="submit" className="btn">
                {editingSneaker ? 'Сохранить изменения' : 'Добавить товар'}
            </button>
            {editingSneaker && (
                <button type="button" onClick={() => setEditingSneaker(null)} style={{marginLeft: '10px'}}>
                    Отмена
                </button>
            )}
        </form>
    );
}