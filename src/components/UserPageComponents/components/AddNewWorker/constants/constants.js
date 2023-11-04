const ACTIONS = {
  UPDATE_FIRST_NAME: 'update-first-name',
  UPDATE_LAST_NAME: 'update-last-name',
  UPDATE_EMAIL: 'update-email',
  UPDATE_PHONE: 'update-phone',
  UPDATE_IS18: 'update-is18',
  UPDATE_DEPARTMENT: 'update-department',
  UPDATE_POSITION: 'update-position',
  VALIDATE: 'validate-form',
  DECREES: 'decrees-form',
  UPDATE_WORK_PLACE: 'update-workplace',
};
function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.UPDATE_EMAIL:
      return { ...state, Email: action.payload };

    case ACTIONS.UPDATE_WORKPLACE:
      return { ...state, WorkPlace: action.payload };

    case ACTIONS.UPDATE_FIRST_NAME:
      return { ...state, FirstName: action.payload };

    case ACTIONS.UPDATE_LAST_NAME:
      return { ...state, LastName: action.payload };

    case ACTIONS.UPDATE_PHONE:
      return { ...state, PhoneNumber: action.payload };

    case ACTIONS.UPDATE_IS18:
      return { ...state, Under18: !state.Under18 };

    case ACTIONS.DECREES:
      return { ...state, activeStep: state.activeStep - 1 };

    case ACTIONS.UPDATE_DEPARTMENT:
      return {
        ...state,
        Department: action.payload,
        Possibilities: state.WorkPlace.Positions.find((pos) => pos.Dep === action.payload).Pos,
      };

    case ACTIONS.UPDATE_POSITION:
      return { ...state, Position: action.payload };

    case ACTIONS.VALIDATE:
      switch (state.activeStep) {
        case 0:
          if (state.FirstName.length < 2 || state.LastName.length < 2 || state.PhoneNumber.length < 10) {
            return { ...state, error: true };
          }
          return { ...state, error: false, activeStep: state.activeStep + 1 };

        case 1:
          if (state.Department === '' || state.Position === '') {
            return { ...state, error: true };
          }
          return { ...state, error: false, activeStep: state.activeStep + 1 };

        case 2:
          return { ...state, error: false, activeStep: state.activeStep + 1 };

        default:
          return { ...state };
      }

    default:
      return { ...state };
  }
}

export { ACTIONS, reducer };
