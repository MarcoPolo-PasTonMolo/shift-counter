import React, { useState } from 'react'
import { connect } from 'react-redux';
import { fetchCooks, submitCook, inputingCook } from '../../actions/cookActions';

const colorToArr = color => {
  color = color.slice(1, color.length);

  const colorArr = [];
  for(let i = 0; i < 3; i ++) {
    colorArr.push(color.substring(i * 2, i * 2 + 2) || '00');
  }

  return colorArr;
}

const checkAndAlertForErrors = (name, times, color, cooks) => {
  let doErrorsExist = false;

  if(name === '') {
    alert('Expected Name but got empty String');
    doErrorsExist = true;
  }

  const doesNameAlreadyExist = cooks.filter(a => a.name === name).length !== 0;

  if(doesNameAlreadyExist) {
    alert('Name already exists. Please choose another name.');
    doErrorsExist = true;
  }

  if(parseInt(times) < 0) {
    alert('Times can not be a negative number');
    doErrorsExist = true;
  }

  color = colorToArr(color);
  const isColorDifferrentEnough = cooks.every(cook => {
    const colorToCompare = colorToArr(cook.color);
    const diff = color.map((a, i) => Math.abs(parseInt(a, 16) - parseInt(colorToCompare[i], 16)));
    return diff.reduce((pr, cur) => cur + pr, 0) > 32;
  });

  if(!isColorDifferrentEnough) {
    alert('The color is too similar to another cook\'s color');
    doErrorsExist = true;
  }

  return doErrorsExist;
}

function CooksPage(props) {
  const { cooks, fetchCooks, submitCook, inputingCook } = props;

  const [cookName, setCookName] = useState('');
  const [cookTimes, setCookTimes] = useState(0);
  const [cookAdditionalTimes, setAdditionalTimes] = useState([]);
  const [cookColor, setCookColor] = useState('#000000');
  const [cookIndex, setCookIndex] = useState(null);

  const onSubmit = e => {
    e.preventDefault();
    const shouldSubmit = !checkAndAlertForErrors(cookName, cookTimes, cookColor, cooks);
    
      if(shouldSubmit) {
      const newCook = {
        name: cookName,
        initialTimes: parseInt(cookTimes),
        additionalTimes: cookAdditionalTimes,
        color: cookColor
      };

      // Update local storage
      const allCooks = [...cooks];
      if(cookIndex !== null) {
        allCooks.splice(cookIndex, 0, newCook);
        setCookIndex(null);
      } else {
        allCooks.push(newCook);
      }
      localStorage.cooks = JSON.stringify(allCooks);

      fetchCooks();
      setCookName('');
      setCookTimes(0);
      setCookColor('#000000');

      // Redux
      submitCook();
    }
  }

  const onDeleteCook = cook => {
    let allCooks = [...cooks];
    allCooks = allCooks.filter(a => a.name !== cook.name);
    localStorage.cooks = JSON.stringify(allCooks);

    fetchCooks();
  }

  const onEditCook = (cook, index) => {
    //Redux
    inputingCook();

    setCookName(cook.name);
    setCookTimes(cook.initialTimes);
    setAdditionalTimes(cook.additionalTimes);
    setCookColor(cook.color);
    setCookIndex(index);

    onDeleteCook(cook);
  }
  
  // Redux
  if(cookName !== '' || cookColor !== '#000000') {
    inputingCook();
  }

  return (
    <div>
      <h1>Cooks</h1>

      <form id="cook-form" onSubmit={e => onSubmit(e)}>
        <div className="cook-input">
          <label>Name</label>
          <input name="name" value={cookName} onChange={e => setCookName(e.target.value)} />
        </div>
        <div className="cook-input">
          <label>Times</label>
          <input name="times" type="number" value={cookTimes} onChange={e => setCookTimes(e.target.value)} />
        </div>
        <div className="cook-input">
          <label>Color</label>
          <input className="basic-style primary-color" name="color" type="color" onChange={e => setCookColor(e.target.value)} />
        </div>
        <button className="basic-style primary-color btn" type="submit">Submit</button>
      </form>

      <div className="basic-style card light-color">
        <h5 className="card-heading">COOKS</h5>
        {
          cooks.map((a, i) => 
            <div key={i} className="cook-block">
              <h3><div className="cook-color" style={{backgroundColor: a.color}} />: {a.name} => {a.initialTimes}</h3>
              <button className="basic-style accent2-color delete" onClick={_ => onDeleteCook(a)}>
                <i className="fa fa-trash fa-lg" aria-hidden="true"></i>
              </button>
              <button className="basic-style primary-color edit"onClick={_ => onEditCook(a, i)}>
                <i className="fa fa-pencil fa-lg" aria-hidden="true"></i>
              </button>
            </div>
          )
        }
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  cooks: state.cooks
});

export default connect(mapStateToProps, { fetchCooks, submitCook, inputingCook })(CooksPage);