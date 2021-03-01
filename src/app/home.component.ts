import { Component, OnInit } from '@angular/core';
import { ShareServices } from './app.services';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'LogisticxNew';
  slides = [
    { image: 'https://gsr.dev/material2-carousel/assets/demo.png' },
    { image: 'https://gsr.dev/material2-carousel/assets/demo.png' },
    { image: 'https://gsr.dev/material2-carousel/assets/demo.png' },
    { image: 'https://gsr.dev/material2-carousel/assets/demo.png' },
    { image: 'https://gsr.dev/material2-carousel/assets/demo.png' }];
  employees = [];
  constructor(private _sharedService: ShareServices) { }
  ngOnInit() {
    this._sharedService.getEmpl().subscribe(data => {
      debugger;
    console.log("sa" + data);

      return this.employees = data;

    });

  }
}
