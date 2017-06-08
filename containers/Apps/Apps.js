import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';

class Apps extends Component {
  render() {
    return (
      <div className="apps">

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

export default connect(mapStateToProps, mapDispatchToProps)(Apps);
