import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import {AuthService} from "../auth.service";

@Directive({
  selector: '[appAdminOnly]',
  standalone: true,
})
export class AdminOnlyDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {
    const isAdmin = this.authService.isAdmin();
    if (isAdmin) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      console.log(isAdmin)
    } else {
      this.viewContainer.clear();
    }
  }
}
