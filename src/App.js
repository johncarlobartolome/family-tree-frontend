import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "../src/components/Header";
import AddUser from "../src/components/AddUser";
import UserList from "../src/components/UserList";
import HomeScreen from "../src/components/HomeScreen";
import UserDetails from "../src/components/UserDetails";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <div className='main-content'>
          <Switch>
            <Route component={HomeScreen} path='/' exact={true} />
            <Route component={UserList} path='/users' exact={true} />
            <Route component={AddUser} path='/users/add' exact={true} />
            <Route component={UserDetails} path='/users/:id' exact={true} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
