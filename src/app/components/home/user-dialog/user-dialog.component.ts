import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalService } from '../../../shared/services/global.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserDTO } from '../../../shared/models/UserDTO';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
})
export class UserDialogComponent {
  userForm!: FormGroup;
  user: UserDTO;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    public global: GlobalService,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserDTO
  ) {
    this.user = data;
    this.createForm();
  }

  public async closeDialog() {
    if (this.userForm.invalid) {
      return;
    }
    this.userService.updateUser(this.user.id, this.userForm.value).subscribe(response => this.dialogRef.close(response));
  }

  private createForm() {
    this.userForm = this.formBuilder.group({
      id: [],
      username: [],
      email: [],
      password: [],
      roles: [],
      active: [],
      address: [],
      created: [],
      createdAt: [],
      deleted: [],
      deletedAt: [],
      deletedFlag: [],
      emailToken: [],
      lastLogin: [],
      name: [],
      nextLoginChangePwd: [],
      passwordExpired: [],
      phone: [],
      settlementId: [],
      tempPassword: [],
      tempPasswordExpired: [],
      updated: [],
      updatedAt: [],
      userType: [],
      settlementsBySettlementId: [],
      userByCreatedId: [],
      userByDeletedId: [],
      userByUpdatedId: [],
    });
    this.userForm.patchValue(this.user);
  }
}
