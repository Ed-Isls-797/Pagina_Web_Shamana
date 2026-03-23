import { Component, OnInit, inject, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessagesService } from '../../../services/messages.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'admin-mensajes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-mensajes.html'
})
export class AdminMensajes implements OnInit, OnDestroy {

  solicitudes: any[] = [];
  mensajeSeleccionado: any = null;
  respuestaAdmin: string = '';
  
  private messagesService = inject(MessagesService);
  private userService = inject(UserService);
  private cdr = inject(ChangeDetectorRef);

  chatsPorUsuario: any = {};
  usuarios: any[] = [];
  intervalId: any;

  ngOnInit() {
    this.cargarDatos();
    // Polling cada 5 segundos
    this.intervalId = setInterval(() => {
      this.cargarDatos(true); // true para indicar que es actualización silenciosa
    }, 5000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  cargarDatos(silent: boolean = false) {
    this.messagesService.getMensajes().subscribe((mensajes: any[]) => {
      // Agrupar mensajes por usuario_id
      this.chatsPorUsuario = {};
      mensajes.forEach(msg => {
        if (!this.chatsPorUsuario[msg.usuario_id]) this.chatsPorUsuario[msg.usuario_id] = [];
        this.chatsPorUsuario[msg.usuario_id].push(msg);
      });
      
      // Obtener usuarios para mostrar nombre/email
      this.userService.getUsuarios().subscribe(users => {
        this.usuarios = users;
        
        const nuevasSolicitudes = Object.keys(this.chatsPorUsuario).map(usuario_id => {
          const user = this.usuarios.find(u => u._id === usuario_id) || {};
          const conversacion = (this.chatsPorUsuario[usuario_id] || []).map((m: any) => ({
            emisor: m.sender || 'client',
            texto: m.contenido,
            tiempo: new Date(m.fecha).toLocaleString()
          }));
          
          // Usar estado_chat del usuario, por defecto 'Pendiente'
          const estado = user.estado_chat || 'Pendiente';

          return {
            id: usuario_id,
            cliente: user.nombre_completo || 'Usuario',
            email: user.email || '',
            estado: estado,
            asunto: 'Chat General',
            conversacion
          };
        });

        // Actualizar lista de solicitudes
        this.solicitudes = nuevasSolicitudes;

        // Si hay uno seleccionado, actualizar su conversación y estado
        if (this.mensajeSeleccionado) {
          const actualizado = this.solicitudes.find(s => s.id === this.mensajeSeleccionado.id);
          if (actualizado) {
            this.mensajeSeleccionado.conversacion = actualizado.conversacion;
            this.mensajeSeleccionado.estado = actualizado.estado;
          }
        } else if (!silent && this.solicitudes.length > 0) {
           this.mensajeSeleccionado = this.solicitudes[0];
        }
        this.cdr.detectChanges();
      });
    });
  }

  seleccionarMensaje(solicitud: any) {
    this.mensajeSeleccionado = solicitud;
    this.respuestaAdmin = '';
  }

  enviarRespuesta() {
    if (this.respuestaAdmin.trim() === '' || !this.mensajeSeleccionado) return;
    const mensaje = {
      usuario_id: this.mensajeSeleccionado.id,
      sender: 'admin',
      contenido: this.respuestaAdmin,
      fecha: new Date().toISOString()
    };
    this.messagesService.createMensaje(mensaje).subscribe(() => {
      this.cargarDatos(true); 
    });
    this.respuestaAdmin = '';
  }

  aceptarSolicitud() {
    if (this.mensajeSeleccionado) {
      this.mensajeSeleccionado.estado = 'Aceptado';
      this.userService.updateUsuario(this.mensajeSeleccionado.id, { estado_chat: 'Aceptado' }).subscribe();
    }
  }

  rechazarSolicitud() {
    if (this.mensajeSeleccionado) {
      this.mensajeSeleccionado.estado = 'Rechazado';
      this.userService.updateUsuario(this.mensajeSeleccionado.id, { estado_chat: 'Rechazado' }).subscribe();
    }
  }
}