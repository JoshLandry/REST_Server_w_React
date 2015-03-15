'use strict';

var React = require('react');
var ajax = require('jquery').ajax;

var goatsData = [];

var GoatForm = React.createClass({
  getInitialState: function() {
    return {newGoat: {goatSays: ''}};
  },
  handleChangeMsg: function(event) {
    var stateCopy = this.state;
    stateCopy.newGoat.goatSays = event.target.value;
    this.setState(stateCopy);
  },
  handleChangeName: function(event) {
    var stateCopy = this.state;
    stateCopy.newGoat.goatName = event.target.value;
    this.setState(stateCopy);
  },
  handleSubmit: function(event) {
    event.preventDefault();
    console.log(this.state.newGoat);
    var newGoat = this.state.newGoat;
    ajax({
      url: this.props.url,
      contentType: 'application/json',
      method: 'POST',
      data: JSON.stringify(newGoat),
      success: function(data) {
        this.props.onNewGoatSubmit(data);
        this.setState({newGoat: {goatSays: '', goatName: ''}});
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
      }
    })
  },
  render: function() {
    return (
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="newGoat">New Goat</label> <br/>
          Name yr Goat:<input id="newGoatName" type="text" value={this.state.newGoat.goatName} onChange={this.handleChangeName}/> <br/>
          Goat message: <input id="newGoatSays" type="text" value={this.state.newGoat.goatSays} onChange={this.handleChangeMsg}/> <br/> 
          <button type="submit">Create New Goat</button>
        </form>
    )
  }
});

var Goat = React.createClass({
  render: function() {
    return <li>{this.props.data.goatName} says: {this.props.data.goatSays}</li>
  }
});

var GoatList = React.createClass({
  render: function() {
    var goats = this.props.data.map(function(goat) {
      return <Goat data={goat} key={goat._id}/>
    });
    return (
      <section>
        <h1>Goats:</h1>
        <ul>
          {goats}
        </ul>
      </section>
    )
  }
});

var GoatsApp = React.createClass({
  getInitialState: function() {
    return {goatsData: []};
  },
  onNewGoat: function(goat) {
    goat._id = this.state.goatsData.length + 1;
    var stateCopy = this.state;
    stateCopy.goatsData.push(goat);
    this.setState(stateCopy);
  },
  componentDidMount: function() {
    ajax({
      url: this.props.goatsBaseUrl,
      dataType: 'json',
      success: function(data) {
        var state = this.state;
        state.goatsData = data;
        this.setState(state);
      }.bind(this),
      error: function(xhr, status) {
        console.log(xhr, status);
      }
    });
  },
  render: function() {
    return (
      <main>
        <GoatForm onNewGoatSubmit={this.onNewGoat} url={this.props.goatsBaseUrl}/>
        <GoatList data={this.state.goatsData} />
      </main>
    )
  }
});

React.render(<GoatsApp goatsBaseUrl={'/api/v1/goats'}/>, document.body);