import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { Nav } from 'react-bootstrap';
import propTypes from 'prop-types';
import verifyUserLocalStorage from '../../util/changeLocalStorage';
import './index.css';

export default function SideBar({ role }) {
  const history = useHistory();

  useEffect(() => {
    const { data } = verifyUserLocalStorage();
    if (!data) {
      localStorage.clear();
      return history.push('/login');
    }
  }, [history]);

  if (role === 'administrator') {
    return (
      <Nav
        fixed="left"
        data-testid="side-bar-container"
        className="side-menu-container-admin flex-column"
      >
        <Nav.Link data-testid="side-menu-item-orders" href="/admin/orders">
          Pedidos
        </Nav.Link>
        <Nav.Link data-testid="side-menu-item-profile" href="/admin/profile">
          Perfil
        </Nav.Link>
        <Nav.Link
          data-testid="side-menu-item-logout"
          href="/login"
          onClick={ () => localStorage.clear() }
        >
          Sair
        </Nav.Link>
      </Nav>
    );
  }
  return (
    <Nav data-testid="side-menu-container" className="side-menu-container flex-column">
      <Nav.Link
        style={ { marginTop: '50px' } }
        data-testid="side-menu-item-products"
        href="/products"
      >
        Produtos
      </Nav.Link>
      <Nav.Link data-testid="side-menu-item-my-orders" href="/orders">
        Meus pedidos
      </Nav.Link>
      <Nav.Link data-testid="side-menu-item-my-profile" href="/profile">
        Meu Perfil
      </Nav.Link>
      <Nav.Link
        data-testid="side-menu-item-logout"
        href="/login"
        onClick={ () => localStorage.clear() }
      >
        Sair
      </Nav.Link>
    </Nav>
  );
}

SideBar.propTypes = {
  role: propTypes.string.isRequired,
};
