import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import Header from "./components/Header";
import Progress from "./components/Progress";

const MarketingLazy = React.lazy(() => import('./components/MarketingApp'))
const AuthLazy = React.lazy(() => import('./components/AuthApp'))

const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
})

export default () => {

    const [isSignedIn, setIsSignedIn] = useState(false)

    return (
        <BrowserRouter>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header onSignOut={() => setIsSignedIn(false)} isSignedIn={isSignedIn} />
                    <React.Suspense fallback={<Progress />}>
                        <Switch>
                            <Route path="/auth">
                                <AuthLazy onSignIn={() => setIsSignedIn(true)} />
                            </Route>
                            <Route path="/" component={MarketingLazy} />
                        </Switch>
                    </React.Suspense>
                </div>
            </StylesProvider>
        </BrowserRouter>
    )
}