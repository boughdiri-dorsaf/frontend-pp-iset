import  swal  from 'sweetalert';
import { CursusService } from './../../services/cursus.service';
import { etudiant, EtudiantService } from './../../services/etudiant.service';
import { DepartementService } from './../../services/departement.service';
import { EtablissementService } from './../../services/etablissement.service';
import { Component, OnInit } from '@angular/core';
import * as villes from '../../../assets/ville.json'
import { Subscription } from 'rxjs';
import { cursus } from '../../services/cursus.service';
import { ParametresService } from '../../services/parametres.service';

@Component({
  selector: 'app-cursus',
  templateUrl: './cursus.component.html',
  styleUrls: ['./cursus.component.scss']
})
export class CursusComponent implements OnInit {
specialite='1'
Niveau='1';
lstetab=[]
lstdep=[];
exist=false;
lstvilles=[];
lstclasses=[]
E:etudiant={id_situation_etudiant:'',id_departement:0,id_user:0}
C:cursus={id_etudiant:0,id_etablissement:0,id_domaine:0,id_niveau:0,
  id_specialite:0,moyenne:0,credit:0,note_pfe:null,mention:'',au_debut:'',session:'',au_fin:''}
switch=true;
lstdomaine=[]
lstspecialite=[]
lstspecialite2=[];
lstsituations=[];
idetudiant;
lstNiveau=[]
lstAUfin=[{id:1,nom:"2018"},{id:2,nom:"2019"},{id:3,nom:"2020"},{id:4,nom:"2021"},{id:5,nom:"2022"},{id:6,nom:"2023"}]
lstAUdeb=[{id:1,nom:"2018"},{id:2,nom:"2019"},{id:3,nom:"2020"},{id:4,nom:"2021"},{id:5,nom:"2022"},{id:6,nom:"2023"}]
lstcursus:cursus[]=[]
id;sub:Subscription;
sub2:Subscription
  constructor(private CS:CursusService,private PS:ParametresService,private ES:EtablissementService,private DS:DepartementService,private Etudiant:EtudiantService) { }

  ngOnInit() {
 this.sub2=   this.CS.getCursus(Number(localStorage.getItem('id'))).subscribe(val=>{
   console.log(val)
      //@ts-ignore
      for (let i = 0; i < val.results.length; i++) {
        //@ts-ignore
       this.lstcursus.push(val.results[i])
        
      } 
      console.log(this.lstcursus);
      
    })
    this.Etudiant.GetLstSituations().subscribe(val=>{
      console.log("Situations",val)
      //@ts-ignore
      this.lstsituations=val.results;
    })
    this.PS.getDomains().subscribe(val=>{
      console.log("Domaine",val);
      //@ts-ignore
      for (let i = 0; i < val.results.length; i++) {
      //@ts-ignore
       this.lstdomaine.push(val.results[i]); 
      }
      });
      this.PS.getSpecialites().subscribe(val=>{
        console.log("Specialite",val);
        //@ts-ignore
      for (let i = 0; i < val.results.length; i++) {
        //@ts-ignore
        this.lstspecialite2.push(val.results[i]); 
        }
      });
      this.PS.getclasses().subscribe(val=>{
        console.log("Classes",val);
        //@ts-ignore
        for (let i = 0; i < val.results.length; i++) {
        //@ts-ignore
         this.lstclasses.push(val.results[i]); 
        }
              });
      this.PS.getNiveaux().subscribe(val=>{
        console.log("Niveau",val);
        //@ts-ignore
     for (let i = 0; i < val.results.length; i++) {
      //@ts-ignore
       this.lstNiveau.push(val.results[i]) 
      }
     
     })
    this.id=Number(localStorage.getItem('id'));
    this.E.id_user=this.id
    this.sub=this.Etudiant.getetudiant(Number(localStorage.getItem('id'))).subscribe(
      res=>{
       
        console.log(res);
        //@ts-ignore 
        if(res.results.length==0){
        this.exist=true;
       
        
       
        return
        }else{
          console.log(res);
          //@ts-ignore
          this.idetudiant=res.results[0].id_etudiant;
        }
        //@ts-ignore
        this.E={id_departement:res.results[0].id_departement,id_user:res.results[0].id_user,id_situation_etudiant:res.results[0].id_situation_etudiant}
      },
      err=>{
        if(err.ok==false){
          this.exist=true;
        }
      console.log(err);
      }
    )
// this.lstcursus=JSON.parse(localStorage.getItem('lstcursus'))
    //@ts-ignore

    this.lstvilles=villes.default;
   
    this.ES.getetablissements().subscribe(val=>{
      console.log("etab",val);
      //@ts-ignore
      for (let i = 0; i < val.results.length; i++) {
        //@ts-ignore
        this.lstetab.push(val.results[i]);
        
      }
      
    
    })
    this.DS.getDepartements().subscribe(val=>{
      console.log("departement",val);
      //@ts-ignore
      for (let i = 0; i < val.results.length; i++) {
        //@ts-ignore
        this.lstdep.push(val.results[i]);
        
      }
    })
 
  }
  refresh2(){
this.sub2.unsubscribe();
this.lstcursus=[];
this.sub2=this.CS.getCursus(Number(localStorage.getItem('id'))).subscribe(val=>{
  //@ts-ignore
  for (let i = 0; i < val.results.length; i++) {
    //@ts-ignore
   this.lstcursus.push(val.results[i])
    
  }
  console.log(this.lstcursus);
  
})
  }
getspecialties(id){
  this.lstspecialite=[]
  this.PS.getSpecialites().subscribe(val=>{
    console.log(val)
    //@ts-ignore
 for (let i = 0; i < val.results.length; i++) {
  //@ts-ignore
   if(val.results[i].id_domaine==id)
  {
     //@ts-ignore
   this.lstspecialite.push(val.results[i]) 
   }
  }

 })
}
  refresh(){
this.sub.unsubscribe();
this.sub=this.Etudiant.getetudiant(Number(localStorage.getItem('id'))).subscribe(
  res=>{
   
    //@ts-ignore
    if(res.data[0]==undefined){
    this.exist=true;
    //@ts-ignore
   
    }
    
  },
  err=>{
   
  }
)
  }
  ajouteretudiant(){
  
    this.Etudiant.AddEtudiant(this.E).subscribe(()=>{
      this.exist=false;
      this.refresh();
    });
  }
  getetablissement(index){
    for (let i = 0; i < this.lstetab.length; i++) {
      if(this.lstetab[i].id_etablissement==index){
        return this.lstetab[i].libelle
      }
       
    }
  }
  getdomaine(index){
   
    for (let i = 0; i < this.lstdomaine.length; i++) {
      if(this.lstdomaine[i].id_domaine==index){
        return this.lstdomaine[i].libelle
      }
      
    }
  }
  getspecialite(index){
    for (let i = 0; i < this.lstspecialite2.length; i++) {
      if(this.lstspecialite2[i].id_specialite==index){
        return this.lstspecialite2[i].libelles
      }
      
    }
  }
  getniveau(index){
  
    for (let i = 0; i < this.lstNiveau.length; i++) {
      if(this.lstNiveau[i].id_niveau==index){
        return this.lstNiveau[i].libelle
      }
      
    }
  }
  getAUfin(index){
    for (let i = 0; i < this.lstAUdeb.length; i++) {
      if(this.lstAUdeb[i].id==index){
        return this.lstAUdeb[i].nom
      }
      
    }
  }
  getAUdeb(index){
    for (let i = 0; i < this.lstAUfin.length; i++) {
      if(this.lstAUfin[i].id==index){
        return this.lstAUfin[i].nom
      }
      
    }
  }

  AjouterCursus(){
  
    this.C.id_etablissement=Number(this.C.id_etablissement)
    this.C.id_domaine=Number(this.C.id_domaine)
    this.C.id_niveau=Number(this.C.id_niveau)
    this.C.id_specialite=Number(this.C.id_specialite)
    this.C.moyenne=Number(this.C.moyenne)
    this.C.id_etudiant=this.idetudiant;
    if(this.lstcursus==null){
      this.lstcursus=new  Array();
    }
    this.CS.addCursus(this.C);
    this.lstcursus.push(this.C);

  localStorage.setItem('lstcursus',JSON.stringify(this.lstcursus));
  this.switch=true;

  }
  supprimercursus(id){
    swal({
      title: "Cursus",
      text: "Voulez vous Vraiment Supprimer ce Cursus  ?",
      icon: "warning",
      buttons: ["Non", "Oui"],
      dangerMode: false,
    })
    .then((willDelete) => {
      if (willDelete) {
        this.CS.deleteCursus(id);
        setTimeout(()=>{
          this.refresh2();
        },800);
      }
    }); 
    
  }

}
