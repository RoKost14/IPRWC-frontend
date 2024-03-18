import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {routes} from "./app.routes";
import {provideRouter, RouterModule, RouterOutlet} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {ToastrModule} from "ngx-toastr";
import {ChevronLeft, LucideAngularModule, Trash} from 'lucide-angular';

import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    LucideAngularModule.pick({Trash, ChevronLeft}),
    RouterOutlet,
    NoopAnimationsModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
    })

  ],
  providers: [provideRouter(routes)],
  bootstrap: [AppComponent]

})
export class AppModule { }
