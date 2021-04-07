import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-items",
  templateUrl: "./items.component.html",
  styleUrls: ["./items.component.css"],
})
export class ItemsComponent implements OnInit {
  constructor() {}
  @Output() Items: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  ngOnInit(): void {}
}
