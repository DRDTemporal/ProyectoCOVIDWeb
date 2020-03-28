import { ExportarService } from './../../services/exportar.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ListaPersonasComponent } from '../lista-personas/lista-personas.component';
import { AngularFireAuth } from '@angular/fire/auth/auth';
import { Persona } from 'src/app/shared/models/persona';
import { PersonasService } from 'src/app/services/personas.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  dataPersonas: Persona[] = [];
  @ViewChild(ListaPersonasComponent, {static: false}) listaPersonas;
  constructor(private personasServices: PersonasService, private angFireAuth: AngularFireAuth,
              private authService: AuthService, private exportarService: ExportarService,  private snackBar: MatSnackBar) { }

  ngOnInit() {
    try {
      this.getDataPersonas();
    } catch (error) {
    }
  }

  getDataPersonas() {
    this.angFireAuth.authState.subscribe(user => {
      this.personasServices.getPersonas().snapshotChanges().subscribe(
        item => {
          this.dataPersonas = [];
          item.forEach(element => {
            try {
              const x: any = element.payload.toJSON();
              x.skey = element.key;
              const tmpPersona: Persona = {
                skey:  element.key,
                nombres: x.nombres,
                apellidos: x.apellidos,
                tipoID: x.tipoID,
                id: x.id,
                telefono: x.telefono,
                departamento: x.departamento,
                municipio: x.municipio,
                edad: x.edad,
                direccion: x.direccion,
                fechaDatos: x.fechaDatos,
                caso: x.caso,
                latitud: x.latitud,
                logitud: x.longitud,
              };
              this.dataPersonas.push(tmpPersona);
              this.listaPersonas.dataPersonas = this.dataPersonas;
            } catch (error) {}
          });
        }
      );
    });
  }

  exportar() {
    if (this.dataPersonas.length > 0) {
      const f = new Date();
      this.exportarService.exportAsExcelFile(this.dataPersonas, 'Datos Ruta Covid 19' + f);
    } else {
      this.snackBar.open('No se han cargado los datos.', 'Por favor espere.', {
        duration: 2000,
        panelClass: ['yellow-snackbar']
      });
    }
  }

  cerrarSesion() {
    this.authService.SignOut();
  }

}
