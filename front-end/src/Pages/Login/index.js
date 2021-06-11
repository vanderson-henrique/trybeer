import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { Button, Form, Container } from 'react-bootstrap';
import { getUser } from '../../servicesAPI/api';
import { validateFields } from '../../util/validations';
import logo from '../../images/beer-1.1s-200px (2).svg';
import './index.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setisValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (validateFields(email, password) === true) {
      return setisValid(true);
    }
    return setisValid(false);
  }, [email, password, history]);

  const handleSubmit = async () => {
    const user = await getUser({ email, password });
    if (user.data) {
      localStorage.setItem('user', JSON.stringify(user));
      if (user.data.role === 'administrator') return history.push('/admin/orders');
      return history.push('/products');
    }
    setShowMessage(true);
  };

  return (
    <Container className="container-forms">
      <img src={ logo } alt="" />
      <h3><b>Beer or not to Beer</b></h3>
      <Form>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            autocomplete="off"
            id="email"
            onChange={ (e) => setEmail(e.target.value) }
            type="email"
            data-testid="email-input"
            placeholder="Email"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Senha</Form.Label>
          <Form.Control
            onChange={ (e) => setPassword(e.target.value) }
            type="password"
            data-testid="password-input"
            placeholder="Senha"
          />
        </Form.Group>
        <Button
          data-testid="signin-btn"
          disabled={ !isValid }
          onClick={ () => handleSubmit() }
        >
          Entrar
        </Button>
        { showMessage && <p>Usuário ou senha inválido!</p> }
      </Form>
      <Link
        className="link-login"
        data-testid="no-account-btn"
        to="/register"
      >
        Ainda não tenho conta
      </Link>
    </Container>
  );
}
