import React, { useEffect, useState } from "react";
// Redux
import { connect } from "react-redux";
// Styles
import "./dashboard.scss";
// Components
import Nav from "../../components/dashboard/nav/Nav";
import FollowingContainer from "../../components/dashboard/followingContainer/FollowingContainer";
import SearchContainer from "../../components/dashboard/searchContainer/SearchContainer";
// Actions
import { dashboardData } from "../../redux/actions/dataActions";
 

function Dashboard(props) {
  useEffect(() => {
    props.dashboardData();
  }, []);
  
  return (
    <div id="dashboard">
      <Nav history={props.history} />
      <div id="dashboard-main">
        <FollowingContainer history={props.history} />
        <SearchContainer history={props.history} />
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  state
});

const mapActionsToProps = {
  dashboardData
};

export default connect(mapStateToProps, mapActionsToProps)(Dashboard);
