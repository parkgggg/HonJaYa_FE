
const initialState = {
  isModalVisible: false,
};

const matchingStatusModal = (state = initialState, action : {type: string}) => {
  switch (action.type) {
    case 'SHOW_MODAL':
      return { ...state, isModalVisible: true };
    case 'HIDE_MODAL':
      return { ...state, isModalVisible: false };
    default:
      return state;
  }
};

export default matchingStatusModal;