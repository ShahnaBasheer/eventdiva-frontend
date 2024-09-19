import { Component, Input } from '@angular/core';
import { IAddress } from '../../../../core/models/address.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-address',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './detail-address.component.html',
  styleUrl: './detail-address.component.css'
})
export class DetailAddressComponent {
  @Input({required: true}) addressInfo!: IAddress;
}
