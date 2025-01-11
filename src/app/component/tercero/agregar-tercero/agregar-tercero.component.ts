import { Component, inject, OnInit } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';
import { forkJoin, last, map, Observable, tap } from 'rxjs';
import { Toast, ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { SelectButtonModule } from 'primeng/selectbutton';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';

import { error, log } from 'console';
import { TerceroService } from '../../../service/tercero.service';
import { ESTADOS_CIVILES, GENEROS, ROL_OPERACION, SUBTIPOS_PERSONA, TIPOS_DE_DOCUMENTO, TIPOS_TERCEROS } from '../../../constants/constants';
import { TablasSistemaService } from '../../../service/tablas-sistema.service';
import { RolOperacion, SubTipoTerceros, TipoDocumento, TipoTercero } from '../../../interface/tablas-sistema.interface';
import { TerceroDetalleRequest } from '../../../interface/request/tercero-detalle.request';
import { ClasificacionesFiscales, Terceros } from '../../../interface/tercero.interface';


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
    SelectButtonModule,
    RadioButtonModule,
    FormsModule,
    CalendarModule,
    CheckboxModule,
    InputTextareaModule,
    MultiSelectModule
    
  ],
  templateUrl: './agregar-tercero.component.html',
  styleUrl: './agregar-tercero.component.css',
  providers: [TerceroService, MessageService, TablasSistemaService],
})
export class AgregarTerceroComponent implements OnInit{

  // Variables
  tiposDeDocumento: TipoDocumento[] = [];
  tiposTerceros: TipoTercero[] = [];
  subtiposPersona: SubTipoTerceros[] = [];
  rolOperacion: RolOperacion[] = [];
  clasificacionesFiscales: ClasificacionesFiscales[] = [];
  
  generos = GENEROS;
  estadosCiviles = ESTADOS_CIVILES;
  


  formTercero!: FormGroup;
  tipoPersona!: string;
  vista: string = 'IB';
  

  // Arrays
  subtiposPersonaFiltrados: SubTipoTerceros[] = [];

  stateOptions: any[] = [
    { label: 'Información Básica', value: 'IB' },
    { label: 'Información de Contacto', value: 'IC' },
    { label: 'Información Financiera', value: 'IF' },
    { label: 'Clasificacion del Tercero', value: 'CT' },
  ];

  

  value: string = 'IB';

  // Servicios
  private _clienteService = inject(TerceroService);
  private messageService = inject(MessageService);
  private _terceroCliente = inject(TerceroService);
  private _tablasSistema = inject(TablasSistemaService);

  constructor(private _form: FormBuilder) {
    this.formTercero = _form.group({
      tercero_id: [''],
      numeroDocumento: ['', [Validators.minLength(8), Validators.maxLength(10),Validators.pattern('^[0-9-]*$')]],
      tipoDocumento: [''],
      name: [''],
      lastName: [''],
      phoneNumber: [''],
      direccion: [''],
      email: [''],
      ciudad: [''],
      pais: [''],
      fechaNacimiento: [''],
      tipoTercero: [''],
      razonSocial: new FormControl({value: '', disabled: true}),
      genero: [''],
      estadoCivil: [''],
      departamento: [''],
      codigoPostal: [''],
      rolOperaciones: [],
      subTipoTercero: [''],
      clasificacionesFiscales: [],
      observaciones: [''],
    });
  }

  ngOnInit(): void {

    this.cargarTablasSistema().subscribe(() => {
      const tercero: Terceros = history.state.tercero;
      
  
      if (tercero) { //Tercero que llega para editar
  
        //Garantizamos la misma referencia en memoria de tipoTercero
        const tipoTerceroSeleccionado: TipoTercero | undefined = this.tiposTerceros.find(
          (t) => t.tipoTerceroId === tercero.tipoTercero.tipoTerceroId
        );

        
  
        console.log(tipoTerceroSeleccionado);
        
  
        if (tercero.tipoTercero.codigo === 'PJ') {
          this.formTercero.get('razonSocial')?.enable(); 
        }
  
      this.formTercero.patchValue({
          ...tercero,
          tipoTercero: tipoTerceroSeleccionado,
        });
      }

      //Para escuchar cuando cambie el tipo de tercero
      this.formTercero.get('tipoTercero')?.valueChanges.subscribe((tipoPersonaValue: TipoTercero) => {
        const razonSocialControl = this.formTercero.get('razonSocial');
        
        if (tipoPersonaValue.codigo !== 'PJ') {
          razonSocialControl?.disable();
        } else {
          razonSocialControl?.enable();
        }
        
        this.filtrarSubtiposPersona(tipoPersonaValue);
      });


      this.filtrarSubtiposPersona(this.formTercero.get('tipoTercero')?.value);
    });


    

  }

  guardarTercero() {

    let tercero: Terceros = this.formTercero.value;
    
    console.log(tercero);
    
    if (!this.validarCampos()) {
      return;
    }

    //Conexion con la api
    this._clienteService.guardarCliente(this.formTercero.value)
    .subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Cliente Guardado',
          detail: 'El cliente ha sido guardado correctamente',
        });
        this.formTercero.reset();
      },
      error: (error) => {
        if (error.status === 409) {
          this.formTercero.get('nit')?.setErrors({ conflict: true });
          this.formTercero.get('tipoDocumento')?.setErrors({ conflict: true });
        }
      }
    });
  }

  formatearFechaISO(fecha: string) {
    const fechaSplit = fecha.split('T')[0];
    const [year, month, day] = fechaSplit.split('-');
    return `${day}/${month}/${year}`;
  }

  formatearFecha(fecha: string):string {
    const fechaFormateada = new Date(fecha);

    const fechaSplit = fechaFormateada.toISOString().split('T')[0];
    const [year, month, day] = fechaSplit.split('-');
    return `${year}/${month}/${day}`;
  }

  validarFecha(fecha: string): boolean {
    const format = this.formatearFecha(fecha);
    const year = Number(format.split('/')[0]) 
    const month = Number(format.split('/')[1]);
    const day = Number(format.split('/')[2]);
    const date = new Date(year, month - 1, day);

    if (date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day) {
      this.formTercero.get('fechaNacimiento')?.setValue(format);
      return true;
    }
    else {return false;}
  }

  validarCampos(): boolean {
    let valid = true;

    // if (this.formTercero.get('fechaNacimiento')?.value !== '') {
    //   if (!this.validarFecha(this.formTercero.get('fechaNacimiento')?.value)) {
    //     this.messageService.add({
    //       severity: 'error',
    //       summary: 'Error',
    //       detail: 'La fecha de nacimiento no es válida',
    //     });
  
    //     this.formTercero.get('fechaNacimiento')?.setErrors({ required: true });
    //     valid = false;
    //   }
    // }


    if (this.formTercero.get('nit')?.value === '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El campo NIT es obligatorio',
      });

      this.formTercero.get('nit')?.setErrors({ required: true });
      valid = false;
    }

    if (this.formTercero.get('tipoDocumento')?.value === '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El campo Tipo de Documento es obligatorio',
      });

      this.formTercero.get('tipoDocumento')?.setErrors({ required: true });
      valid = false;
    }

    if (this.formTercero.get('name')?.value === '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El campo Nombre es obligatorio',
      });

      this.formTercero.get('name')?.setErrors({ required: true });
      valid = false;
    }


    if (this.formTercero.get('tipoPersona')?.value === 'PJ' && this.formTercero.get('razonSocial')?.value === '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El campo Razón Social es obligatorio',
      });

      this.formTercero.get('razonSocial')?.setErrors({ required: true });
      valid = false;
    }

    if (this.formTercero.get('tipoPersona')?.value !== 'PN' && this.formTercero.get('phoneNumber')?.value === '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El campo Teléfono es obligatorio',
      });

      this.formTercero.get('phoneNumber')?.setErrors({ required: true });
      valid = false;
    }

    if (this.formTercero.get('tipoPersona')?.value !== 'PN' && this.formTercero.get('direccion')?.value === '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El campo Dirección es obligatorio',
      });

      this.formTercero.get('direccion')?.setErrors({ required: true });
      valid = false;
    }

    if (this.formTercero.get('subTipoTercero')?.value === '' ) {
      this.formTercero.get('subTipoTercero')?.setValue(null);
    }

    return valid;
  }

  filtrarSubtiposPersona(tipoPersona: TipoTercero) {
    
    console.log('sub tipo tercero:', this.subtiposPersona);
    console.log(tipoPersona);
    
    
    
    this.subtiposPersonaFiltrados = this.subtiposPersona.filter(
      (subtipo) => subtipo.tipoTercero.tipoTerceroId === tipoPersona.tipoTerceroId
    );
  }
  

  cargarTablasSistema(): Observable<void> {
    return forkJoin([
      this._tablasSistema.obtenerTipoDocumento(),
      this._tablasSistema.obtenerTipoTercero(),
      this._tablasSistema.obtenerSubTipoTercero(),
      this._tablasSistema.obtenerRolOperacion(),
      this._tablasSistema.obtenerClasificacionFiscal(),
    ]).pipe(
      tap((res) => {
        this.tiposDeDocumento = res[0];
        this.tiposTerceros = res[1];
        this.subtiposPersona = res[2];
        this.rolOperacion = res[3];
        this.clasificacionesFiscales = res[4];
      }),
      map(() => void 0)
    );
  }
}
