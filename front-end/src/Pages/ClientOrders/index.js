import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import TopBar from '../../Components/TopBar';
import { getSalesByUser } from '../../servicesAPI/api';

const ClientOrders = () => {
  const [sales, setSales] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getClientSales = async () => {
    if (JSON.parse(localStorage.getItem('user'))) {
      const { data: { token } } = JSON.parse(localStorage.getItem('user'));
      const salesResponse = await getSalesByUser(token);
      setSales(salesResponse);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getClientSales();
  }, []);

  return (
    <div>
      <TopBar />
      <div style={ { marginTop: '100px' } }>
        <Table>
          <tbody>
            { !isLoading && sales
              .map(({ id, sale_date: date, total_price: price }, index) => (
                <tr key={ id } data-testid={ `${index}-order-card-container` }>
                  <td
                    style={ { textAlign: 'center' } }
                    data-testid={ `${index}-order-number` }
                  >
                    <Link
                      style={ { textDecoration: 'none', color: 'black' } }
                      key={ id }
                      to={ `/orders/${id}` }
                    >
                      { `Pedido ${id}` }
                    </Link>
                  </td>
                  <td data-testid={ `${index}-order-date` }>{ date }</td>
                  <td
                    data-testid={ `${index}-order-total-value` }
                  >
                    {`R$ ${(Number(price)).toFixed(2).replace('.', ',')}`}
                  </td>
                  <td><Link key={ id } to={ `/orders/${id}` }>detalhes</Link></td>
                </tr>
              )) }
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ClientOrders;
