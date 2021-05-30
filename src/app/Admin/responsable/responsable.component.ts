import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../services/user.service';
import * as data from '../../../assets/ville.json';
import { ParametresService } from '../../services/parametres.service';
@Component({
  selector: 'app-responsable',
  templateUrl: './responsable.component.html',
  styleUrls: ['./responsable.component.scss']
})
export class ResponsableComponent implements OnInit {
tableresponsable=false;
ajoutresponsable=true;
D={libelle:'',
  id_responsable_group:0,
  nb_etudiant:0}
//@ts-ignore
U:User={nom:'',prenom:'',rue:'',gouvernorat_adresse:'',ville:''
,password:'',pays:'',id_role:4,age:0,code_postale:"",sexe:'',num_passport:'',cin:'',email:'',date_naissance:''};
Qualite='';
constructor(private US:UserService,private PS:ParametresService,public modal: NgbModal) { }
lstville=[];
lstres=[];
  ngOnInit() {
    this.US.GetResponable().subscribe(val=>{
        //@ts-ignore
        this.lstres=val.results
    })

    //@ts-ignore
  this.lstville=data.default;
  }
  ajouterClasse(){
    this.PS.ajouterClasse(this.D);
  }
  ajouterresponsable(){
    this.US.AjouterResponable(this.U,this.Qualite)
 this.tableresponsable=false;
this.ajoutresponsable=true;
this.U={nom:'',prenom:'',rue:'',gouvernorat_adresse:'',ville:''
,password:'',pays:'',id_role:4,age:0,code_postale:"",sexe:'',num_passport:'',cin:'',email:'',date_naissance:'', gouvern_naissance: 'jkhjh'};
this.Qualite='';
}
open(content) {
  this.modal.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

  }, (reason) => {

  });
}
}
