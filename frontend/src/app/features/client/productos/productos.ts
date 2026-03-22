import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos.html',
  styleUrls: ['./productos.css'] 
})
export class Productos {

  menuShamana = [
    {
      nombre: "Ron",
      items: [
        { nombre: "Bacardi Blanco", botella: { ml: 700, precio: 880 }, copeo: 88 },
        { nombre: "Capitan Morgan", botella: { ml: 700, precio: 990 }, copeo: 95 },
        { nombre: "Zacapa 23", botella: { ml: 750, precio: 2100 }, copeo: 210 }
      ]
    },
    {
      nombre: "Tequila",
      items: [
        { nombre: "Don Julio Reposado", botella: { ml: 700, precio: 1700 }, copeo: 170 },
        { nombre: "Don Julio 70", botella: { ml: 700, precio: 2400 }, copeo: 220 }
      ]
    },
    {
      nombre: "Vodka",
      items: [
        { nombre: "Smirnoff", botella: { ml: 750, precio: 880 }, copeo: 88 },
        { nombre: "Grey Goose", botella: { ml: 700, precio: 2035 }, copeo: 200 }
      ]
    },
    {
      nombre: "Whisky",
      items: [
        { nombre: "Black Label", botella: { ml: 750, precio: 1925 }, copeo: 192 },
        { nombre: "Blue Label", botella: { ml: 750, precio: 10900 } }
      ]
    }
  ];

  extrasMenu = [
    {
      nombre: "Coctelería",
      items: [
        { nombre: "Piña Colada", precio: 120 },
        { nombre: "Margarita", precio: 120 },
        { nombre: "Mojitos", precio: 120 },
        { nombre: "Aperol Spritz", precio: 160 }
      ]
    },
    {
      nombre: "Shots",
      items: [
        { nombre: "Revolver", precio: 300 },
        { nombre: "Lamborghini", precio: 300 }
      ]
    }
  ];

  servicios = [
    { nombre: 'Estacionamiento', icono: '🚗' },
    { nombre: 'Guardarropa', icono: '🧥' }
  ];

  mesas = [
    { id: 1, zona: 'General', estado: 'disponible' },
    { id: 2, zona: 'VIP', estado: 'ocupado' },
    { id: 3, zona: 'VIP', estado: 'disponible' },
    { id: 4, zona: 'Terraza', estado: 'disponible' },
    { id: 5, zona: 'General', estado: 'disponible' },
    { id: 6, zona: 'VIP', estado: 'ocupado' }
  ];

  mesaSeleccionada: any = null;

  seleccionarMesa(mesa: any) {
    if (mesa.estado === 'ocupado') return;
    this.mesaSeleccionada = mesa;
  }
}