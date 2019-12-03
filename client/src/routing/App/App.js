import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import theme from 'theme';
import publicRoutes from 'routing/routes/publicRoutes';
import AppLayout from 'layouts/AppLayout';

const renderRoutes = routes => {
  return routes.map(({ path, component }) => {
    return <Route key={path} exact path={path} component={component} />;
  });
};

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <AppLayout>
            <Switch>{renderRoutes(publicRoutes)}</Switch>
          </AppLayout>
        </ThemeProvider>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
