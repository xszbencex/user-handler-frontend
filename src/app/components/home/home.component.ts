import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../shared/services/user.service';
import { UserDTO } from '../../shared/models/UserDTO';
import { GlobalService } from '../../shared/services/global.service';
import { Roles } from '../../shared/models/Roles';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  userDataSource!: MatTableDataSource<UserDTO>;
  displayedColumns: string[] = ['username', 'email', 'createdAt', 'actions'];
  isAdmin: boolean = false;

  constructor(public global: GlobalService, private dialog: MatDialog, private userService: UserService, private snackBar: MatSnackBar) {
    this.isAdmin = !!global.loggedInAccount?.roles?.includes(Roles.ADMIN);
    if (this.isAdmin) {
      this.initialization().then();
    }
  }

  openDialog(user: UserDTO) {
    this.dialog
      .open(UserDialogComponent, { data: user, width: '700px' })
      .afterClosed()
      .subscribe((result: any) => {
        if (result) {
          this.initialization().then();
          this.snackBar.open('User sikeresen módosítva!', 'Bezár', { duration: 2000 });
        }
      });
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe(() => {
      this.snackBar.open('User sikeresen törölve!', 'Bezár', { duration: 2000 });
      this.initialization().then();
    });
  }

  private async initialization() {
    await this.userService.getAllUser().subscribe(response => {
      this.userDataSource = new MatTableDataSource<UserDTO>(response);
      this.userDataSource.sort = this.sort;
      this.userDataSource.paginator = this.paginator;
    });
  }
}
