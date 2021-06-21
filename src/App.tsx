import React from 'react';
import './App.css';
import { Product } from 'use-shopping-cart';
import Item from './components/product';
import CartDisplay from './components/cart-display';

const products: Product[] = [
  {
    id: 'uid1',
    name: 'Sunglasses',
    price: 100,
    image: 'https://files.stripe.com/links/fl_test_FR8EZTS7UDXE0uljMfT7hwmH',
    currency: 'USD',
  },
  {
    id: 'uid2',
    name: 'Pants',
    price: 200,
    image: 'https://files.stripe.com/links/fl_test_FR8EZTS7UDXE0uljMfT7hwmH',
    currency: 'USD',
  },
];

function App() {
  return (
    <div className='App'>
      <h1>use-shopping-cart TypeScript</h1>
      <section
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <section>
          {products.map((product: Product) => {
            return <Item key={product.name} product={product} />;
          })}
        </section>
        <section>
          <CartDisplay />
        </section>
      </section>
    </div>
  );
}

export default App;
