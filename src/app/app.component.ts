import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import {
  Router,
  RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationError,
  NavigationCancel,
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  signedIn = false;
  username: string;
  loading: boolean = true;

  constructor(private authservice: AuthService, private router: Router) {
    this.router.events.subscribe((routerEvent: RouterEvent) => {
      this.checkRouterEvent(routerEvent);
    });
  }

  ngOnInit() {
    //to get the username once it is avaliable
    this.authservice.username$.subscribe((username) => {
      this.username = username;
    });
    //to check if the user is signed in, and change the signedIn value
    this.authservice.signedIn$.subscribe((signedIn: any) => {
      this.signedIn = signedIn;
    });
    this.authservice.checkSignin().subscribe();
  }

  checkRouterEvent(routerEvent: RouterEvent): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (
      routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError
    ) {
      this.loading = false;
    }
  }
}
