import { Component } from '@angular/core';
import { NotificationsService } from '../notifications.service';
import { Command } from '../command';

@Component({
  selector: 'app-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.css'],
})
export class NotificationsListComponent {
  notices: Command[];

  constructor(private notificationsService: NotificationsService) {
    this.notificationsService.messagesOutput.subscribe((notices) => {
      this.notices = notices;
    });
  }

  removeNotification(id: number) {
    this.notificationsService.clearMessage(id);
  }
}
