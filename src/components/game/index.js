import { connect } from 'react-redux';
import Game from './game';
import { statsActions } from '../../store/actions';

const mapStateToProps = state => ({
  stats: state.stats
});

const mapDispatchToProps = dispatch => ({
  updateStats: data => dispatch(statsActions.updateStats(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
