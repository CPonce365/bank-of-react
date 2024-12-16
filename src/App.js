/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';
<Router basename="/bank-of-react"></Router>
// Import other components

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 0,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }
  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser})
  }

  componentDidMount() {
    fetch('https://johnnylaicode.github.io/api/debits.json')
      .then((response) => response.json())
      .then((data) => {
        let totalDebit = 0;
        const debits = data.map((debit) => {
          totalDebit += debit.amount;
          return debit;
        })
        this.setState({
          debitList: debits,
          accountBalance: this.state.accountBalance - totalDebit,
        })
      })
      .catch((err) => console.log('Error', err));

      fetch('https://johnnylaicode.github.io/api/credits.json')
      .then((response) => response.json())
      .then((data) => {
        let totalCredit = 0;
        const credits = data.map((credit) => {
          totalCredit += credit.amount;
          return credit;
        });
        this.setState({
          creditList: credits,
          accountBalance: this.state.accountBalance + totalCredit,
        });
      })
      .catch((err) => console.log('Error', err));

  }

  calculateBalance = (credits = [], debits = []) => {
    const totalCredits = credits.reduce((sum, credit) => sum + credit.amount, 0);
    const totalDebits = debits.reduce((sum, debit) => sum + debit.amount, 0);
    return parseFloat((totalCredits - totalDebits).toFixed(2));
  };

  addCredit = (description, amount) => {
    const newCredit = {
      description,
      amount: parseFloat(amount),
      date: new Date().toISOString().split('T')[0],
    };

    this.setState((prevState) => {
      const updatedCredits = [...prevState.creditList, newCredit];
      const updatedBalance = prevState.accountBalance + newCredit.amount;
      return { creditList: updatedCredits, accountBalance: updatedBalance };
    });
  }; 

  addDebit = (description, amount) => {
    const newDebit = {
      description,
      amount: parseFloat(amount),
      date: new Date().toISOString().split('T')[0],
    };

    this.setState((prevState) => {
      const updatedDebits = [...prevState.debitList, newDebit];
      return {
        debitList: updatedDebits,
        accountBalance: this.calculateBalance(prevState.creditList, updatedDebits),
      };
    });
  };

  // Create Routes and React elements to be rendered using React components
  render() {  
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />)
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    )
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const CreditsComponent = () => (<Credits credits={this.state.creditList} addCredit={this.addCredit} accountBalance={this.state.accountBalance} />) 
    const DebitsComponent = () => (<Debits debits={this.state.debitList} addDebit={this.addDebit} accountBalance={this.state.accountBalance}/>) 

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/bank-of-react">
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;