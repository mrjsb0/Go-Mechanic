import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/core/services/auth/auth.service';
import { UsersService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-modify-mech-page',
  templateUrl: './modify-mech-page.component.html',
  styleUrls: ['./modify-mech-page.component.css']
})
export class ModifyMechPageComponent implements OnInit {

  user$ = this.usersService.currentUserProfile$;
  userAuth$ = this.authService.currentUser$;

  applyRoleForm = new FormGroup({
    uid: new FormControl('', {
      nonNullable: true,
    }),//This field shouold never be changed....
    
    description: new FormControl('', {
      nonNullable: true,
    }),
    experience: new FormControl('', {
      nonNullable: true,
    }),
    zip: new FormControl('', {
      nonNullable: true,
    }),
    city: new FormControl('', {
      nonNullable: true,
    }),
  });


  constructor(
    private authService : AuthenticationService, 
    private toast: HotToastService,
    private usersService: UsersService,
  
    ) { }

  ngOnInit(): void {
    this.usersService.currentUserProfile$
      //.pipe(untilDestroyed(this)
      .subscribe((user) => {
        this.applyRoleForm.patchValue({ ...user });
      });
    }

  applyRole() {
    const {uid, ...data} = this.applyRoleForm.value;
    if (!uid) { return; }
    //This will add the mechanic role and create their public mechanic profile
    this.usersService.updateUser({
      uid, ...data,
      role: 'mechanic'
    }).pipe(this.toast.observe({
      success: 'Your mechanic profile was updated',
      error: 'There was an error in updating the data.'
    })).subscribe();
  }

}
