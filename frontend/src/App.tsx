import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/Admin/AdminDashboard';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/admin-login" component={Login} />
        <Route path="/admin-dashboard" component={AdminDashboard} />
      </Switch>
    </Router>
  );
};

export default App;
