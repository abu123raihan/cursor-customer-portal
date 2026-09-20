import { Component, inject, OnInit, signal } from "@angular/core";
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { ApiErrorBody } from "../../core/api/api.models";
import { ApiService } from "../../core/api/api.service";

function passwordsMatch(group: AbstractControl): ValidationErrors | null {
  const password = group.get("password")?.value;
  const confirm = group.get("confirmPassword")?.value;
  if (!password || !confirm) {
    return null;
  }
  return password === confirm ? null : { mismatch: true };
}

@Component({
  selector: "app-reset-password-page",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: "./reset-password.page.html",
  styleUrl: "./reset-password.page.scss"
})
export class ResetPasswordPage implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(ApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly snack = inject(MatSnackBar);

  readonly submitting = signal(false);
  readonly missingToken = signal(false);
  private token = "";

  readonly form = this.fb.nonNullable.group(
    {
      password: ["", [Validators.required, Validators.minLength(8)]],
      confirmPassword: ["", [Validators.required, Validators.minLength(8)]]
    },
    { validators: passwordsMatch }
  );

  ngOnInit(): void {
    this.token = String(this.route.snapshot.queryParamMap.get("token") ?? "").trim();
    this.missingToken.set(!this.token);
  }

  submit(): void {
    if (this.missingToken()) {
      return;
    }
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const password = this.form.controls.password.value;
    this.submitting.set(true);
    this.api.resetPassword(this.token, password).subscribe({
      next: (envelope) => {
        this.submitting.set(false);
        this.snack.open(envelope.data.message, "OK", { duration: 4500 });
        void this.router.navigateByUrl("/account");
      },
      error: (err: { error?: ApiErrorBody; status?: number }) => {
        this.submitting.set(false);
        const message =
          err.error?.error?.message ??
          (err.status === 0 ? "Cannot reach the API." : "Could not reset password.");
        this.snack.open(message, "OK", { duration: 5000 });
      }
    });
  }
}
