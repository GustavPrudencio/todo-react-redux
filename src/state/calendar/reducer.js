import { List, Record } from 'immutable';
import { SIGN_OUT_SUCCESS } from 'src/state/auth/action-types';
import {
  CREATE_EVENT_SUCCESS,
  REMOVE_EVENT_SUCCESS,
  FILTER_EVENTS,
  LOAD_EVENTS_SUCCESS,
  UPDATE_EVENT_SUCCESS
} from './action-types';


export const EventsState = new Record({
  deleted: null,
  filter: '',
  list: new List(),
  previous: null,
  selectedEvent: null
});



export function eventsReducer(state = new EventsState(), {payload, type}) {
  switch (type) {
    case CREATE_EVENT_SUCCESS:
      return state.merge({
        deleted: null,
        previous: null,
        list: state.deleted && state.deleted.key === payload.key ?
              state.previous :
              state.list.unshift(payload)
      });

    case REMOVE_EVENT_SUCCESS:
      return state.merge({
        deleted: payload,
        previous: state.list,
        list: state.list.filter(event => event.key !== payload.key)
      });

    case FILTER_EVENTS:
      return state.set('filter', payload.filterType || '');

    case LOAD_EVENTS_SUCCESS:
      return state.set('list', new List(payload.reverse()));

    case UPDATE_EVENT_SUCCESS:
      return state.merge({
        deleted: null,
        previous: null,
        list: state.list.map(event => {
          return event.key === payload.key ? payload : event;
        })
      });

    case SIGN_OUT_SUCCESS:
      return new EventsState();

    default:
      return state;
  }
}





//
/*

const calenderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_EVENTS":
      return { ...state, events: action.events }
    case "ADD_EVENT":
      state.events.push(action.event)
      return { ...state }
    case "UPDATE_EVENT":
      let updatedEvents = state.events.map(event => {
        if (event.id === action.event.id) {
          return action.event
        }
        return event
      })
      return { ...state, events: updatedEvents }
    case "UPDATE_DRAG":
      let eventToDrag = action.event,
        extractedEvent = state.events.map(event => {
          if (event.id === eventToDrag.id) {
            return eventToDrag
          }
          return event
        })
      return { ...state, events: extractedEvent }
    case "EVENT_RESIZE":
      let eventToResize = action.event,
        resizeEvent = state.events.map(event => {
          if (event.id === eventToResize.id) {
            return eventToResize
          }
          return event
        })
      return { ...state, events: resizeEvent }
    case "HANDLE_SIDEBAR":
      return { ...state, sidebar: action.status }
    case "HANDLE_SELECTED_EVENT":
      return { ...state, selectedEvent: action.event }
    default:
      return state
  }
}
*/

