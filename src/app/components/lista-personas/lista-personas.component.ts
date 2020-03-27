import { Constants } from './../../shared/models/constants';
import { PersonasService } from './../../services/personas.service';
import { Persona } from './../../shared/models/persona';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-lista-personas',
  templateUrl: './lista-personas.component.html',
  styleUrls: ['./lista-personas.component.css']
})
export class ListaPersonasComponent implements OnInit {
  displayedColumns: string[] = Constants.columns;
  dataPersonas: Persona[] = [];
  dataSource = new MatTableDataSource<Persona>(this.dataPersonas);
  constructor(private personasServices: PersonasService, private angFireAuth: AngularFireAuth, ) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  ngOnInit() {
    try {
      this.getDataPersonas();
    } catch (error) {
    }
    this.dataSource.sort = this.sort;
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
                fachaDatos: x.fachaDatos,
                caso: x.caso,
              };
              this.dataPersonas.push(tmpPersona);
              this.dataSource = new MatTableDataSource<Persona>(this.dataPersonas);
            } catch (error) {}
          });
        }
      );
    });
  }

}
