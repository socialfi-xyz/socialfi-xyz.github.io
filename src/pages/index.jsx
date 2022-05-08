import {HashRouter as Router, Switch, Route, useHistory} from "react-router-dom";
import Domain from "./domain";
import Airdrop from "./airdrop";
import Home from "./home";
import MyPage from "./my";
import {useMemo} from "react";

function NotFound() {
  const history = useHistory()
  useMemo(() => {
    history.push('/home')
  }, [])
  return <div>404</div>
}

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Domain/>
        </Route>
        <Route path="/home" exact>
          <Home/>
        </Route>
        <Route path="/airdrop" exact>
          <Airdrop/>
        </Route>
        <Route path="/my" exact>
          <MyPage/>
        </Route>
        <Route path="*">
          <NotFound/>
        </Route>
      </Switch>
    </Router>
  );
}
