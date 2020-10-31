import { getDeletedEvent } from './selectors';
import { eventList } from './event-list';
import {
  FETCH_EVENTS,
  HANDLE_SIDEBAR,
  CREATE_EVENT,
  UPDATE_EVENT,
  UPDATE_DRAG,
  EVENT_RESIZE,
  HANDLE_SELECTED_EVENT,
  CREATE_EVENT_ERROR,
  CREATE_EVENT_SUCCESS,
  REMOVE_EVENT_ERROR,
  FILTER_EVENTS,
  UNLOAD_EVENTS_SUCCESS,
  REMOVE_EVENT_SUCCESS,
  UNDELETE_EVENT_ERROR,
  UPDATE_EVENT_ERROR,
  UPDATE_EVENT_SUCCESS,
  LOAD_EVENTS_SUCCESS,
} from './action-types';



export function createEvent(event) {
  const {
    id,
    title,
    start,
    end,
    label,
    allDay,
    selectable
  } = event;
  return dispatch => {
    eventList.push({
      id,
      title,
      start,
      end,
      label,
      allDay,
      selectable
    })
      .catch(error => dispatch(createEventError(error)));
  };
}

export function createEventError(error) {
  return {
    type: CREATE_EVENT_ERROR,
    payload: error
  };
}

export function createEventSuccess(event) {
  return {
    type: CREATE_EVENT_SUCCESS,
    payload: event
  };
}

export function removeEvent(event) {
  return dispatch => {
    eventList.remove(event.key)
      .catch(error => dispatch(removeEventError(error)));
  };
}

export function removeEventError(error) {
  return {
    type: REMOVE_EVENT_ERROR,
    payload: error
  };
}

export function removeEventSuccess(event) {
  return {
    type: REMOVE_EVENT_SUCCESS,
    payload: event
  };
}

export function undeleteEvent() {
  return (dispatch, getState) => {
    const event = getDeletedEvent(getState());
    if (event) {
      const {
        id,
        title,
        start,
        end,
        label,
        allDay,
        selectable
      } = event;
      eventList.set(event.key, {
        id,
        title,
        start,
        end,
        label,
        allDay,
        selectable
      })
        .catch(error => dispatch(undeleteEventError(error)));
    }
  };
}

export function undeleteEventError(error) {
  return {
    type: UNDELETE_EVENT_ERROR,
    payload: error
  };
}

export function updateEventError(error) {
  return {
    type: UPDATE_EVENT_ERROR,
    payload: error
  };
}

export function updateEvent(event, changes) {
  return dispatch => {
    eventList.update(event.key, changes)
      .catch(error => dispatch(updateEventError(error)));
  };
}

export function updateEventSuccess(event) {
  return {
    type: UPDATE_EVENT_SUCCESS,
    payload: event
  };
}

export function loadEventsSuccess(events) {
  return {
    type: LOAD_EVENTS_SUCCESS,
    payload: events
  };
}

export function filterEvents(filterType) {
  return {
    type: FILTER_EVENTS,
    payload: {filterType}
  };
}

export function loadEvents() {
  return (dispatch, getState) => {
    const { auth } = getState();
    eventList.path = `events/${auth.id}`;
    eventList.subscribe(dispatch);
  };
}

export function unloadEvents() {
  eventList.unsubscribe();
  return {
    type: UNLOAD_EVENTS_SUCCESS
  };
}






/*

import axios from "axios"

export const fetchEvents = () => {
  return async dispatch => {
    await axios
      .get("/api/apps/calendar/events")
      .then(response => {
        dispatch({ type: "FETCH_EVENTS", events: response.data })
      })
      .catch(err => console.log(err))
  }
}

export const handleSidebar = bool => {
  return dispatch => dispatch({ type: "HANDLE_SIDEBAR", status: bool })
}

export const addEvent = event => {
  return dispatch => {
    dispatch({ type: "ADD_EVENT", event })
  }
}
export const updateEvent = event => {
  return dispatch => {
    dispatch({ type: "UPDATE_EVENT", event })
  }
}

export const updateDrag = event => {
  return dispatch => {
    dispatch({ type: "UPDATE_DRAG", event })
  }
}

export const updateResize = event => {
  return dispatch => {
    dispatch({ type: "EVENT_RESIZE", event })
  }
}

export const handleSelectedEvent = event => {
  return dispatch => dispatch({ type: "HANDLE_SELECTED_EVENT", event })
}


*/