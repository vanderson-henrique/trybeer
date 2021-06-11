import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import TryBeerContext from '../../context/TryBeerContext';
import { addSale } from '../../servicesAPI/api';
import './index.css';

const CheckoutForm = ({ finishSale }) => {
  const zero = 0;
  const [address, setAddress] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const { totalPrice, setTotalPrice } = useContext(TryBeerContext);

  const checkoutSubmit = async () => {
    const LSCart = JSON.parse(localStorage.getItem('cart'));
    const products = LSCart.filter(({ quantity }) => quantity > zero);

    const dataSale = {
      total_price: parseFloat(totalPrice),
      delivery_address: address,
      delivery_number: houseNumber,
      products,
    };
    const { data: { token } } = JSON.parse(localStorage.getItem('user'));

    await addSale(dataSale, token);
    localStorage.removeItem('cart');
    localStorage.removeItem('totalCartPrice');
    setTotalPrice(zero);
    finishSale();
  };

  return (
    <Container className="checkout-form-container">
      <Form>
        <Form.Group>
          <Form.Label>
            Rua:
          </Form.Label>
          <Form.Control
            data-testid="checkout-street-input"
            onChange={ (e) => setAddress(e.target.value) }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Número da casa:
          </Form.Label>
          <Form.Control
            data-testid="checkout-house-number-input"
            onChange={ (e) => setHouseNumber(e.target.value) }
          />
        </Form.Group>
        <Button
          data-testid="checkout-finish-btn"
          disabled={ !address || !houseNumber || !Number(totalPrice) }
          onClick={ checkoutSubmit }
        >
          Finalizar Pedido
        </Button>
      </Form>
    </Container>
  );
};

CheckoutForm.propTypes = {
  finishSale: PropTypes.func.isRequired,
};

export default CheckoutForm;
