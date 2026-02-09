import { Component, inject, signal } from '@angular/core';
import { AnimalService } from '../../services/animal.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Diet, LifetimeUnit } from '../../models/animal.enums';

@Component({
  selector: 'app-animal-create',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './animal-create.html',
  styleUrl: './animal-create.scss',
})
export class AnimalCreate {
  private animalService = inject(AnimalService)
  private form = inject(FormBuilder)
  private router = inject(Router)

  isSubmitting = signal(false)
  error = signal<string | null>(null)

  animalForm = this.form.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
    specie: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    lifetime: [1, [Validators.required]],
    lifetimeUnit: [LifetimeUnit.Year, [Validators.required]],
    diet: [Diet.Hervivoro, [Validators.required]]
  })

  async onSubmit() {
    if (this.animalForm.invalid) {
      this.animalForm.markAllAsTouched()
      return
    }

    this.isSubmitting.set(true)
    try {
      this.animalForm.value.diet = Number(this.animalForm.value.diet)
      this.animalForm.value.lifetimeUnit = Number(this.animalForm.value.lifetimeUnit)
      await this.animalService.createAnimal(this.animalForm.value as any)
      this.router.navigate(['/animals'])
    } catch (error: any) {
      console.log(error)
      this.error.set(error.error?.errors || error.error)
    } finally {
      this.isSubmitting.set(false)
    }
  }
}
