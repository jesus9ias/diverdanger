import { connect } from 'react-redux';
import Game from './game';
import { scoreActions } from '../../store/actions';

const mapStateToProps = state => ({
  scores: state.scores
});

const mapDispatchToProps = dispatch => ({
  updateScores: data => dispatch(scoreActions.updateScores(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
