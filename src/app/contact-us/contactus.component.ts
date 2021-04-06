import { Component, OnInit } from "@angular/core";
import { ShareServices } from "../app.services";

@Component({
  selector: "contact-us",
  templateUrl: "./contactus.component.html",
  styleUrls: ["./contactus.component.css"],
})
export class ContactUsComponent implements OnInit {
 
  constructor(
    private sharedService: ShareServices
  ) {
  }
  ngOnInit(): void {
  

  }

 
}
