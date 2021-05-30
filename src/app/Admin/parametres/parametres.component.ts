import { Component, OnInit } from '@angular/core';
import { ParametresService } from '../../services/parametres.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.component.html',
  styleUrls: ['./parametres.component.scss']
})
export class ParametresComponent implements OnInit {
D={libelle:''}
S={libelle:'',id_domaine:1}
N={libelle:''}
lstdomains=[];
lstSpecialite=[];
lstniveau=[];
sub:Subscription;
sub2:Subscription;
sub3:Subscription;
  constructor(private PS:ParametresService,public modal: NgbModal) { }

  ngOnInit() {
 this.sub=this.PS.getDomains().subscribe(val=>{
   console.log("domain",val)
   //@ts-ignore
    this.lstdomains=val.results
   });
   this.sub2=this.PS.getSpecialites().subscribe(val=>{
    //@ts-ignore
     this.lstSpecialite=val.results
   })
   this.sub3=this.PS.getNiveaux().subscribe(val=>{
    //@ts-ignore
   this.lstniveau=val.results
 })
   
  }
  refresh(){
    this.lstdomains=[];
    this.lstSpecialite=[];
    this.lstniveau=[];
   setTimeout(()=>{
    this.sub.unsubscribe();
    this.sub=this.PS.getDomains().subscribe(val=>{
{
  //@ts-ignore
   this.lstdomains=val.results
  }
  });
this.sub2.unsubscribe();
  this.sub2=this.PS.getSpecialites().subscribe(val=>{
{
  //@ts-ignore
   this.lstSpecialite=val.results
  }
  console.log( this.lstSpecialite);
 })
 this.sub3.unsubscribe();
 this.sub3=this.PS.getNiveaux().subscribe(val=>{
    {
//@ts-ignore
 this.lstniveau=val.results
}
})
   },300)
  }
 ajouterDomaine(){
   this.PS.ajouterDomaine(this.D);
   this.D.libelle='';
   this.refresh();
 }
 ajouterNiveau(){
  this.PS.ajouterNiveau(this.N);
  this.N.libelle='';
  this.refresh();
}
 ajouterSpecialite(){
this.PS.ajouterSpecialite(this.S);
this.S.id_domaine=1;
this.S.libelle='';
this.refresh();
 }
 open(content) {
  this.modal.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  
  }, (reason) => {
   
  });
}
open2(content) {
  this.modal.open(content, {ariaLabelledBy: 'Specialité'}).result.then((result) => {
  
  }, (reason) => {
   
  });
}
open3(content) {
  this.modal.open(content, {ariaLabelledBy: 'Niveau'}).result.then((result) => {
  
  }, (reason) => {
   
  });
}
}
