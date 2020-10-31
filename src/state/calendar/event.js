import { Record } from 'immutable';


export const Event = new Record({
  id: null,
  title: null,
  start: null,
  end: null,
  label: "others",
  allDay: false,
  selectable: true
});
