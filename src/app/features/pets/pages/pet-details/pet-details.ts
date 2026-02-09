import { Component, inject, input, PLATFORM_ID, signal } from '@angular/core';
import { PetService } from '../../services/pet.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PetModel } from '../../models/pet.model';
import { Diet, LifetimeUnit } from '../../../animals/models/animal.enums';
import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-pet-details',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './pet-details.html',
  styleUrl: './pet-details.scss',
})
export class PetDetails {
  private petService = inject(PetService)
  private form = inject(FormBuilder)
  private router = inject(Router)

  id = input.required<string>()
  pet = signal<PetModel | null>(null)
  loading = signal(true)
  error = signal<string | null>(null)
  isEditing = signal(false)
  private platformId = inject(PLATFORM_ID)

  petForm = this.form.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
    specie: ['', [Validators.required]],
    lifetime: [1, [Validators.required]],
    lifetimeUnit: [LifetimeUnit.Year, [Validators.required]],
    diet: [Diet.Hervivoro, [Validators.required]]
  })

  private fillForm(pet: PetModel) {
    this.petForm.patchValue(
      {
        name: pet.name,
        description: pet.description,
        specie: pet.specie,
        lifetime: pet.lifetime,
        lifetimeUnit: Number(pet.lifetimeUnitAsEnum(String(pet.lifetimeUnit))),
        diet: Number(pet.dietAsEnum(String(pet.diet)))
      }
    )
  }

  async ngOnInit(){
    if(isPlatformServer(this.platformId)) return

    try {
      const data = await this.petService.getPet(Number(this.id()))
      this.pet.set(data)
      this.fillForm(this.pet()!)
      this.petForm.disable()
    } catch (error: any) {
      this.error.set(error)
    } finally {
      this.loading.set(false)
    }
  }

  toggleEdit() {
    this.isEditing.set(true)
    this.petForm.enable()
  }

  cancelEdit(){
    this.isEditing.set(false)
    this.petForm.disable()
    this.fillForm(this.pet()!)
  }

  async onUpdate(){
    if (this.petForm.invalid) {
      this.petForm.markAllAsTouched()
      return
    }

    try {
      const payload: Record<string, string | number | null> = {
        ...this.petForm.value,
        diet: Number(this.petForm.value.diet),
        lifetimeUnit: Number(this.petForm.value.lifetimeUnit)
      }
      const data = await this.petService.updatePet(Number(this.pet()?.id), payload)
      this.pet.set(data)
      this.isEditing.set(false)
      this.petForm.disable()
    } catch (error: any) {
      this.error.set(error)
    }
  }

  async onDelete() {
    if(!this.pet()?.id) return

    try {
      const response = await this.petService.deletePet(Number(this.pet()?.id))
      if (response) {
        this.router.navigate(['/pets'])
      } else {
        window.location.reload()
        this.error.set('Error Terrible')
      }
    } catch (error: any) {
      this.error.set(error)
    }
  }
}
