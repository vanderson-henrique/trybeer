import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import verifyUserLocalStorage from '../../util/changeLocalStorage';
import TryBeerContext from '../../context/TryBeerContext';
import TopBar from '../../Components/TopBar';
import { getProducts } from '../../servicesAPI/api';
import ProductCard from '../../Components/ProductCard';
import './index.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { totalPrice, setTotalPrice } = useContext(TryBeerContext);
  const history = useHistory();

  useEffect(() => {
    const { data } = verifyUserLocalStorage();
    if (!data) return history.push('/login');
  }, [history]);

  const getProductList = async () => {
    const { data } = await getProducts();
    if (!localStorage.getItem('cart')) {
      const cart = data.map((product) => ({ ...product, quantity: 0 }));
      setProducts(cart);
      localStorage.setItem('cart', JSON.stringify(cart));
      localStorage.setItem('totalCartPrice', JSON.stringify(0));
    } else {
      const totalPriceLS = JSON.parse(localStorage.getItem('totalCartPrice'));
      setTotalPrice(totalPriceLS);
      const productsLS = JSON.parse(localStorage.getItem('cart'));
      setProducts(productsLS);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getProductList();
  }, []);

  return (
    <div>
      <TopBar />
      <Container className="product-cards-container" style={ { marginTop: '100px' } }>
        { isLoading ? <div>Carregando</div> : products.map((product, index) => (
          <ProductCard product={ product } index={ index } key={ index } />
        ))}
      </Container>
      <Link to="/checkout" className="button-link">
        <Button
          className="cart-btn"
          variant="success"
          type="button"
          disabled={ totalPrice === 0 }
          data-testid="checkout-bottom-btn"
        >
          <span>Ver Carrinho</span>
          <span data-testid="checkout-bottom-btn-value">
            {totalPrice === 0 ? '  R$ 0,00'
              : `  R$ ${Number(totalPrice).toFixed(2).replace('.', ',')}`}
          </span>
        </Button>
      </Link>
    </div>
  );
};

export default Products;
