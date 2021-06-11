import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Button, Container, Navbar } from 'react-bootstrap';
import SideBar from '../SideBar';
import './index.css';
import burguerBtn from '../../images/menu-svgrepo-com.svg';
import verifyUserLocalStorage from '../../util/changeLocalStorage';

export default function () {
  const history = useHistory();
  const path = history.location.pathname;
  const [userRole, setRole] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [title, setTitle] = useState('TryBeer');

  const getTitle = () => {
    switch (path) {
    case '/profile':
      setTitle('Meu perfil');
      break;
    case '/products':
      setTitle('TryBeer');
      break;
    case '/checkout':
      setTitle('Finalizar Pedido');
      break;
    case '/orders':
      setTitle('Meus Pedidos');
      break;
    default:
      setTitle('Detalhes de Pedido');
    }
  };

  useEffect(() => {
    const { data } = verifyUserLocalStorage();
    if (!data) {
      localStorage.clear();
      return history.push('/login');
    }
    const { data: { role } } = JSON.parse(localStorage.getItem('user'));
    setRole(role);
    getTitle();
  }, []);

  return (
    <div>
      <Container className="top-bar-container">
        <Navbar fixed="top" bg="light" variant="light">
          <Button
            variant="light"
            className="hamburger-btn"
            data-testid="top-hamburguer"
            onClick={ () => setIsClicked(!isClicked) }
          >
            <img className="hamburger-icon" src={ burguerBtn } alt="" />
          </Button>
          <Navbar.Brand className="title" data-testid="top-title">{ title }</Navbar.Brand>
        </Navbar>
      </Container>
      <div className={ isClicked ? 'magic-container open' : 'magic-container' }>
        <div className="sidebar-left">
          <div className="sidebar-shrink">
            <SideBar role={ userRole } />
          </div>
        </div>
      </div>
    </div>
  );
}
