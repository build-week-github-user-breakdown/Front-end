import React, { useEffect } from "react";
// Styles
import './detailCard.scss';
// Redux
import { connect } from "react-redux";
//Components
import Chart from '../chart/Chart';
import Tendencies from '../tendenciesCard/TendenciesCard';
import NotesModal from '../notesModal/NotesModal';
// Actions
import { detailCardAction, favoriteUser, getFollowers, unfollowUser } from "../../../redux/actions/dataActions";
import { toggleModal } from "../../../redux/actions/userActions";

import { textEmoji } from 'markdown-to-text-emoji';

function DetailsCard(props) {
  useEffect(() => {
    props.detailCardAction(props.userID);
  }, []);

  const handleFollow = userID => {
    props.favoriteUser(userID);
    props.getFollowers();
  }

  const handleUnfollow = userID => {
    props.unfollowUser(userID);
    // props.getFollowers();
  }

  const emojify = () => textEmoji(props.userDetailData.bio);

  if (!props.userDetailData) return <div>loading...</div>;

  console.log('YEEEE', props.whoImFollowing);

  return (
    <>
      <NotesModal />
      <div className="details-card">
        <div className="details-content">
          <div className="details-avatar">
            <img src={props.userDetailData.avatarUrl} alt="yeah" />
          </div>

          <div className="details-info">
            <ul>
              <li>{props.userDetailData.login}</li>
              <li>{props.userDetailData.name}</li>
              {props.userDetailData.location ? <li>Location: {props.userDetailData.location}</li> : null}
              <li>Repos: {props.userDetailData.repoCount}</li>
              <li>Profile : <a href={props.userDetailData.url} target="_blank" rel="noopener noreferrer">{props.userDetailData.url}</a></li>
              {props.userDetailData.bio ? <li>{emojify()}</li> : null}
            </ul>
            <div className="details-tendencies">
              <Tendencies userID={props.userID} />
            </div>
          </div>
        </div>
        <div className="details-chart">
          <Chart userID={props.userID} username={props.userDetailData.login} />
        </div>
        <div className="buttons">
          {props.whoImFollowing.findIndex(user => user.login === props.userDetailData.login) !== -1 ?
            <>
              <button className="btn-notes" onClick={() => props.toggleModal(props.modalIsOpen)}>Notes</button>
              <button className="btn-unfollow" onClick={() => handleUnfollow(props.userID)}>Unfollow</button>
            </>
            :
            <button className="btn-follow" onClick={() => handleFollow(props.userID)}>Follow</button>
          }
        </div>
      </div>
    </>
  );
}

const mapStateToProps = state => ({
  userID: state.Data.userID,
  modalIsOpen: state.User.modalIsOpen,
  userDetailData: state.Data.userDetailData,
  whoImFollowing: state.Data.dashboardData.following
});

const mapActionsToProps = {
  detailCardAction,
  toggleModal,
  favoriteUser,
  getFollowers,
  unfollowUser
};

export default connect(mapStateToProps, mapActionsToProps)(DetailsCard);