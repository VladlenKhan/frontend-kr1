import { useState, useEffect } from 'react';

export default function SneakerForm({ onSubmit, editingSneaker, setEditingSneaker }) {
    const [form, setForm] = useState({ name: '', price: '', description: '' });

    useEffect(() => {
        if (editingSneaker) {
            setForm(editingSneaker);
        }
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
            onSubmit();
            setForm({ name: '', price: '', description: '' });
            setEditingSneaker(null);
        });
    };

    return (
        <form onSubmit={handleSubmit} style={{marginBottom: '40px'}}>
            <h2>{editingSneaker ? 'Редактировать' : 'Добавить'} кроссовки</h2>
            <input placeholder="Название" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
            <input type="number" placeholder="Цена" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
            <input placeholder="Описание" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
            <button type="submit" className="btn btn-add">Сохранить</button>
            {editingSneaker && <button type="button" onClick={() => setEditingSneaker(null)}>Отмена</button>}
        </form>
    );
}