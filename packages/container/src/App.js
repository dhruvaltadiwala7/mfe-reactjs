import React from "react";
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
    return (
        <BrowserRouter>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header />
                    <React.Suspense fallback={<Progress />}>
                        <Switch>
                            <Route path="/auth" component={AuthLazy} />
                            <Route path="/" component={MarketingLazy} />
                        </Switch>
                    </React.Suspense>
                </div>
            </StylesProvider>
        </BrowserRouter>
    )
}