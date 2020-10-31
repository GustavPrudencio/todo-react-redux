import { FirebaseList } from 'src/@firebase';
import * as eventActions from './actions';
import { Event } from './event';


export const eventList = new FirebaseList({
  onAdd: eventActions.createTaskSuccess,
  onChange: eventActions.updateTaskSuccess,
  onLoad: eventActions.loadTasksSuccess,
  onRemove: eventActions.removeTaskSuccess
}, Event);
