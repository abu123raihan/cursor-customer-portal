import { Component, inject, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { Router, RouterLink } from "@angular/router";
import { ApiErrorBody } from "../../core/api/api.models";
import { ApiService } from "../../core/api/api.service";
import { AuthStore } from "../../core/auth/auth.store";

type AccountMode = "signin" | "forgot";

@Component({
  selector: "app-account-page",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: "./account.page.html",
  styleUrl: "./account.page.scss"
})
export class AccountPage {
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(ApiService);
  private readonly auth = inject(AuthStore);
  private readonly snack = inject(MatSnackBar);
  private readonly router = inject(Router);

  readonly user = this.auth.user;
  readonly mode = signal<AccountMode>("signin");
  readonly submitting = signal(false);
  readonly form = this.fb.nonNullable.group({
    displayName: [""],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(8)]]
  });
  readonly forgotForm = this.fb.nonNullable.group({
    email: ["", [Validators.required, Validators.email]]
  });

  showForgot(): void {
    const email = this.form.controls.email.value.trim();
    if (email) {
      this.forgotForm.controls.email.setValue(email);
    }
    this.mode.set("forgot");
  }

  showSignIn(): void {
    this.mode.set("signin");
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password, displayName } = this.form.getRawValue();
    this.submitting.set(true);
    this.api.loginOrRegister(email, password, displayName.trim() || undefined).subscribe({
      next: (envelope) => {
        this.submitting.set(false);
        this.auth.setSession(envelope.data);
        const msg = envelope.data.created
          ? "Account created. You are signed in."
          : "Welcome back — you are signed in.";
        this.snack.open(msg, "OK", { duration: 3500 });
        void this.router.navigateByUrl("/shop");
      },
      error: (err: { error?: ApiErrorBody; status?: number }) => {
        this.submitting.set(false);
        const message =
          err.error?.error?.message ??
          (err.status === 0 ? "Cannot reach the API." : "Sign-in failed. Try again.");
        this.snack.open(message, "OK", { duration: 5000 });
      }
    });
  }

  submitForgot(): void {
    if (this.forgotForm.invalid) {
      this.forgotForm.markAllAsTouched();
      return;
    }

    const email = this.forgotForm.controls.email.value.trim();
    this.submitting.set(true);
    this.api.forgotPassword(email).subscribe({
      next: (envelope) => {
        this.submitting.set(false);
        const data = envelope.data;
        this.snack.open(data.message, "OK", { duration: 6000 });

        if (data.previewUrl) {
          window.open(data.previewUrl, "_blank", "noopener");
        }

        if (data.sent) {
          this.mode.set("signin");
        }
      },
      error: (err: { error?: ApiErrorBody; status?: number }) => {
        this.submitting.set(false);
        const message =
          err.error?.error?.message ??
          (err.status === 0 ? "Cannot reach the API." : "Could not send reset email.");
        this.snack.open(message, "OK", { duration: 7000 });
      }
    });
  }

  signOut(): void {
    this.auth.clear();
    this.snack.open("Signed out.", "OK", { duration: 2500 });
  }
}
