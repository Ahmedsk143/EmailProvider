import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { catchError, switchMap } from 'rxjs/operators';
import { EMPTY, Observable, of } from 'rxjs';
import { Email } from './email-interface';
import { EmailService } from './email.service';
@Injectable({
  providedIn: 'root',
})
export class EmailResolverService implements Resolve<Email> {
  constructor(private emailSer: EmailService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot) {
    //another way to get the id paramter by destruction of the id propery on the params object
    // const id = route.paramMap.get('id');
    const { id } = route.params;
    return this.emailSer.getEmail(id).pipe(
      catchError(() => {
        this.router.navigateByUrl('/inbox/notFound');
        return EMPTY;
      })
    );
  }
}
