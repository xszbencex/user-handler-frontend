import { Component } from '@angular/core';
import { GlobalService } from '../../shared/services/global.service';
import { Roles } from '../../shared/models/Roles';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  roles = Roles;

  constructor(public global: GlobalService) {}

  logout() {
    this.global.logout();
  }
}
