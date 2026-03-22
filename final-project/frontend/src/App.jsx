import { useState, useEffect } from 'react';
import Header from './components/Header';
import SneakerCard from './components/SneakerCard';
import CartModal from './components/CartModal';
import AddProductModal from './components/AddProductModal';

const API_URL = 'http://localhost:3001/sneakers';

function App() {
    const [sneakers, setSneakers] = useState([]);
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingSneaker, setEditingSneaker] = useState(null);
    const [isDark, setIsDark] = useState(false);

    // Загрузка товаров
    const loadSneakers = () => {
        fetch(API_URL)
            .then(res => res.json())
            .then(setSneakers)
            .catch(err => console.error("Ошибка загрузки:", err));
    };

    useEffect(() => {
        loadSneakers();
    }, []);

    // Корзина
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCart(savedCart);
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (sneaker) => {
        setCart(prev => {
            const exists = prev.find(item => item.id === sneaker.id);
            if (exists) {
                return prev.map(item =>
                    item.id === sneaker.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...sneaker, quantity: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setCart([]);
    };

    const openEditModal = (sneaker) => {
        setEditingSneaker(sneaker);
        setIsAddModalOpen(true);
    };

    return (
        <>
            <Header
                cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
                onCartClick={() => setIsCartOpen(true)}
                onAddProduct={() => {
                    setEditingSneaker(null);
                    setIsAddModalOpen(true);
                }}
                isDark={isDark}
                toggleDark={() => setIsDark(!isDark)}
            />

            <div className="container">
                <h1 style={{ textAlign: 'center', margin: '40px 0 20px' }}>
                    🛍️ Магазин кроссовок
                </h1>

                <div className="sneaker-grid">
                    {sneakers.map(sneaker => (
                        <SneakerCard
                            key={sneaker.id}
                            sneaker={sneaker}
                            onAddToCart={addToCart}
                            onEdit={openEditModal}
                            onDelete={() => {
                                fetch(`http://localhost:3001/sneakers/${sneaker.id}`, { method: 'DELETE' })
                                    .then(loadSneakers);
                            }}
                        />
                    ))}
                </div>
            </div>

            {isCartOpen && (
                <CartModal
                    cart={cart}
                    onClose={() => setIsCartOpen(false)}
                    onRemove={removeFromCart}
                    onClear={clearCart}
                />
            )}

            <AddProductModal
                isOpen={isAddModalOpen}
                onClose={() => {
                    setIsAddModalOpen(false);
                    setEditingSneaker(null);
                }}
                onSuccess={loadSneakers}
                editingSneaker={editingSneaker}
            />
        </>
    );
}

export default App;