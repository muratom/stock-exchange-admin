import {Component, Inject, OnInit} from '@angular/core';

// Services
import { DataService } from "../data.service";

// Classes
import { User } from "../user";

// Angular Materials
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import {MatListOption} from "@angular/material/list";

@Component({
  selector: 'app-brokers-list',
  templateUrl: './brokers-list.component.html',
  styleUrls: ['./brokers-list.component.css'],
  providers: [ DataService ]
})
export class BrokersListComponent implements OnInit {
  users: User[] = []

  constructor(private dataService: DataService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataService.getUsers()
      .subscribe(data => this.users = data as User[]);
  }

  updateUser(updatedUser: User): void {
    this.dataService.updateUser(updatedUser);
  }

  deleteUsers(selectedOptions: IterableIterator<MatListOption>): void {
    let selectedUsers: User[] = [];
    for (let option of selectedOptions) {
      selectedUsers.push(option.value);
    }
    for (let delUser of selectedUsers) {
      this.users = this.users.filter(user => {
        return user.username != delUser.username;
      });
    }
    this.dataService.deleteUsers(selectedUsers);
  }

  addUser(newUser: User): void {
    this.users.push(newUser);
    this.dataService.addUser(newUser);
  }

  openEditDialog(user: User): void {
    let userCopy = JSON.parse(JSON.stringify(user));
    const editDialogRef = this.dialog.open(BrokersListEditDialogComponent, {
      data: { user: user },
      disableClose: true
    });

    editDialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let updatedUser = result as User;
        if (updatedUser.budget != userCopy.budget) {
          this.updateUser(result as User);
        }
      } else {
        Object.assign(user, userCopy)
      }
    });
  }

  openAddDialog(): void {
    const addDialogRef = this.dialog.open(BrokersListAddDialogComponent, {
      disableClose: true
    });

    addDialogRef.afterClosed().subscribe((result) => {
      // If user pressed 'Cancel', don't do anything
      if (result) {
        let user = result as User;
        if (Object.values(user).every((prop) => prop)) {
          if (this.users.some(obj => obj.username == user.username)) {
            alert("User with such username already exists")
          } else {
            this.addUser(user);
          }
        } else {
          alert("Not all field are initialized");
        }
      }
    });
  }
}

// Editing dialog
@Component({
  selector: 'app-brokers-list-edit-dialog',
  templateUrl: 'brokers-list-edit-dialog/brokers-list-edit-dialog.component.html',
})
export class BrokersListEditDialogComponent {
  constructor(public dialogRef: MatDialogRef<BrokersListEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { user: User }) { }

  close() {
    // Validation
    // @ts-ignore
    if (this.data.user && this.data.user.budget > 0) {
      this.dialogRef.close(this.data.user);
    } else {
      alert("Invalid budget. It must be greater than 0")
    }
  }
}

// Adding dialog
@Component({
  selector: 'app-brokers-list-add-dialog',
  templateUrl: 'brokers-list-add-dialog/brokers-list-add-dialog.component.html',
})
export class BrokersListAddDialogComponent {
  public user: User = new User();
  constructor(public dialogRef: MatDialogRef<BrokersListAddDialogComponent>) {}

  close() {
    // Validation
    // @ts-ignore
    if (Object.values(this.user).every((prop) => prop) && this.user.budget > 0) {
      this.dialogRef.close(this.user);
    } else {
      alert("Invalid data in field")
    }
  }
}
