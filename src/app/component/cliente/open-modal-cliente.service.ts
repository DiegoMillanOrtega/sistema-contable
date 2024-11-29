import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpenModalClienteService {
  // Mantiene el estado del modal
  private isModalOpen = new BehaviorSubject<boolean>(false);
  isModalOpen$ = this.isModalOpen.asObservable();

  // Método para abrir o cerrar el modal
  toggleModal(isOpen: boolean) {
    this.isModalOpen.next(isOpen);
    console.log('holaaa');
    
  }
}
