# react-cli
Just a little React/Redux component creation CLI I built to save myself some time.

```
Usage: rcli [options] <name>

Options:
  -r --redux     Connect the component to redux
  -s --scss      Create a scss file for the component
  -m --material  Create a material ui component
  -h, --help     output usage information
 
```

### Component Example

```
import React, { Component } from 'react';

class TestComponent extends Component {
  render() {
    return (
      <div className="test-component">

      </div>
    );
  }
}

export default TestComponent;
```

### Redux Connected Component Example

```
import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';

class ReduxComponent extends Component {
  render() {
    return (
      <div className="redux-component">

      </div>
    );
  }
}

function mapStateToProps(state) {

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({

  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxComponent);
```
