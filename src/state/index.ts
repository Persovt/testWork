import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducer'
import {StateType} from './reducer'

export type storeType = {
  auth: StateType,
}

export default configureStore({
  reducer: {
    auth: authReducer,
  },
})