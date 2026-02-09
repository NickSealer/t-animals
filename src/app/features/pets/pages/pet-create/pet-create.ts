import { Component, inject, signal } from '@angular/core';
import { PetService } from '../../services/pet.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Diet, LifetimeUnit } from '../../../animals/models/animal.enums';
import { validate } from '@angular/forms/signals';
import { PetInterface } from '../../interfaces/pet.interface';

@Component({
  selector: 'app-pet-create',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './pet-create.html',
  styleUrl: './pet-create.scss',
})
export class PetCreate {
  private petService = inject(PetService)
  private form = inject(FormBuilder)
  private router = inject(Router)

  isSubmitting = signal(false)
  error = signal<string | null>(null)

  petForm = this.form.group({
    name: ['', [Validators.required ,Validators.minLength(2), Validators.maxLength(10)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
    specie: ['', [Validators.required]],
    lifetime: [1, [Validators.required]],
    lifetimeUnit: [LifetimeUnit.Year, [Validators.required]],
    diet: [Diet.Hervivoro, [Validators.required]]
  })

  async onSubmit() {
    if(this.petForm.invalid) {
      this.petForm.markAllAsTouched()
      return
    }

    this.isSubmitting.set(true)
    try {
      const payload: Record<string, string | number | null> = {
        ...this.petForm.value,
        diet: Number(this.petForm.value.diet),
        lifetimeUnit: Number(this.petForm.value.lifetimeUnit)
      }
      await this.petService.createPet(payload)
      this.router.navigate(['/pets'])
    } catch (error: any) {
      this.error.set(error)
    } finally {
      this.isSubmitting.set(false)
    }
  }
}
