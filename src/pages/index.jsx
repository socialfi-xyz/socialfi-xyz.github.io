import {HashRouter as Router, Switch, Route, useHistory} from "react-router-dom";
import Home from "./home";
import Dashboard from "./dashboard";
import Airdrop from "./airdrop";
import MyPage from "./my";
import {useContext, useMemo} from "react";
import {VarContext} from "../context";
function NotFound(){
  const history = useHistory()
  useMemo(() => {
    history.push('/dashboard')
  }, [])
  return <div>404</div>
}

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/dashboard" exact>
          <Dashboard />
        </Route>
        <Route path="/airdrop" exact>
          <Airdrop />
        </Route>
        <Route path="/my" exact>
          <MyPage />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}
