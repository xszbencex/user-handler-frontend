import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../shared/services/login.service';
import { UserDTO } from '../../shared/models/UserDTO';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  userDataSource!: MatTableDataSource<UserDTO>;
  displayedColumns: string[] = ['name', 'brand', 'aspectRatio', 'resolution', 'panelType', 'refreshRate', 'displaySize', 'actions'];

  constructor(private userService: LoginService, private snackBar: MatSnackBar) {
    this.initialization().then();
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
