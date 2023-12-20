import {Routes} from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {AppLayoutComponent} from "./app-layout/app-layout.component";

export const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        component: HomepageComponent,
      },
    ]
  }
]

