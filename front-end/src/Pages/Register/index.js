import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Container, Form, Button } from 'react-bootstrap';
import { validateName, validateFields } from '../../util/validations';
import { registerUser } from '../../servicesAPI/api';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSeller, setIsSeller] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const history = useHistory();
  useEffect(() => {
    if (validateFields(email, password) && validateName(name)) {
      return setIsValid(true);
    }
    return setIsValid(false);
  }, [name, email, password]);

  const createUser = async () => {
    const role = isSeller ? 'administrator' : 'client';
    const user = await registerUser({ name, email, password, role });
    if (user.data) {
      localStorage.setItem('user', JSON.stringify(user));
      if (user.data.role === 'administrator') return history.push('/admin/orders');
      return history.push('/products');
    }
    setShowMessage(true);
  };

  return (
    <Container>
      <Form>
        <Form.Group>
          <Form.Label>Nome</Form.Label>
          <Form.Control
            data-testid="signup-name"
            type="text"
            onChange={ (e) => setName(e.target.value) }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            data-testid="signup-email"
            type="email"
            onChange={ (e) => setEmail(e.target.value) }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Senha</Form.Label>
          <Form.Control
            data-testid="signup-password"
            type="password"
            onChange={ (e) => setPassword(e.target.value) }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Quero vender</Form.Label>
          <Form.Check
            type="checkbox"
            data-testid="signup-seller"
            onClick={ () => setIsSeller(!isSeller) }
          />
        </Form.Group>
        <Button
          data-testid="signup-btn"
          disabled={ !isValid }
          onClick={ createUser }
        >
          Cadastrar
        </Button>
        { showMessage && <p>Já existe um usuário com esse e-mail.</p>}
      </Form>
    </Container>
  );
};

// Register.propTypes = {};

export default Register;
