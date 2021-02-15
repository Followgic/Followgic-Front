import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { EventoService } from 'src/app/services/evento.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';

@Component({
  selector: 'app-ver-evento',
  templateUrl: './ver-evento.component.html',
  styleUrls: ['./ver-evento.component.css']
})
export class VerEventoComponent implements OnInit {
  evento: any
  personasInscritas: any
  mostrarHora = true;


  constructor(private eventoService: EventoService, private utilidadesService: UtilidadesService) {
    this.personasInscritas = 10
    this.evento = {
      titulo: 'Quedada para cartomagos en la estación de Málaga ',
      tipo: 1,
      descripcion: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,',
      fecha_creacion: '14/02/2021',
      fecha_evento: '14/02/2021',
      fecha_prueba: new Date(),
      hora_evento: '17:00',
      aforo: 50,
      link_conferencia: 'http://follogic.com',
      foto: 'http://localhost:8000/carga/imagenes/Ejemplo_3_kXVl2AL.jpg',
      modalidades: ['cartomagia', 'magia de cerca'],
      privacidad: 0
    }
    this.eventoService.idEvento$.subscribe(res => {
      this.getEventoId(res)
    })
  }

  ngOnInit(): void {

  }

  getEventoId(idEvento) {
    this.eventoService.getEventoPorId(idEvento).subscribe(res => {
      this.evento = res
    })

  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.evento.modalidades, event.previousIndex, event.currentIndex);
  }

  cambioDeDia(event) {
    console.log(event)
    if (this.utilidadesService.getFechaStr(event) != this.evento.fecha_evento) {
      this.mostrarHora = false
    } else {
      this.mostrarHora = true
    }

  }


  }
