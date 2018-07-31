import { combineReducers } from 'redux';
import { reducer as FromReducer } from 'redux-form';
import testReducer from '../../features/testarea/testReducer';
import eventReducer from '../../features/event/eventReducer';
import modalReducer from '../../features/modals/modalReducer';

const rootReducer = combineReducers({
    form: FromReducer,
    test: testReducer,
    events: eventReducer,
    modals: modalReducer
});

export default rootReducer;