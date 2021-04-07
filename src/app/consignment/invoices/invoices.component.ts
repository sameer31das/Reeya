import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-invoices",
  templateUrl: "./invoices.component.html",
  styleUrls: ["./invoices.component.css"],
})
export class InvoicesComponent implements OnInit {
  constructor() {}
  @Output() Invoices: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  ngOnInit(): void {}
}
