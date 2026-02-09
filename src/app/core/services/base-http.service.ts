import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseHttpService {
  protected async wrapper<T>(request$: Observable<T>): Promise<T>{
    try {
      return await firstValueFrom(request$)
    } catch (error: any) {
      console.log('API error:', error)
      const errorMessage = error.error?.errors || error.error?.error || 'Connection Error.';
      throw errorMessage
    }
  }
}
