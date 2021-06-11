import React, { useState } from 'react';
import { useHistory } from 'react-router';
import TopBar from '../../Components/TopBar';
import CheckoutProducts from '../../Components/CheckoutProducts';
import CheckoutForm from '../../Components/CheckoutForm';
import BrindeChope from '../../images/BrindeChope.gif';
import './index.css';

const Checkout = () => {
  const history = useHistory();
  const [showMessage, setShowMessage] = useState(false);
  const twoSec = 5000;

  const finishSale = () => {
    setShowMessage(true);
    setTimeout(() => {
      history.push('/products');
    }, twoSec);
  };

  return (
    <div>
      <TopBar />
      { showMessage ? (
        <div className="container-checkout">
          <div style={ { marginTop: '100px' } }>
            <p>Compra realizada com sucesso!</p>
          </div>
          <img
            className="brindeChope"
            src={ BrindeChope }
            alt="Brinde!"
            style={ { borderRadius: '50%' } }
          />
        </div>
      ) : (
        <div>
          <CheckoutProducts />
          <CheckoutForm finishSale={ finishSale } />
        </div>
      )}
    </div>
  );
};

export default Checkout;
