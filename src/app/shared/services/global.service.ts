import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserResponseDTO } from '../models/UserResponseDTO';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../../components/message-dialog/message-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  public isLoggedInStatus = false;
  public jwtToken?: string;
  public loggedInAccount?: UserResponseDTO;
  windowWidth!: number;

  constructor(private router: Router, private dialog: MatDialog) {}

  logout() {
    this.jwtToken = '';
    localStorage.removeItem('token');
    this.isLoggedInStatus = false;
    this.router.navigate(['/']).then();
  }

  messageDialog(message: string) {
    this.dialog.open(MessageDialogComponent, { data: message });
  }
}
