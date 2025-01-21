import React, { useEffect, useState } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import { createBrowserHistory } from "history";
import Header from "./components/Header";
import Progress from "./components/Progress";

const MarketingLazy = React.lazy(() => import('./components/MarketingApp'))
const AuthLazy = React.lazy(() => import('./components/AuthApp'))
const DashboardLazy = React.lazy(() => import('./components/DashboardApp'))

const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
})

const history = createBrowserHistory()

export default () => {

    const [isSignedIn, setIsSignedIn] = useState(false)

    useEffect(() => {
      if(isSignedIn) {
        history.push('/dashboard')
      }
    }, [isSignedIn])

    return (
        <Router history={history}>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header onSignOut={() => setIsSignedIn(false)} isSignedIn={isSignedIn} />
                    <React.Suspense fallback={<Progress />}>
                        <Switch>
                            <Route path="/auth">
                                <AuthLazy onSignIn={() => setIsSignedIn(true)} />
                            </Route>
                            <Route path="/dashboard">
                                {
                                    !isSignedIn && <Redirect to="/" />
                                }
                                <DashboardLazy />
                            </Route>
                            <Route path="/" component={MarketingLazy} />
                        </Switch>
                    </React.Suspense>
                </div>
            </StylesProvider>
        </Router>
    )
}