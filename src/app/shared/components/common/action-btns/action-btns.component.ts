import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-action-btns',
  standalone: true,
  imports: [ CommonModule, RouterModule ],
  templateUrl: './action-btns.component.html',
  styleUrl: './action-btns.component.css'
})

export class ActionBtnsComponent {
  @Output() _statusEvent = new EventEmitter<number>();
  @Input({ required: true }) data: string | undefined;
  @Input({ required: true }) _url: string | undefined;
  @Input({ required: true }) deleted!: boolean;
  @Input({ required: true }) approval!: boolean;



  toggleDropdown() {
    this._statusEvent.emit();
  }

}