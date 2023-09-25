import { Injectable } from '@angular/core';
import { Command } from './command';
import { Observable, Subject } from 'rxjs';
import { scan } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  // Building the notification system

  messagesInput: Subject<Command>;
  messagesOutput: Observable<Command[]>;

  constructor() {
    // hot and multicast
    this.messagesInput = new Subject();
    // cold and unicast
    this.messagesOutput = this.messagesInput.pipe(
      // output the array  of all notifications in the app
      scan((acc: Command[], message: Command) => {
        if (message.type === 'clear') {
          return acc.filter((value) => message.id !== value.id);
        } else {
          return [...acc, message];
        }
      }, [])
    );
  }

  addSuccess(text: string) {
    const id = this.getRandomId();
    this.messagesInput.next({
      id,
      text,
      type: 'success',
    });

    setTimeout(() => {
      this.clearMessage(id);
    }, 5000);
  }

  addError(text: string) {
    const id = this.getRandomId();
    this.messagesInput.next({
      id,
      text,
      type: 'error',
    });

    setTimeout(() => {
      this.clearMessage(id);
    }, 5000);
  }

  clearMessage(id: number) {
    this.messagesInput.next({
      id,
      type: 'clear',
    });
  }

  getRandomId() {
    return Math.ceil(Math.random() * 100000);
  }
}
