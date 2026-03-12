import { Component } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [NgIf],
  templateUrl: './payments.html'
})
export class Payments {

  receipts = [
    { date: '2026-03-01', amount: 1500 },
    { date: '2026-03-05', amount: 2000 }
  ];

  showUploadModal: boolean = false;

  openUploadModal() {
    this.showUploadModal = true;
  }

  closeUploadModal() {
    this.showUploadModal = false;
  }

}