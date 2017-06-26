import React from 'react';
import { searchYoutube } from '../actions';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import UserWelcome from './user_welcome';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.onFormSubmit = this.onFormSubmit.bind(this);

    this.state = {
      term: ''
    }
  }

  //Event handler calls searchYout
  onFormSubmit(e) {
    e.preventDefault();
    console.log('onFormSubmit is called with this term:', this.state.term)
    if (this.state.term !== '') {
      this.props.searchYoutube(this.state.term, this.props.history);
    }
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit} id="search-youtube-form" className="navbar-form navbar-left">
        
        <div className="form-group">
          <input value={this.state.term}
          onChange={event => this.setState({term: event.target.value})}
          id="search-youtube-input" type="search" className="form-control"
          placeholder="Search YouTube" />
        </div>
        
        <div className="form-group">
          <button type="submit" className="btn btn-default">Search</button>
        </div>

      </form>
    )
  }

}

const SearchWithRouter = withRouter(Search);

class NavBar extends React.Component {

  //Building sign in and sign up links
  renderAccountLinks() {
    //this.props.authenticated is not built yet
    if (this.props.authenticated) {
      return [
        <UserWelcome />,
        <li className="nav-item">
          <Link className="nav-link" to="/signout">Sign Out</Link>
        </li>
      ];
    } else {
      return [
        <li className="nav-item" key={0}>
          <Link className="nav-Link" to="/signin">Sign In</Link>
        </li>,
        <li className="nav-item" key={1}> 
          <Link className="nav-link" to="/signup">Sign Up</Link>
        </li>
      ];
    }
  }

  render() {
    return (
      <nav className='navbar navbar-default'>
        <div className='container'>
          
          <div className="navbar-header">
            <a href="/index.html" className="navbar-brand">Jiu-Jitsu Tube</a>
          </div>

          <SearchWithRouter searchYoutube={this.props.searchYoutube} />

          <ul className="nav navbar-nav">
            {this.renderAccountLinks()}
          </ul>
          
        </div>
      </nav>
    )   
  }
  
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps, { searchYoutube })(NavBar); 
