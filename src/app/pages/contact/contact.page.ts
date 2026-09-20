import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { STORE_BRAND } from "../../core/catalog/catalog.data";

@Component({
  selector: "app-contact-page",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: "./contact.page.html",
  styleUrl: "./contact.page.scss"
})
export class ContactPage {
  readonly brand = STORE_BRAND;
  readonly form;

  private readonly snack = inject(MatSnackBar);

  constructor(fb: FormBuilder) {
    this.form = fb.nonNullable.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      phone: [""],
      message: ["", [Validators.required, Validators.minLength(10)]]
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.snack.open("Thanks — our trade desk will call you back shortly.", "OK", { duration: 3500 });
    this.form.reset();
  }
}
