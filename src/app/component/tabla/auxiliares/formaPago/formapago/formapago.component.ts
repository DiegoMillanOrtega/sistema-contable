import { Component, inject, OnInit } from '@angular/core';
import { TablaComponent } from '../../../tabla/tabla.component';
import { DialogModule } from 'primeng/dialog';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormasDePagoService } from '../../../../../service/formas-de-pago.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { FormasDePago } from '../../../../../interface/formas-de-pago.interface';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-formapago',
  standalone: true,
  imports: [
    TablaComponent,
    DialogModule,
    AvatarModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    DividerModule,
    ReactiveFormsModule,
    PanelModule,
    ToastModule,
    CommonModule,
    ConfirmDialogModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './formapago.component.html',
  styleUrl: './formapago.component.css',
  providers: [
    FormasDePagoService,
    MessageService,
    ConfirmDialogModule,
    ConfirmationService,
  ],
})
export class FormapagoComponent implements OnInit {
  //Variables
  visible = false;
  loading = true;

  //Objetos
  formasDePago: FormasDePago[] = [];
  mainColumns: { field: string; header: string }[] = [
    { field: 'nombre', header: 'Nombre' },
    { field: 'descrip', header: 'Descripción' },
  ];
  fieldsFilter: string[] = ['nombre', 'descrip'];

  // Servicios
  private _formaPago = inject(FormasDePagoService);
  private messageService = inject(MessageService);
  private confirmDialog = inject(ConfirmationService);

  formaPagoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formaPagoForm = this.fb.group({
      formaPagoID: [''],
      nombre: [''],
      descrip: [''],
    });
  }

  ngOnInit(): void {
    this._formaPago.obtenerFormasDePago().pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe(
      (res) => {
        this.formasDePago = res;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  abrirDialogoAgregarFormaPago() {
    this.formaPagoForm.reset();
    this.visible = true;
  }

  guardarFormaPago() {
    if (this.formaPagoForm.get('nombre')?.value === '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El campo Nombre es obligatorio',
      });
      this.formaPagoForm.get('nombre')?.setErrors({ required: true });
      return;
    }
    if (this.formaPagoForm.get('descrip')?.value === '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El campo Descripción es obligatorio',
      });
      this.formaPagoForm.get('descrip')?.setErrors({ required: true });
      return;
    }

    this.loading = true;
    this.visible = false;
    this._formaPago.guardarFormaPago(this.formaPagoForm.value).pipe(
      finalize(() => {
        this.loading = false;
      })
    )
    .subscribe(
      (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Forma de Pago Guardada',
          detail: 'La forma de pago ha sido guardada correctamente',
        });
        this.formaPagoForm.reset();
        this.formasDePago = [...this.formasDePago, res];
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Forma de Pago No Guardada',
          detail: error.error.message,
        });
        console.error(error);
      }
    );
  }

  editarFormaPago(formaPago: FormasDePago) {
    this.formaPagoForm.patchValue(formaPago);
    this.visible = true;
  }

  eliminarFormaPago(formaPago: FormasDePago) {
    
    this.confirmDialog.confirm({
      message: 'Quieres eliminar la forma de pago seleccionada?',
      header: 'Eliminar Forma de Pago',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Eliminar',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.loading = true;
        this._formaPago.eliminarFormaPago(formaPago.formaPagoID).pipe(
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe(
          (res) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Forma de Pago Eliminada',
              detail: 'La forma de pago ha sido eliminada correctamente',
            });
            this.formasDePago = this.formasDePago.filter(
              (f) => f.formaPagoID !== formaPago.formaPagoID
            );
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Forma de Pago No Eliminada',
              detail: error.error.message,
            });
            console.error(error);
          }
        );
      },
    });
  }
}
