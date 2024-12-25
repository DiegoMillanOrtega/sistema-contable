import { Component, EventEmitter, inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TablaComponent } from '../tabla/tabla/tabla.component';
import { Tercero } from '../../interface/tercero.interface';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AgregarTerceroComponent } from './agregar-tercero/agregar-tercero.component';
import { Router, RouterModule } from '@angular/router';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TerceroService } from '../../service/tercero.service';

@Component({
  selector: 'app-tercero',
  standalone: true,
  imports: [
    TablaComponent,
    ToastModule,
    RouterModule,
    SelectButtonModule,
    CardModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ConfirmDialogModule
  ],
  templateUrl: './tercero.component.html',
  styleUrl: './tercero.component.css',
  providers: [ MessageService, ConfirmationService, TerceroService],
})
export class TerceroComponent implements OnInit {
  @Input() esInvocado: boolean = false;

  @Output() exportarTerceroEvento: EventEmitter<Tercero> = new EventEmitter<Tercero>();

  agregarTercero!: AgregarTerceroComponent;

  terceros: Tercero[] = [];
  mainColumns: { field: string; header: string }[] = [
    { field: 'nit', header: 'NIT' },
    { field: 'name', header: 'Nombre' },
    { field: 'lastName', header: 'Apellido' },
    { field: 'ciudad', header: 'Ciudad' },
    { field: 'pais', header: 'Pais' },
    { field: 'tipoDocumento', header: 'Tipo de Documento' },
    { field: 'fechaNacimiento', header: 'Fecha de Nacimiento' },
  ];
  fieldsFilter: string[] = [
    'nit',
    'name',
    'lastName',
    'ciudad',
    'pais',
    'tipoDocumento',
    'fechaNacimiento',
  ];

  // Servicios
  private _terceroService = inject(TerceroService);
  private messageService = inject(MessageService);
  private router = inject(Router);
  private confirmationService = inject(ConfirmationService);

  constructor() {}

  ngOnInit(): void {
    this._terceroService.obtenerClientes().subscribe(
      (res) => {
        this.terceros = res;
        console.log(res);
        
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.message
            ? error.error.message
            : 'Hubo un error al obtener los clientes',
        });
      }
    );
  }

  editarTercero(tercero: Tercero) {
    console.log(tercero);
    //this._terceroCliente.setTercero(tercero); // Reemite después de navegar
    this.router.navigate(['/tercero/agregar-tercero'], { state: { tercero } });
  }

  eliminarTercero(cliente: Tercero) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar este tercero? Esta acción no se puede deshacer.',
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Eliminar',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',
      accept: () => {
        this._terceroService.eliminarCliente(cliente.id).subscribe(
          (res) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Cliente Eliminado',
              detail: 'El cliente ha sido eliminado correctamente',
            });
            this.terceros = this.terceros.filter(
              (val) => val.id !== cliente.id
            );
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Cliente No Eliminado',
              detail: error.error.message
                ? error.error.message
                : 'Hubo un error al eliminar el cliente',
            });
          }
        );
      },
    });
  }

  exportarTerceros(tercero: Tercero) {
    if (tercero === undefined) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al exportar el campo Tercero',
      });
      return;
    }
    this.exportarTerceroEvento.emit(tercero);
  }
}
