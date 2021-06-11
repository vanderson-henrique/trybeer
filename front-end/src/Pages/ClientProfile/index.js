import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Button, Form, Container } from 'react-bootstrap';
import TopBar from '../../Components/TopBar';
import verifyUserLocalStorage from '../../util/changeLocalStorage';
import { updateNameUser } from '../../servicesAPI/api';

const ClientProfile = () => {
  const [user, setUser] = useState({ name: '', email: '' });
  const [wasChange, setWasChange] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const history = useHistory();

  const HTTP_CODE_OK = 200;

  useEffect(() => {
    const { data } = verifyUserLocalStorage();
    if (!data) return history.push('/login');
    setUser({ name: data.name, email: data.email });
  }, [history]);

  const handleChange = ({ value }) => {
    const { data } = verifyUserLocalStorage();
    if (data.name !== value) {
      setWasChange(true);
    } else {
      setWasChange(false);
    }
    setUser({ ...user, name: value });
  };

  const updateName = async () => {
    const { data } = verifyUserLocalStorage();
    const response = await updateNameUser(user, data.token);
    if (response === HTTP_CODE_OK) {
      setShowMessage(true);
      localStorage.setItem('user',
        JSON.stringify({ data: { ...data, name: user.name } }));
    }
  };

  return (
    <div>
      <TopBar />
      <Container style={ { marginTop: '100px' } }>
        <Form>
          <Form.Group>
            <Form.Label>Nome</Form.Label>
            <Form.Control
              value={ user.name }
              data-testid="profile-name-input"
              onChange={ ({ target }) => handleChange(target) }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              readOnly
              data-testid="profile-email-input"
              type="email"
              value={ user.email }
            />
          </Form.Group>
          <Button
            data-testid="profile-save-btn"
            disabled={ !wasChange }
            onClick={ updateName }
          >
            Salvar
          </Button>
          { showMessage && <p>Atualização concluída com sucesso</p>}
        </Form>
      </Container>
    </div>
  );
};

export default ClientProfile;
