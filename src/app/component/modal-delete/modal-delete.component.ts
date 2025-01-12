import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css']
})
export class ModalDeleteComponent {
  @Input() itemToDeleteName: string;
  @Input() deleteAction: () => void;
  @Input() modalId: string;
  @Input() modalTitle: string;
  @Input() modalContentText: string;
  @Input() modalActionProceedText = 'strDelete';
  @Input() modalActionCancelText = 'strCancel';
}
