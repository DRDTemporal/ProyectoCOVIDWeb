import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {
  personaslist: AngularFireList<any>;
  constructor(private angFirebase: AngularFireDatabase) { }

  getPersonas() {
    return this.personaslist = this.angFirebase.list('persona');
  }
}
