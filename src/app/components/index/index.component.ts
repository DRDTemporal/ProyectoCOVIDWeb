import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  cerrarSesion() {
    this.authService.SignOut();
  }

}
