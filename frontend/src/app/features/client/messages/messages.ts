import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-reservaciones',
  standalone: true,
  imports: [FormsModule],
  templateUrl: 'messages.html',
})
export class Messages {

  messages = [
    { sender: 'Admin', text: 'Tu reservación fue confirmada.' },
    { sender: 'Cliente', text: 'Muchas gracias.' }
  ];

  newMessage = '';

}