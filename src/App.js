import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.dogFetch = this.dogFetch.bind(this);
    this.state = {
      message: '',
      status: true,
      breed: '',
    };
  }

  componentDidMount() {
    this.dogFetch();
  }

  componentDidUpdate() {
    const { message, breed } = this.state;
    console.log(breed);
    return (
      <div>
        {
          message.includes('terrier') === true
            ? this.dogFetch()
            : <img alt="dog" src={ message } />
        }
      </div>
    );
  }

  dogFetch() {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            message: result.message,
            status: false,
            breed: this,
          });
        },
      );
    const { message } = this.state;
    localStorage.setItem('prevDog', message);
  }

  render() {
    const { status } = this.state;
    const loadingElement = <span>Loading...</span>;
    return (
      <div className="app">
        <button type="button" onClick={ this.dogFetch }>New Dog</button>
        { status ? loadingElement : this.componentDidUpdate() }
        <p>{ localStorage.getItem('prevDog') }</p>
      </div>
    );
  }
}

export default App;
