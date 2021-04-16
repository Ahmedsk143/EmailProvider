import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmailShowComponent } from './email-show/email-show.component';
import { EmailPlacholderComponent } from './email-placholder/email-placholder.component';
import { EmailResolverService } from './email-resolver.service';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'notFound', component: NotFoundComponent },
      { path: '', component: EmailPlacholderComponent },
      {
        path: ':id',
        component: EmailShowComponent,
        resolve: { FetchedEmail: EmailResolverService },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InboxRoutingModule {}
