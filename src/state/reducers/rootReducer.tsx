'use client'

import { combineReducers } from '@reduxjs/toolkit';
import loginCheck from './loginCheck';
import matchingStatusModal from './matchingStatusModal';

const rootReducer = combineReducers({
  loginCheck,
  matchingStatusModal,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
