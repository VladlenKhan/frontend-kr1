export default function Header({ cartCount, onCartClick, onAddProduct, isDark, toggleDark }) {
    return (
        <header className="header">
            <div className="container header-content">
                <div className="logo">SNEAKER<span style={{color: '#e63939'}}>STORE</span></div>
                
                <nav>
                    <a href="#">Каталог</a>
                    <a href="#">О нас</a>
                </nav>

                <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                    <button 
                        onClick={onAddProduct}
                        className="btn"
                        style={{background: '#007bff', padding: '10px 18px', fontSize: '15px'}}
                    >
                        + Добавить товар
                    </button>

                    <button onClick={toggleDark} style={{background: 'none', border: 'none', color: 'white', fontSize: '22px'}}>
                        {isDark ? '☀️' : '🌙'}
                    </button>

                    <div className="cart-icon" onClick={onCartClick}>
                        🛒
                        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                    </div>
                </div>
            </div>
        </header>
    );
}