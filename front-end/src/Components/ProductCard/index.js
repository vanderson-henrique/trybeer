import React, { useState, useContext } from 'react';
import propTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import TryBeerContext from '../../context/TryBeerContext';
import './index.css';

const ProductCard = ({ product, index }) => {
  const one = 1;
  const { name, price } = product;
  const [quantity, setQuantity] = useState(product.quantity);
  const { updatePriceAndCart } = useContext(TryBeerContext);

  const handlePlus = () => {
    setQuantity(quantity + one);
    updatePriceAndCart(one, index);
  };

  const handleMinus = () => {
    setQuantity(quantity - one);
    updatePriceAndCart(-one, index);
  };

  return (
    <Card className="product-card">

      <Card.Img
        className={ `beverage-img img-${index} ` }
        src={ product.url_image }
        alt={ name }
        data-testid={ `${index}-product-img` }
      />
      <Card.Body>
        <Card.Title data-testid={ `${index}-product-name` }>{ name }</Card.Title>
        <Card.Text
          className="price"
          data-testid={ `${index}-product-price` }
        >
          { `R$ ${price.replace('.', ',')}` }
        </Card.Text>
      </Card.Body>
      <div className="plus-and-minus-container">
        <Button
          className="plus-and-minus-button"
          variant="secondary"
          onClick={ () => quantity > 0 && handleMinus() }
          data-testid={ `${index}-product-minus` }
        >
          -
        </Button>

        <p data-testid={ `${index}-product-qtd` }>{ quantity }</p>

        <Button
          className="plus-and-minus-button"
          variant="secondary"
          onClick={ () => handlePlus() }
          data-testid={ `${index}-product-plus` }
        >
          +
        </Button>
      </div>

    </Card>
  );
};

ProductCard.propTypes = {
  product: propTypes.shape({
    id: propTypes.number,
    name: propTypes.string,
    price: propTypes.string,
    url_image: propTypes.string,
    quantity: propTypes.number,
  }).isRequired,
  index: propTypes.number.isRequired,
};

export default ProductCard;
