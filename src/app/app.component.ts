import { Component, OnInit } from '@angular/core';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { ShareServices } from './app.services';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'LogisticxNew';
  slides = [
    { image: 'https://gsr.dev/material2-carousel/assets/demo.png' },
    { image: 'https://gsr.dev/material2-carousel/assets/demo.png' },
    { image: 'https://gsr.dev/material2-carousel/assets/demo.png' },
    { image: 'https://gsr.dev/material2-carousel/assets/demo.png' },
    { image: 'https://gsr.dev/material2-carousel/assets/demo.png' }];
  employees = [];
  // tslint:disable-next-line:variable-name
  constructor(private _sharedService: ShareServices) { }
  // tslint:disable-next-line:typedef
  ngOnInit() {
    this._sharedService.getEmpl().subscribe(data => {
    //   debugger;
    // console.log("sa" + data);

      return this.employees = data;

    });

  }
}
