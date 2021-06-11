import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Provider from './context/Provider';
import {
  Login,
  Register,
  ClientProfile,
  Products,
  Checkout,
  ClientOrders,
  ClientOrderDetail,
  AdminProfile,
  AdminOrders,
  AdminOrderDetail,
} from './Pages';

function App() {
  return (
    <BrowserRouter>
      <Provider>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/login" component={ Login } />
          <Route path="/register" component={ Register } />
          <Route path="/profile" component={ ClientProfile } />
          <Route path="/products" component={ Products } />
          <Route path="/checkout" component={ Checkout } />
          <Route path="/orders/:id" component={ ClientOrderDetail } />
          <Route path="/orders" component={ ClientOrders } />
          <Route path="/admin/profile" component={ AdminProfile } />
          <Route path="/admin/orders/:id" component={ AdminOrderDetail } />
          <Route path="/admin/orders" component={ AdminOrders } />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
