import React from 'react';
import { connect } from 'react-redux';
import { selectActors, selectActor } from 'store/reducers/actor/selectors';
import { BigTitle } from 'elements/typography/titles';

import { getActor } from 'store/reducers/actor/actions';

// import PropTypes from 'prop-types';

const Home = props => {
  const [actorId, setActorId] = React.useState('');

  console.log(props);
  const { actor } = props;

  const handleClick = () => {
    props.getActor(actorId);
  };

  const handleInputChange = e => {
    setActorId(e.target.value);
  };

  return (
    <div>
      Home
      <input
        value={actorId}
        onChange={handleInputChange}
        placeholder="Actor Id"
      />
      <button onClick={handleClick}>Get actor</button>
      {actor && (
        <React.Fragment>
          <BigTitle>title: {actor.title}</BigTitle>
        </React.Fragment>
      )}
    </div>
  );
};

Home.propTypes = {};

const mapStateToProps = state => ({
  actors: selectActors(state),
  actor: selectActor(state),
});

const mapDispatchToProps = {
  getActor,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
