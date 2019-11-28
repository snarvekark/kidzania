class DynamicSelect extends React.Component {
    render() {
      return <li>{this.props.label + " - " + this.props.value}</li>;
    }
  }
  
  ReactDOM.render(<MyApp />, document.getElementById('picture_assigned'));