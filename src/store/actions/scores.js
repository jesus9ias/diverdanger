import { UPDATE_SCORES } from '../constants';

export const updateScores = data => ({
  type: UPDATE_SCORES,
  data
});
