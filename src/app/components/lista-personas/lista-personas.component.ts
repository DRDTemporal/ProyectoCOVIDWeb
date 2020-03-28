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
  public dataPersonas: Persona[] = [];
  private dataSource = new MatTableDataSource<Persona>(this.dataPersonas);
  constructor( ) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  ngOnInit() {
    this.dataSource = new MatTableDataSource<Persona>(this.dataPersonas);
    this.dataSource.sort = this.sort;
  }


}
