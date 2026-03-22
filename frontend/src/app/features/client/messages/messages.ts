import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessagesService } from '../../../services/messages.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-client-messages',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './messages.html',
  styles: [`
    /* ============================================== */
    /* ESTILOS DE CHAT VIP CLIENTE (AZUL CYAN NEÓN)   */
    /* ============================================== */
    
    .chat-card {
      border: 1px solid #222;
      background-color: #0d0d0d;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    }
    
    /* Cabecera del chat */
    .chat-header {
      border-bottom: 1px solid #222;
      background-color: #0a0a0a;
    }
    .avatar-admin {
      width: 42px; height: 42px;
      background-color: rgba(13, 202, 240, 0.1);
      color: #0dcaf0;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-weight: bold; font-size: 1.1rem;
    }
    .status-dot {
      width: 8px; height: 8px;
      background-color: #00ff41; /* Verde neón para el "En línea" */
      border-radius: 50%;
      display: inline-block;
      box-shadow: 0 0 8px rgba(0, 255, 65, 0.5);
    }

    /* Cuerpo del chat */
    .chat-body {
      height: 60vh;
      overflow-y: auto;
      padding: 1.5rem;
      background-color: #050505;
    }
    
    /* Burbujas de mensaje */
    .msg-bubble {
      max-width: 75%;
      padding: 0.9rem 1.2rem;
      border-radius: 12px;
      margin-bottom: 0.2rem;
      font-size: 0.95rem;
      line-height: 1.4;
    }
    
    /* Mensaje del Administrador (Gris oscuro) */
    .msg-admin {
      background-color: #1a1a1a;
      color: #e0e0e0;
      border-bottom-left-radius: 2px;
      border: 1px solid #222;
    }
    
    /* Mensaje del Cliente (AZUL CYAN NEÓN) */
    .msg-client {
      background-color: #0dcaf0;
      color: #000;
      font-weight: 500;
      border-bottom-right-radius: 2px;
      box-shadow: 0 4px 15px rgba(13, 202, 240, 0.25);
    }
    
    .msg-time {
      font-size: 0.7rem;
      color: #6c757d;
      margin-bottom: 1.2rem;
    }

    /* Input y Botón de envío */
    .chat-footer {
      border-top: 1px solid #222;
      background-color: #0a0a0a;
      padding: 1rem;
    }
    .input-dark {
      background-color: #111;
      border: 1px solid #333;
      color: white;
      border-radius: 10px;
      padding: 0.9rem 1.2rem;
      transition: all 0.3s;
    }
    .input-dark:focus {
      border-color: #0dcaf0;
      box-shadow: 0 0 10px rgba(13, 202, 240, 0.15);
      outline: none;
    }
    .btn-send {
      background-color: #0dcaf0;
      color: #000;
      border: none;
      border-radius: 10px;
      width: 52px; height: 52px;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.3s;
    }
    .btn-send:hover {
      box-shadow: 0 0 15px rgba(13, 202, 240, 0.5);
      transform: scale(1.05);
    }

    .chat-body::-webkit-scrollbar { width: 6px; }
    .chat-body::-webkit-scrollbar-track { background: transparent; }
    .chat-body::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
    .chat-body::-webkit-scrollbar-thumb:hover { background: #0dcaf0; }
  `]
})
export class Messages implements OnInit {
  mensajes: any[] = [];
  nuevoMensaje = '';
  private messagesService = inject(MessagesService);
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);
  usuarioId = '';

  ngOnInit() {
    const session = this.authService.getSession();
    this.usuarioId = session?._id;
    if (this.usuarioId) {
      this.cargarMensajes();
      // Polling cada 3 segundos
      setInterval(() => {
        this.cargarMensajes();
      }, 3000);
    }
  }

  cargarMensajes() {
    if (!this.usuarioId) return;
    this.messagesService.getMensajesByUsuario(this.usuarioId).subscribe((data: any) => {
      this.mensajes = Array.isArray(data) ? data : [];
      this.cdr.detectChanges();
    });
  }

  enviarMensaje() {
    if (this.nuevoMensaje.trim() !== '' && this.usuarioId) {
      const mensaje = {
        usuario_id: this.usuarioId,
        sender: 'client',
        contenido: this.nuevoMensaje,
        fecha: new Date().toISOString()
      };
      this.messagesService.createMensaje(mensaje).subscribe(() => {
        this.cargarMensajes();
      });
      this.nuevoMensaje = '';
    }
  }
}