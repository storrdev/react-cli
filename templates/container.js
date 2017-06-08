import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';

class {{ name }} extends Component {
  render() {
    return (
      <div className="{{ className }}">

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

export default connect(mapStateToProps, mapDispatchToProps)({{ name }});
