import  swal  from 'sweetalert';
import { EtablissementService,establishment } from './../../services/etablissement.service';
import * as ville from '../../../assets/ville.json'
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-establishements',
  templateUrl: './establishements.component.html',
  styleUrls: ['./establishements.component.scss']
})
export class EstablishementsComponent implements OnInit {
  tabestablishement=false;
  formestablishment=true;
  lstville=[];
  E:establishment={libelle:'',rue:'',pays:'',ville:'',gouvernorat_adresse:'',code_postale:''}
  constructor(private US:UserService,private ES:EtablissementService) { }
  lstestablishment:establishment[]=[];
  ngOnInit() {
    //@ts-ignore
    console.log(ville.default)
    //@ts-ignore
    this.lstville=ville.default
    this.US.getUser(Number(localStorage.getItem('id')),(localStorage.getItem('token'))).subscribe(val=>{
      console.log(val);
      //@ts-ignore
      this.user=val.rows[0];
    })
   
    this.ES.getetablissements().subscribe(val=>{
 console.log(val); 
 var lst=[]
   //@ts-ignore
   for (let i = 0; i < val.results.length; i++) {
    //@ts-ignore
     lst.push(val.results[i]);
     
   }
   this.lstestablishment=lst;
    });
  }
  AjouterEstablishement(){
    if(this.E.libelle==''){
      swal('Erreur',"Veuillez introduire le libelle du l'etablissement",'error');
       }
       else if(this.E.pays==''){
        swal('Erreur',"Veuillez introduire le Pays du l'etablissement",'error');
       }
       else if(this.E.gouvernorat_adresse==''){
        swal('Erreur',"Veuillez introduire le Gouvernorat du l'etablissement",'error');
       }
       else if(this.E.ville==''){
        swal('Erreur',"Veuillez introduire le Ville du l'etablissement",'error');
       }
       else if(this.E.rue==''){
        swal('Erreur',"Veuillez introduire la Rue du l'etablissement",'error');
       }
       else{
        swal('Etablissement','Etablissement Ajouté avec succée','success');
        this.tabestablishement=false;
        this.formestablishment=true
        this.ES.ajouteretablissement(this.E).subscribe(val=>{
          this.E={libelle:'',rue:'',pays:'',ville:'',gouvernorat_adresse:'',code_postale:''}
         });
       }

    
   
  }
}
