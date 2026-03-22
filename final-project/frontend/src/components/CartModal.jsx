export default function CartModal({ cart, onClose, onRemove, onClear }) {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="cart-modal" onClick={onClose}>
            <div className="cart-content" onClick={e => e.stopPropagation()}>
                <h2>🛍️ Ваша корзина ({cart.length})</h2>
                
                {cart.length === 0 ? (
                    <p>Корзина пуста</p>
                ) : (
                    <>
                        {cart.map(item => (
                            <div key={item.id} className="cart-item">
                                <div>
                                    <strong>{item.name}</strong><br />
                                    {item.price} ₽ × {item.quantity}
                                </div>
                                <div>
                                    <strong>{(item.price * item.quantity).toLocaleString('ru-RU')} ₽</strong>
                                    <button onClick={() => onRemove(item.id)} style={{marginLeft: '15px', color: 'red'}}>×</button>
                                </div>
                            </div>
                        ))}
                        
                        <div className="total">Итого: {total.toLocaleString('ru-RU')} ₽</div>
                        
                        <button onClick={onClear} style={{background: '#dc3545', color: 'white', width: '100%', padding: '14px', borderRadius: '12px', marginTop: '20px'}}>
                            Очистить корзину
                        </button>
                        <button style={{background: '#e63939', color: 'white', width: '100%', padding: '14px', borderRadius: '12px', marginTop: '10px'}}>
                            Оформить заказ
                        </button>
                    </>
                )}
                
                <button onClick={onClose} style={{marginTop: '20px'}}>Закрыть</button>
            </div>
        </div>
    );
}