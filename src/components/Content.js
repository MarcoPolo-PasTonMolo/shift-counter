import React from 'react'
import { connect } from 'react-redux';
import CalendarPage from './pages/CalendarPage';
import CooksPage from './pages/CooksPage';
import PlannerPage from './pages/PlannerPage';
import InfoPage from './pages/InfoPage';

function Content(props) {
  return (
    <div id='content'>
      {
        props.page === 'Calendar' &&
        <CalendarPage />
      }
      {
        props.page === 'Cooks' &&
        <CooksPage />
      }
      {
        props.page === 'Planner' &&
        <PlannerPage />
      }
      {
        props.page === 'Info' &&
        <InfoPage />
      }
    </div>
  )
}

const mapStateToProps = state => ({
  page: state.page
});

export default connect(mapStateToProps, null)(Content);