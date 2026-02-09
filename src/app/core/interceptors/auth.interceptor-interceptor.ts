import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID)

  if (isPlatformBrowser(platformId)) {
    const accessToken = localStorage.getItem('access-token')
    const client = localStorage.getItem('client')
    const uid = localStorage.getItem('uid')

    if (accessToken && client && uid) {
      const authRequest = req.clone({
        setHeaders: {
          'access-token': accessToken,
          'client': client,
          'uid': uid
        }
      })
      return next(authRequest)
    }
  }

  return next(req);
};
