import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {UserModel} from "../../models/user-model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;
  visitingUser = new UserModel();


  constructor(private userService: UserService) {

    this.userService.currentUser$.subscribe((user) => {
      this.isLoggedIn = user !== null
      if (this.isLoggedIn){
        this.visitingUser = user;
      }
    })
    if(!this.isLoggedIn){
      this.visitingUser.roles = ['GUEST']
    }
  }

  ngOnInit(): void {
  }

  logout() {
    this.userService.logout()
    window.location.href = '/home'

  }

}
