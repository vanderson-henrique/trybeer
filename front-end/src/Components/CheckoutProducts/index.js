import React, { useState, useEffect, useContext } from 'react';
import { Table, Button } from 'react-bootstrap';
import TrybeerContext from '../../context/TryBeerContext';
import './index.css';

const CheckoutProducts = () => {
  const [cart, setCart] = useState([]);
  const { totalPrice, setTotalPrice } = useContext(TrybeerContext);
  const zero = 0;

  useEffect(() => {
    const LSCart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalCartPriceLS = JSON.parse(localStorage.getItem('totalCartPrice'));
    const productsOnCart = LSCart.filter(({ quantity }) => quantity > zero);
    setTotalPrice(totalCartPriceLS);
    setCart(productsOnCart);
  }, [setTotalPrice]);

  const removeItem = (name, price, quantity) => {
    const LSCart = JSON.parse(localStorage.getItem('cart'));
    const newCart = cart.filter((product) => name !== product.name);
    LSCart.forEach((product) => {
      if (name === product.name) {
        product.quantity = zero;
      }
    });
    const newTotal = (Math.round((totalPrice - price * quantity) * 100) / 100).toFixed(2);
    setTotalPrice(newTotal);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(LSCart));
    localStorage.setItem('totalCartPrice', JSON.stringify(Number(newTotal)));
  };

  return (
    <div style={ { marginTop: '100px' } }>
      { cart.length === zero ? (
        <h3>Não há produtos no carrinho</h3>
      ) : (
        <div>
          <h3>Produtos</h3>
          <Table>
            <thead>
              <tr>
                <th>Quantidade</th>
                <th>Produto</th>
                <th>Preço unitário</th>
                <th>Preço total</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              { cart.map(({ name, quantity, price }, index) => (
                <tr key={ index }>
                  <td data-testid={ `${index}-product-qtd-input` }>{ quantity }</td>
                  <td data-testid={ `${index}-product-name` }>{ name }</td>
                  <td
                    data-testid={ `${index}-product-unit-price` }
                  >
                    { `(R$ ${price.replace('.', ',')} un)` }
                  </td>
                  <td data-testid={ `${index}-product-total-value` }>
                    { `R$ ${(Number(price) * quantity).toFixed(2).replace('.', ',')}` }
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      data-testid={ `${index}-removal-button` }
                      type="button"
                      onClick={ () => removeItem(name, price, quantity) }
                    >
                      x
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
      <p
        className="order-total-value"
        data-testid="order-total-value"
      >
        { `R$ ${Number(totalPrice).toFixed(2).replace('.', ',')}` }
      </p>
    </div>
  );
};

export default CheckoutProducts;
