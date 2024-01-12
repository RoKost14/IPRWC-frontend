import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {ChangeDetectorRef, Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {ApiService} from "../shared/api.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private apiService: ApiService,
  ) {}

  submitLogin() {
    this.apiService
      .PostLogin({ username: this.username, password: this.password })
      .subscribe({
        next: (data) => {
          this.toastr.success('Login successful', 'Success');
          this.router.navigate(['']);
          // location.reload()

        },
        error: (error) => {
          console.error(error);
          this.toastr.error('Invalid username or password', 'Error');
        },
      });
  }
}
