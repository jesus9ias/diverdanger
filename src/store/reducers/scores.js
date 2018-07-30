import { UPDATE_SCORES } from '../constants';

const initialState = {
  life: 0,
  level: 0,
  energy: 0,
  points: 0,
  oxygen: 0,
  seconds: 0
};

const reducer = (state = initialState, { type, data }) => {
  switch (type) {
    case UPDATE_SCORES:
      return Object.assign({}, state, {
        life: data.life,
        level: data.level,
        energy: data.energy,
        points: data.points,
        oxygen: data.oxygen,
        seconds: data.seconds,
      });
    default:
      return state;
  }
};

export default reducer;