import { Component, inject, input, PLATFORM_ID, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AnimalService } from '../../services/animal.service';
import { AnimalModel } from '../../models/animal.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Diet, LifetimeUnit } from '../../models/animal.enums';
import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-animal-details',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './animal-details.html',
  styleUrl: './animal-details.scss',
})
export class AnimalDetails {
  private animalService = inject(AnimalService)
  private form = inject(FormBuilder)
  private router = inject(Router)
  
  id = input.required<string>()
  animal = signal<AnimalModel | null>(null)
  isEditing = signal(false)
  loading = signal(true)
  error = signal<string | null>(null)
  private platformId = inject(PLATFORM_ID)
  
  animalForm = this.form.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
    specie: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    lifetime: [1, [Validators.required]],
    lifetimeUnit: [LifetimeUnit.Year, [Validators.required]],
    diet: [Diet.Hervivoro, [Validators.required]]
  })

  async ngOnInit() {
    if (isPlatformServer(this.platformId)) return;
    
    try {
      const data = await this.animalService.getAnimal(Number(this.id()))
      this.animal.set(data)
      this.fillForm(this.animal()!)
      this.animalForm.disable()
    } catch (error: any) {
      this.error.set(error.error || 'No se encontró el animal')
    } finally {
      this.loading.set(false)
    }
  }

  toggleEdit() {
    this.isEditing.set(true)
    this.animalForm.enable()
  }

  cancelEdit() {
    this.isEditing.set(false)
    this.animalForm.disable()
    this.fillForm(this.animal()!)
  }

  async onUpdate() {
    if (this.animalForm.invalid) {
      this.animalForm.markAllAsTouched()
      return
    }

    try {
      this.animalForm.value.diet = Number(this.animalForm.value.diet)
      this.animalForm.value.lifetimeUnit = Number(this.animalForm.value.lifetimeUnit)
      const updated = await this.animalService.updateAnimal(Number(this.animal()?.id), this.animalForm.value as any)
      this.animal.set(updated)
      this.isEditing.set(false)
      this.animalForm.disable()
    } catch (error: any) {
      this.error.set(error.error.errors)
    }
  }

  async onDelete(){
    if (!this.animal()?.id) return

    try {
      await this.animalService.deleteAnimal(Number(this.animal()?.id))
      this.router.navigate(['/animals'])
    } catch (error: any) {
      this.error.set(error.error.errors)
    }
  }

  private fillForm(animal: AnimalModel) {
    this.animalForm.patchValue(
        {
          name: animal.name,
          description: animal.description,
          specie: animal.specie,
          lifetime: animal.lifetime,
          lifetimeUnit: Number(animal.lifetimeUnitAsEnum(String(animal.lifetimeUnit))),
          diet: Number(animal.dietAsEnum(String(animal.diet)))
        }
      )
  }
}
