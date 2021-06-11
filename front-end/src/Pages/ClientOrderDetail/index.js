import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Table } from 'react-bootstrap';
import TopBar from '../../Components/TopBar';
import { getSaleById } from '../../servicesAPI/api';
import './index.css';

const ClientOrderDetail = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [sale, setSale] = useState({});

  const getSaleResponse = async () => {
    if (JSON.parse(localStorage.getItem('user'))) {
      const { data: { token } } = JSON.parse(localStorage.getItem('user'));
      const salesResponse = await getSaleById(token, id);
      setSale(salesResponse);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSaleResponse();
  }, []);

  return (
    <div>
      <TopBar />
      {isLoading ? <div>Carregando</div> : (
        <div className="container">
          <h1 data-testid="order-number">{ `Pedido ${sale.saleID}` }</h1>
          <div data-testid="order-date">{ sale.saleDate }</div>
          <Table>
            <thead>
              <tr>
                <th>Quantidade</th>
                <th>Produto</th>
                <th>Preço unitário</th>
                <th>Preço total</th>
              </tr>
            </thead>
            <tbody>
              { sale.products.map(({ price, quantity, name }, index) => {
                const total = (Math
                  .round((Number(price) * Number(quantity)) * 100)) / 100;
                return (
                  <tr key={ index }>
                    <td data-testid={ `${index}-product-qtd` }>{ quantity }</td>
                    <td data-testid={ `${index}-product-name` }>{ name }</td>
                    <td>{ `R$ ${price.replace('.', ',')}` }</td>
                    <td
                      data-testid={ `${index}-product-total-value` }
                    >
                      { `R$ ${total.toFixed(2).replace('.', ',')}` }
                    </td>
                  </tr>
                );
              })}
              <tr style={ { border: 'none' } }>
                <td> </td>
                <td> </td>
                <td> </td>
                <td
                  className="order-total-value"
                  data-testid="order-total-value"
                >
                  { `Total: R$ ${sale.totalPrice.replace('.', ',')}` }
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default ClientOrderDetail;
