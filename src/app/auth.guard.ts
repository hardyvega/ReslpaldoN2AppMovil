import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalStorageService } from './services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private localStorageService: LocalStorageService) {}

  canActivate(): boolean {
    // Verificar si el usuario está autenticado utilizando LocalStorageService
    const isAuthenticated = !!this.localStorageService.getItem('userToken');
    
    if (!isAuthenticated) {
      this.router.navigate(['/login']); // Redirige a la página de login si no está autenticado
      return false;
    }
    return true; // Permite el acceso si está autenticado
  }
}

