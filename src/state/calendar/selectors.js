import { createSelector } from 'reselect';


export function getEvents(state) {
  return state.events;
}

export function getEventList(state) {
  return getEvents(state).list;
}

export function getEventFilter(state) {
  return getEvents(state).filter;
}

export function getDeletedEvent(state) {
  return getEvents(state).deleted;
}


//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getVisibleEvents = createSelector(
  getEventList,
  getEventFilter,
  (events, filter) => {
    switch (filter) {
      /*
      case 'active':
        return events.filter(event => !task.completed);
      */
      default:
        return events;
    }
  }
);
