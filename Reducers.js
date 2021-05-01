import { combineReducers } from "redux";

const INITIAL_STATE = {
  emotionFound: "",
  emotionList: ["sad", "happy", "angry", "surprise"],
  imageLocation: "",
};

const emotionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "UPDATE_EMOTION":
      // copy the state
      const { emotionFound, emotionList, imageLocation } = state;
      const newEmotion = action.emotion;
      const newState = { emotionFound: newEmotion, emotionList, imageLocation };

      // return newState
      return newState;
    default:
      return state;
  }
};

export default combineReducers({
  emotions: emotionReducer,
});
