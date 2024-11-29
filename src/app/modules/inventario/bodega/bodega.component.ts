import { Component, inject, Input } from '@angular/core';
import { TablaComponent } from '../../../component/tabla/tabla/tabla.component';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { finalize, forkJoin } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BodegaService } from '../../../service/bodega.service';
import { TerceroService } from '../../../service/tercero.service';
import { Bodega } from '../../../interface/bodega.interface';
import { Tercero } from '../../../interface/tercero.interface';
import { TipoBodega } from '../../../interface/tipo-bodega.interface';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InventarioService } from '../../../service/inventario.service';
import { TabViewModule } from 'primeng/tabview';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';



@Component({
  selector: 'app-bodega',
  standalone: true,
  imports: [
    TablaComponent,
    ToastModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ConfirmDialogModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    DialogModule,
    ProgressSpinnerModule,
    PanelModule,
    DropdownModule,
    InputMaskModule,
    InputNumberModule,
    TabViewModule,
    InputGroupModule,
    InputGroupAddonModule
  ],
  templateUrl: './bodega.component.html',
  styleUrl: './bodega.component.css',
  providers: [BodegaService, MessageService, ConfirmationService, TerceroService, InventarioService],
})
export class BodegaComponent {
  //Variables
  loading = true;
  visible = false;
  visibleTipoBodega = false;

  //Objetos
  bodegas: Bodega[] = [];
  tipoBodegas: TipoBodega[] = [];
  bodegaForm!: FormGroup;
  tipoBodegaForm!: FormGroup;
  terceros: Tercero[] = [];
  estados: Object[] = [{ estado: 'Activo' }, { estado: 'Inactivo' }];
  mainColumns: { field: string; header: string }[] = [
    { field: 'nombre', header: 'Nombre' },
    { field: 'descrip', header: 'Descripción' },
    { field: 'telefono', header: 'Telefono' },
    { field: 'ubicacion', header: 'Ubicación' },
    { field: 'responsable', header: 'Responsable' },
    { field: 'tipoBodega', header: 'Tipo de Bodega' },
    {field: 'estado', header: 'Estado'},
  ];
  optionalColumns: { field: string; header: string }[] = [
    {field: 'capacidadMaxima', header: 'Capacidad Máxima'},
    {field: 'fechaCreacion', header: 'Fecha de Creación'},
    {field: 'fechaActualizacion', header: 'Fecha de Actualización'},
    { field: 'emailContacto', header: 'Email' },
  ];
  mainColumnsTipoBodega: { field: string; header: string }[] = [
    { field: 'tipoBodId', header: 'ID' },
    { field: 'nombre', header: 'Nombre' },
    { field: 'descripcion', header: 'Descripción' },
  ];
  fieldsFilterTipoBodega: string[] = ['tipoBodId', 'nombre', 'descripcion'];
  fieldsFilter: string[] = ['id', 'nombre', 'descrip'];

  // Servicios
  private _bodegaService = inject(BodegaService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);
  private form = inject(FormBuilder);
  private _terceroService = inject(TerceroService);
  private _inventarioService = inject(InventarioService);

  constructor() {
    this.bodegaForm = this.form.group({
      id: [''],
      nombre: [''],
      descripcion: [''],
      telefono: [''],
      ubicacion: [''],
      responsable: [''],
      capacidadMaxima: [0],
      estado: [''],
      fechaCreacion: [''],
      fechaActualizacion: [''],
      emailContacto: [''],
      tipoBodega: [''],
    });

    this.tipoBodegaForm = this.form.group({
      id: [''],
      nombre: [''],
      descripcion: [''],
      fechaCreacion: [''],
      bodega: [''],
    });
  }

  ngOnInit(): void {

    forkJoin([this.cargarBodegas(), this.cargarTiposBodegas(), this.cargarTerceros()]).subscribe(
      {
        next: () => {console.log('todos los datos han sido cargados')
         this.loading = false; },
        error: () => { this.loading = false; }
      }
    );
  }

  cargarBodegas() {
    this._bodegaService.obtenerBodegas()
    .pipe(
      finalize(() => {
        this.loading = false;
      })
    )
    .subscribe(
      (res) => {
        this.bodegas = res;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  cargarTiposBodegas() {
    this._inventarioService.obtenerTipoBodegas()
    .pipe(
      finalize(() => {
        this.loading = false;
      })
    )
    .subscribe(
      (res) => {
        this.tipoBodegas = res;
        console.log(res);
        
      },
      (error) => {
        console.error(error);
      }
    );
  }

  cargarTerceros() {
    this._terceroService.obtenerClientes().subscribe(
      (res) => {
        this.terceros = res;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  abrirModalGuardarBodega() {
    this.bodegaForm.reset();
    this.visible = true;
  }

  eliminarBodega(bodega: Bodega) {
    this.confirmationService.confirm({
      message:
        '¿Estás seguro de que deseas eliminar esta bodega? Esta acción no se puede deshacer.',
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Eliminar',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',
      accept: () => {
        this.loading = true;
        this._bodegaService
          .eliminarBodega(bodega.bodId)
          .pipe(
            finalize(() => {
              this.loading = false;
            })
          )
          .subscribe(
            (res) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Bodega Eliminada',
                detail: 'La bodega ha sido eliminada correctamente',
              });
              this.bodegas = this.bodegas.filter(
                (val) => val.bodId !== bodega.bodId
              );
            },
            (error) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Bodega No Eliminada',
                detail: error.error.message
                  ? error.error.message
                  : 'Hubo un error al eliminar la bodega',
              });
              console.log(error);
            }
          );
      },
    });
  }

  guardarBodega() {
    this.visible = false;
    this.loading = true;
    console.log(this.bodegaForm.value);
    
    if (this.bodegaForm.get('nombre')?.value === '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El campo Nombre es obligatorio',
      });
      this.bodegaForm.get('nombre')?.setErrors({ required: true });
      return;
    }
    if (this.bodegaForm.get('descrip')?.value === '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El campo Descripción es obligatorio',
      });
      this.bodegaForm.get('descrip')?.setErrors({ required: true });
      return;
    }

    this._inventarioService
      .guardarBodega(this.bodegaForm.value)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(
        (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Bodega Guardada',
            detail: 'La bodega ha sido guardada correctamente',
          });
          this.bodegas = [...this.bodegas, res];
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Bodega No Guardada',
            detail: error.error.message
              ? error.error.message
              : 'Hubo un error al guardar la bodega',
          });
        }
      );
  }

  guardarTipoBodega() {
    this.visibleTipoBodega = false;
    this.loading = true;
    console.log(this.tipoBodegaForm.value);
    
    if (this.tipoBodegaForm.get('nombre')?.value === '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El campo Nombre es obligatorio',
      });
      this.tipoBodegaForm.get('nombre')?.setErrors({ required: true });
      return;
    }
    if (this.tipoBodegaForm.get('descrip')?.value === '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El campo Descripción es obligatorio',
      });
      this.tipoBodegaForm.get('descrip')?.setErrors({ required: true });
      return;
    }
  }
}
