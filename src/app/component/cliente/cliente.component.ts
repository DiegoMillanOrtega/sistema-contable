import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Subscription } from 'rxjs';
import { OpenModalClienteService } from './open-modal-cliente.service';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent {
  isModalVisible = false;
  private modalSubscription!: Subscription;

  constructor(private modalService: OpenModalClienteService) {}

  ngOnInit() {
    // Escucha los cambios en el estado del modal
    this.modalSubscription = this.modalService.isModalOpen$.subscribe(isOpen => {
      this.isModalVisible = isOpen;
    });
  }

  closeModal() {
    this.modalService.toggleModal(false); // Cierra el modal
  }

  ngOnDestroy() {
    if (this.modalSubscription) {
      this.modalSubscription.unsubscribe(); // Evita fugas de memoria
    }
  }

}
