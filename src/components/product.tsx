import {
  Product as ProductType,
  formatCurrencyString,
  useShoppingCart,
} from 'use-shopping-cart';

type ProductProps = {
  product: ProductType;
};

const Product = ({ product }: ProductProps): JSX.Element => {
  const { addItem, redirectToCheckout } = useShoppingCart();
  const { name, price, image, currency } = product;

  async function handleCheckout() {
    const response = await fetch('/.netlify/functions/create-session', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ [product.sku]: { ...product, quantity: 1 } }),
    })
      .then((res) => {
        return res.json();
      })
      .catch((error) => console.log(error));

    redirectToCheckout({ sessionId: response.sessionId });
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <img alt='product' src={image} style={{ width: '200px' }} />
      <div>
        <p>{name}</p>
        <p>{formatCurrencyString({ value: price, currency })}</p>
      </div>
      <button onClick={() => addItem(product)}>Add To Cart</button>
      <button onClick={handleCheckout}>Buy Now</button>
    </div>
  );
};

export default Product;
