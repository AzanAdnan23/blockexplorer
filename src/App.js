import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Block from "./components/Block";
import BlockDetail from "./components/BlockDetails";
import Transection from "./components/Transection";
import TransactionDetail from "./components/TransectionDetails";
//import SearchBar from "./components/Search";


function App() {
  return (
    <Router>
      
      <Header />
     {/* <SearchBar /> */}
      <Switch>
        <Route path="/" exact component={Block} />
        <Route path="/block/:blockNumber" component={BlockDetail} />
      </Switch>

      <Switch>
        <Route path="/" exact component={Transection} />
        <Route path="/transaction/:Txs" component={TransactionDetail} />
      </Switch>
    </Router>
  );
}

export default App;
