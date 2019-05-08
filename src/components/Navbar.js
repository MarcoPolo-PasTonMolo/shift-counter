import React from 'react'
import { connect } from 'react-redux';
import { changePage } from '../actions/pageActions';
import { cancelCook } from '../actions/cookActions';

function Navbar(props) {
  const onClickButton = (e) => {
    if(props.inputState) {
      const moveOn = window.confirm('If you move to another page without submiting the cook, his information will be lost.\nMove to another page?');

      if(moveOn) {
        props.cancelCook();
        props.changePage(e.target.innerHTML);
      }
    } else
    props.changePage(e.target.innerHTML);
  };

  return (
    <nav>
      {
        ['Calendar', 'Cooks', 'Planner', 'Info'].map(a =>
          <button key={a} onClick={onClickButton}>{a}</button>
        )
      }
    </nav>
  )
};

const mapStateToProps = state => ({
  inputState: state.cookInput
});

export default connect(mapStateToProps, { changePage, cancelCook })(Navbar);
