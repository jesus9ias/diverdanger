import { UPDATE_STATS } from '../constants';

const initialState = {
  life: 0,
  level: 1,
  energy: 0,
  status: 'initial',
  points: 0,
  oxygen: 0,
  seconds: 0,
  episode: 1
};

const reducer = (state = initialState, { type, data }) => {
  switch (type) {
    case UPDATE_STATS:
      return Object.assign({}, state, {
        life: data.life,
        level: data.level,
        energy: data.energy,
        status: data.status,
        points: data.points,
        oxygen: data.oxygen,
        seconds: data.seconds,
        episode: data.episode
      });
    default:
      return state;
  }
};

export default reducer;