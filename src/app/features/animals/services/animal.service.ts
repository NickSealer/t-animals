import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { AnimalModel } from '../models/animal.model';
import { firstValueFrom } from 'rxjs';
import { AnimalResponseList, AnimalResponseObject } from '../interfaces/animal.response';
import { AnimalInterface } from '../interfaces/animal.interface';
import { BaseHttpService } from '../../../core/services/base-http.service';

@Injectable({
  providedIn: 'root',
})
export class AnimalService extends BaseHttpService {
  private http = inject(HttpClient)
  private readonly url = `${environment.apiURL}/animals`

  async getAnimals(): Promise<AnimalModel[]> {
    const response = await this.wrapper(this.http.get<AnimalResponseList>(this.url))
    return response.animals.map(AnimalModel.fromDTO)
  }

  async getAnimal(id: number): Promise<AnimalModel | null> {
    const response = await this.wrapper(this.http.get<AnimalResponseObject>(`${this.url}/${id}`))
    return response.animal?.id ? AnimalModel.fromDTO(response.animal) : null
  }

  async createAnimal(animal: Partial<AnimalInterface>): Promise<AnimalModel> {
    const response = await this.wrapper(this.http.post<AnimalResponseObject>(this.url, animal))      
    return AnimalModel.fromDTO(response.animal)
  }

  async updateAnimal(id: number, animal: Partial<AnimalInterface>): Promise<AnimalModel> {
    const response = await this.wrapper(this.http.put<AnimalResponseObject>(`${this.url}/${id}`, animal))
    return AnimalModel.fromDTO(response.animal)
  }

  async deleteAnimal(id: Number): Promise<boolean> {
    const response = await this.wrapper(this.http.delete<AnimalResponseObject>(`${this.url}/${id}`))
    return response.success
  }
}
