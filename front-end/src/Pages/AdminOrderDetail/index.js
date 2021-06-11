import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useParams } from 'react-router';
import SideBar from '../../Components/SideBar';
import { getSaleById, updateSale } from '../../servicesAPI/api';
import './index.css';

const AdminOrderDetail = () => {
  const role = 'administrator';
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [sale, setSale] = useState([]);
  const [status, setStatus] = useState('');

  const getSalesResponse = async () => {
    if (JSON.parse(localStorage.getItem('user'))) {
      const { data: { token } } = JSON.parse(localStorage.getItem('user'));
      const salesResponse = await getSaleById(token, id);
      setStatus(salesResponse.status);
      setSale(salesResponse);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSalesResponse();
  }, []);

  const markAsDelivered = async () => {
    const { data: { token } } = JSON.parse(localStorage.getItem('user'));
    await updateSale(token, sale.saleID);
    setStatus('Entregue');
  };

  return (
    <div>
      <SideBar role={ role } />
      {isLoading ? <div>Carregando</div> : (
        <div className="container-admin-order-detail">
          <h3>
            <span data-testid="order-number">{ `Pedido ${sale.saleID}` }</span>
            <span> - </span>
            <span data-testid="order-status">{ status }</span>
          </h3>
          <Table>
            <thead>
              <th>Quantidade</th>
              <th>Descrição</th>
              <th>Preço unitário</th>
              <th>Preço total</th>
            </thead>
            <tbody>
              { sale.products.map(({ price, quantity, name }, index) => {
                const total = (Math
                  .round((Number(price) * Number(quantity)) * 100)) / 100;
                return (
                  <tr key={ index }>
                    <td data-testid={ `${index}-product-qtd` }>{ quantity }</td>
                    <td data-testid={ `${index}-product-name` }>{ name }</td>
                    <td
                      data-testid={ `${index}-order-unit-price` }
                    >
                      { `(R$ ${price.replace('.', ',')})` }
                    </td>
                    <td
                      data-testid={ `${index}-product-total-value` }
                    >
                      { `R$ ${total.toFixed(2).replace('.', ',')}` }
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <div
            data-testid="order-total-value"
            style={ { fontWeight: 'bold', position: 'fixed', right: '20px' } }
          >
            { `Total: R$ ${sale.totalPrice.replace('.', ',')}` }
          </div>
          <Button
            variant="success"
            data-testid="mark-as-delivered-btn"
            hidden={ status === 'Entregue' }
            onClick={ () => markAsDelivered() }
          >
            Marcar como entregue
          </Button>
        </div>
      )}
    </div>
  );
};

export default AdminOrderDetail;
