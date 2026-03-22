import { useState, useEffect } from 'react';

export default function AddProductModal({ isOpen, onClose, onSuccess, editingSneaker }) {
    const [form, setForm] = useState({ name: '', price: '', description: '', image: '' });

    useEffect(() => {
        if (editingSneaker) {
            setForm(editingSneaker);
        } else {
            setForm({ name: '', price: '', description: '', image: '' });
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
            onSuccess();
            onClose();
        });
    };

    if (!isOpen) return null;

    return (
        <div className="cart-modal" onClick={onClose}>
            <div className="cart-content" onClick={e => e.stopPropagation()} style={{maxWidth: '520px'}}>
                <h2>{editingSneaker ? 'Редактировать товар' : 'Добавить новый товар'}</h2>
                
                <form onSubmit={handleSubmit}>
                    <input placeholder="Название модели" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                    <input type="number" placeholder="Цена в рублях" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
                    <input placeholder="Описание" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
                    
                    {/* Новое поле для фото */}
                    <input 
                        placeholder="Ссылка на фото (не обязательно)" 
                        value={form.image} 
                        onChange={e => setForm({...form, image: e.target.value})} 
                    />
                    <small style={{color: '#666', display: 'block', marginBottom: '15px'}}>
                        Если не вставишь ссылку — будет рандомное фото кроссовок
                    </small>

                    <button type="submit" className="btn" style={{width: '100%'}}>
                        {editingSneaker ? 'Сохранить изменения' : 'Добавить товар'}
                    </button>
                </form>

                <button onClick={onClose} style={{marginTop: '10px', width: '100%'}}>Отмена</button>
            </div>
        </div>
    );
}