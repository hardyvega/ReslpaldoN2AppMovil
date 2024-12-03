import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private localStorageService: LocalStorageService
  ) {}

  // Método para iniciar sesión
  async login() {
    // Obtén la lista de usuarios guardados en localStorage
    const users: any[] = JSON.parse(this.localStorageService.getItem('users')) || [];

    // Verifica si el usuario ingresado existe en la lista y coincide la contraseña
    const user = users.find((user: any) => user.username === this.username && user.password === this.password);

    if (user) {
      // Guarda el token de sesión (simulado) en localStorage
      this.localStorageService.setItem('userToken', 'sample-token');
      this.router.navigate(['/home']); // Redirige al usuario a la página de inicio
    } else {
      // Muestra una alerta de error si las credenciales no coinciden
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Usuario o contraseña incorrectos.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  // Método para recuperar la contraseña
  async recoverPassword() {
    const alert = await this.alertController.create({
      header: 'Recuperar Contraseña',
      message: 'Enviaremos un enlace de recuperación a tu correo.',
      buttons: ['OK']
    });
    await alert.present();
  }

  // Método para restablecer la contraseña
  async resetPassword() {
    const alert = await this.alertController.create({
      header: 'Restablecer Contraseña',
      message: 'Por favor, contacta con el administrador para restablecer tu contraseña.',
      buttons: ['OK']
    });
    await alert.present();
  }

  // Método para redirigir a la página de registro
  register() {
    this.router.navigate(['/register']); // Redirige a la página de registro
  }
}
