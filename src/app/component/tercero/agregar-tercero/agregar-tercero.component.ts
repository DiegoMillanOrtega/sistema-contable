import { Component, inject, OnInit } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';
import { last } from 'rxjs';
import { Toast, ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';

import { log } from 'console';
import { Tercero } from '../../../interface/tercero.interface';
import { TerceroService } from '../../../service/tercero.service';


@Component({
  selector: 'app-agregar-tercero',
  standalone: true,
  imports: [
    PanelModule,
    CommonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    ButtonModule,
    AvatarModule,
    AvatarGroupModule,
    ReactiveFormsModule,
    CardModule,
    FieldsetModule,
    InputMaskModule,
    DropdownModule,
    TabViewModule,
    ToastModule,
  ],
  templateUrl: './agregar-tercero.component.html',
  styleUrl: './agregar-tercero.component.css',
  providers: [TerceroService, MessageService],
})
export class AgregarTerceroComponent implements OnInit{
  formTercero!: FormGroup;

  // Servicios
  private _clienteService = inject(TerceroService);
  private messageService = inject(MessageService);
  private _terceroCliente = inject(TerceroService);

  constructor(private _form: FormBuilder) {
    this.formTercero = _form.group({
      id: [''],
      nit: [''],
      tipoDocumento: [''],
      name: [''],
      lastName: [''],
      phoneNumber: [''],
      email: [''],
      ciudad: [''],
      pais: [''],
      fechaNacimiento: [''],
    });
  }

  ngOnInit(): void {
    const tercero: Tercero = history.state.tercero;
    if (tercero) {
      this.formTercero.patchValue({
        ...tercero,
        fechaNacimiento: this.formatearFechaISO(tercero.fechaNacimiento),
      });
    }

  }

  guardarTercero() {
    
    if (this.formTercero.get('nit')?.value === '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El campo NIT es obligatorio',
      });
      this.formTercero.get('nit')?.setErrors({ required: true });
      return;
    }
    if (this.formTercero.get('tipoDocumento')?.value === '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El campo Tipo de Documento es obligatorio',
      });
      this.formTercero.get('tipoDocumento')?.setErrors({ required: true });
      return;
    }
    if (this.formTercero.get('nombre')?.value === '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El campo Nombre es obligatorio',
      });
      this.formTercero.get('nombre')?.setErrors({ required: true });
      return;
    }
    if (!this.validarFecha(this.formTercero.get('fechaNacimiento')?.value)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'La fecha de nacimiento no es válida',
      });
      this.formTercero.get('fechaNacimiento')?.setErrors({ required: true });
      return;
    }
    this._clienteService.guardarCliente(this.formTercero.value).subscribe(
      (res) => {
        this.messageService.add({
            severity: 'success',
            summary: 'Cliente Guardado',
          detail: 'El cliente ha sido guardado correctamente',
        });
        this.formTercero.reset();
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Cliente No Guardado',
          detail: error.error.message? error.error.message : 'Hubo un error al guardar el cliente',
        });
      }
    );
  }

  formatearFechaISO(fecha: string) {
    const fechaSplit = fecha.split('T')[0];
    const [year, month, day] = fechaSplit.split('-');
    return `${day}/${month}/${year}`;
  }
  formatearFecha(fecha: string):string {
    const fechaSplit = fecha.split('T')[0];
    const [day, month, year] = fechaSplit.split('/');
    return `${year}/${month}/${day}`;
  }

  validarFecha(fecha: string): boolean {
    const format = this.formatearFecha(fecha);
    const year = Number(format.split('/')[0]) 
    const month = Number(format.split('/')[1]);
    const day = Number(format.split('/')[2]);
    const date = new Date(year, month - 1, day);
    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  }
}
