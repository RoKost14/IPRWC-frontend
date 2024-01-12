import {Routes} from '@angular/router';
import {AppLayoutComponent} from "./app-layout/app-layout.component";
import {ProductComponent} from "./product/product.component";
import {ProductDetailsComponent} from "./product-details/product-details.component";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {LoginComponent} from "./login/login.component";
import {ProductCreateComponent} from "./product-create/product-create.component";
import {SizeCreateComponent} from "./size-create/size-create.component";
import {SizeEditComponent} from "./size-edit/size-edit.component";
import {AccountComponent} from "./account/account.component";
import {RegisterComponent} from "./register/register.component";
import {adminGuard} from "./shared/guards/admin.guard";

export const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        component: ProductComponent,
      },
      {
        path: 'product/:uuid',
        component: ProductDetailsComponent
      },
      {
        path: 'shopping-cart',
        component: ShoppingCartComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'create',
        component: ProductCreateComponent,
        canActivate: [adminGuard]
      },
      {
        path: 'sizes/create/:uuid',
        component: SizeCreateComponent,
        canActivate: [adminGuard]
      },
      {
        path: 'sizes/edit/:uuid',
        component: SizeEditComponent,
        canActivate: [adminGuard]
      },
      {
        path: 'account',
        component: AccountComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      }
    ]
  }
]

