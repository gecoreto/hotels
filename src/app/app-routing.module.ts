import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ContentComponent } from './structurePage/content/content.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/hotel/list',
    pathMatch: 'full'
  },
  {
    path: 'hotel',
    component: ContentComponent,
    children: [
      {
        path: 'list',
        component: HotelListComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
