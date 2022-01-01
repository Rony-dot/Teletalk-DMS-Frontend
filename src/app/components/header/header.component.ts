import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private userService: UserService) {
    this.userService.currentUser$.subscribe((user) => {
      this.isLoggedIn = user !== null
    })
  }

  ngOnInit(): void {
  }

  logout() {
    this.userService.logout()
    window.location.href = '/home'

  }

}
