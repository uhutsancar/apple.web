import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mac',
  standalone:true,
  imports:[RouterLink],
  templateUrl: './mac.component.html',
  styleUrls: ['./mac.component.css']
})
export class MacComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
