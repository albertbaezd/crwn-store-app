import React from 'react';
import './App.css';

import HomePage from './pages/homepage/homepage.component';
import {Route, Switch} from 'react-router-dom';
import ShopPage from './pages/shop/shop.component.jsx';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component.jsx';
import { auth, createUserProfileDocument} from './firebase/firebase.utils';


class App extends React.Component {

  constructor(){
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount(){
    //metodo para ver el ultimo user actual. Conexion abierta mientras el componente este
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          })

        });
      }

      this.setState({ currentUser: userAuth });

    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){  
    return (
      <div>

          <Header currentUser = {this.state.currentUser}/>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/shop' component={ShopPage} />
            <Route path='/signin' component={SignInAndSignUpPage} /> 
          </Switch>
          
        </div>
        )
    
  }
  
}

export default App;
