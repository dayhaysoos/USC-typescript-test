import { FormEvent } from 'react';
import { useShoppingCart } from 'use-shopping-cart';

const CartDisplay = () => {
  const {
    cartDetails,
    cartCount,
    formattedTotalPrice,
    redirectToCheckout,
    clearCart,
    setItemQuantity,
  } = useShoppingCart();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const response = await fetch('/.netlify/functions/create-session', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartDetails),
    })
      .then((res) => res.json())
      .catch((error) => console.log(error));

    redirectToCheckout({ sessionId: response.sessionId });
  };

  if (cartCount === 0) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h2>Shopping Cart Display Panel</h2>
        <h3>No items in cart</h3>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <h2>Shopping Cart Display Panel</h2>
        {Object.keys(cartDetails).map((sku) => {
          const { name, quantity, image } = cartDetails[sku];
          return (
            <div
              key={name}
              style={{
                justifyContent: 'space-around',
                alignItems: 'center',
                width: '100%',
              }}>
              <div style={{ flexDirection: 'column', alignItems: 'center' }}>
                <img alt='product' style={{ width: 100 }} src={image} />
                <p>{name}</p>
              </div>
              <input
                type={'number'}
                max={99}
                style={{ width: 60 }}
                value={quantity}
                onChange={(event) => {
                  setItemQuantity(sku, event.target.valueAsNumber);
                }}
              />
            </div>
          );
        })}
        <h3>Total Items in Cart: {cartCount}</h3>
        <h3>Total Price: {formattedTotalPrice}</h3>
        <form method='POST'>
          <button onClick={handleSubmit}>Checkout</button>
        </form>
        <button onClick={() => clearCart()}>Clear Cart Items</button>
      </div>
    );
  }
};

export default CartDisplay;
