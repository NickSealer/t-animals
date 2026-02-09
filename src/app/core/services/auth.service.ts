import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { isPlatformBrowser } from '@angular/common';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseHttpService {
  private http = inject(HttpClient)
  private router = inject(Router)
  private platformId = inject(PLATFORM_ID)
  private readonly url = `${environment.apiURL}/auth`

  currentUser = signal<string | null>(this.getLocalStorageItem('uid'))

  private getLocalStorageItem(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) return localStorage.getItem(key)
    
    return null
  }

  async login(credentials: any) {
    const response = await this.wrapper(this.http.post<any>(`${this.url}/sign_in`, credentials, {observe: 'response'}))

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('access-token', response.headers.get('access-token')!)
      localStorage.setItem('client', response.headers.get('client')!)
      localStorage.setItem('uid', response.headers.get('uid')!)
    }

    this.currentUser.set(response.headers.get('uid'))
    this.router.navigate(['/animals'])
  }

  async logout() {
    const response = await this.wrapper(this.http.delete<boolean>(`${this.url}/sign_out`))

    if (isPlatformBrowser(this.platformId) && response) {
      localStorage.clear()
      this.currentUser.set(null)
      this.router.navigate(['/login'])
    }   
  }
}
