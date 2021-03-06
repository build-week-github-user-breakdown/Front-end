import React, { useState } from "react";
// Styles
import "./searchBar.scss";
// Redux
import { connect } from "react-redux";
// Actions
import {
  searchUser,
  handleSearchResultsLoading
} from "../../../redux/actions/dataActions";

function SearchBar(props) {
  let [searchBar, setSearchBar] = useState({
    query: ""
  });

  const handleChange = e => {
    setSearchBar({
      ...searchBar,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.handleSearchResultsLoading(true)
    props.searchUser(searchBar.query);
  };

  return (
    <div id="dashboard-searchBar">
      <h1>Git Search</h1>
      <form onSubmit={handleSubmit}>
        {props.dataCheck ? (
          <input
            type="text"
            name="query"
            value={searchBar.query}
            onChange={handleChange}
            placeholder="Enter Username"
          />
        ) : null}

        <button type="submit" hidden></button>
      </form>
    </div>
  );
}

const mapState = state => ({
  dataCheck: state.Data.dashboardData.following
});

const mapProps = {
  searchUser,
  handleSearchResultsLoading
};

export default connect(mapState, mapProps)(SearchBar);
