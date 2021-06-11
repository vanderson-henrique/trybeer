import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TryBeerContext from './TryBeerContext';

function Provider({ children }) {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const updatePriceAndCart = (difference, index) => {
    const products = JSON.parse(localStorage.getItem('cart'));
    products[index].quantity += difference;
    let total = totalPrice + products[index].price * difference;
    total = Number((Math.round(total * 100) / 100).toFixed(2));

    localStorage.setItem('totalCartPrice', JSON.stringify(total));
    localStorage.setItem('cart', JSON.stringify(products));

    setTotalPrice(Number(total));
  };

  const context = {
    cart,
    setCart,
    totalPrice,
    setTotalPrice,
    updatePriceAndCart,
  };

  return (
    <TryBeerContext.Provider value={ context }>
      {children}
    </TryBeerContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Provider;
