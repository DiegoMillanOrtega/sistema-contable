import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FieldsetModule } from 'primeng/fieldset';
import { IconFieldModule } from 'primeng/iconfield';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { PasswordModule } from 'primeng/password';
import { StyleClassModule } from 'primeng/styleclass';
import { AuthService } from '../../core/service/auth.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    CommonModule,
    CheckboxModule,
    PasswordModule,
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    FieldsetModule,
    PanelModule,
    ButtonModule,
    StyleClassModule,
    ToastModule
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
  providers: [
    AuthService,
    MessageService
  ],
})
export class RegistroComponent {
password!: string;
username!: string;

private _authService = inject(AuthService);

private messageService = inject(MessageService);

onRegister() {
  this._authService.register(this.username, this.password).subscribe((res) => {
    this.messageService.add({ severity: 'success', summary: 'Registro Exitoso', detail: 'El usuario ha sido registrado correctamente' });
  },
(error) => {
  this.messageService.add({ severity: 'error', summary: 'Registro No Exitoso', detail: 'El usuario no ha sido registrado correctamente' });
})
}

}
