import React, { Fragment, Suspense, lazy, Component} from "react";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import theme from "./theme";
import GlobalStyles from "./GlobalStyles";
import * as serviceWorker from "./serviceWorker";
import Pace from "./shared/components/Pace";
import {FirebaseAuthProvider, FirebaseAuthConsumer} from '@react-firebase/auth';
import firebase from 'firebase';
import config from './firebaseConfig';
const LoggedInComponent = lazy(() => import("./logged_in/components/Main"));

const LoggedOutComponent = lazy(() => import("./logged_out/components/Main"));

function App() {
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        <Pace color={theme.palette.primary.light} />
        <Suspense fallback={<Fragment />}>
          <FirebaseAuthProvider {...config} firebase={firebase}>
            <FirebaseAuthConsumer>
              {({user, providerId})=>
              providerId ? 
              (
                <>
                {user &&(
                  <Switch>
                  <Route>
                    <LoggedInComponent />
                  </Route>
                </Switch>
                )}
                {!user &&(
                  <Switch>
                    <Route>
                      <LoggedOutComponent />
                    </Route>
                  </Switch>
                )}
                </>
              ) : (<div><h1>Loading...</h1></div>)
              }
            </FirebaseAuthConsumer>
          </FirebaseAuthProvider>
        </Suspense>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

serviceWorker.register();

export default App;
