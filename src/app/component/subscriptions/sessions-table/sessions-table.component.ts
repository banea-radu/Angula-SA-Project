import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DbSubscriptionSession } from 'src/app/types/database';

@Component({
  selector: 'app-sessions-table',
  templateUrl: './sessions-table.component.html',
  styleUrls: ['./sessions-table.component.css']
})
export class SessionsTableComponent {
  @Input() clientSessions: DbSubscriptionSession[];
  @Output() setSessionIdToDelete = new EventEmitter<string>();

  onDelete(sessionId: string) {
    this.setSessionIdToDelete.emit(sessionId);
  }
}
