import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import SideBar from '../../Components/SideBar';
import { getSales } from '../../servicesAPI/api';
import './index.css';

const AdminOrders = () => {
  const role = 'administrator';
  const [isLoading, setIsLoading] = useState(true);
  const [sales, setSales] = useState([]);

  const getSalesResponse = async () => {
    if (JSON.parse(localStorage.getItem('user'))) {
      const { data: { token } } = JSON.parse(localStorage.getItem('user'));
      const salesResponse = await getSales(token);
      setSales(salesResponse);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSalesResponse();
  }, []);

  return (
    <div>
      <SideBar role={ role } />
      { isLoading ? <div>Loading</div> : (
        <div className="container-admin-order">
          <h2>Pedidos</h2>
          <Table>
            <thead>
              <tr>
                <th>Pedido</th>
                <th>Endereço</th>
                <th>Valor Total</th>
                <th>Status</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              { sales.map((sale, index) => (
                <tr key={ index }>
                  <td>
                    <Link
                      data-testid={ `${index}-order-number` }
                      to={ `/admin/orders/${sale.saleId}` }
                      style={ { textDecoration: 'none', color: 'black' } }
                    >
                      { `Pedido ${sale.saleId}` }
                    </Link>
                  </td>
                  <td
                    data-testid={ `${index}-order-address` }
                  >
                    { `${sale.deliveryAddress}, ${sale.deliveryNumber}` }
                  </td>
                  <td
                    data-testid={ `${index}-order-total-value` }
                  >
                    { `R$ ${sale.totalPrice.replace('.', ',')}` }
                  </td>
                  <td data-testid={ `${index}-order-status` }>{ sale.status }</td>
                  <td>
                    <Link to={ `/admin/orders/${sale.saleId}` }>
                      detalhes
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
