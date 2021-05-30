import  swal  from 'sweetalert';
import { departement, DepartementService } from './../../services/departement.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  tabdepartment=false;
  formdepartment=true;
  constructor(private US:UserService,private DS:DepartementService) { }
  lstdepartment:departement[]=[];
  D:departement={code:'',description:'',libelle:''};
  ngOnInit() {
    this.US.getUser(Number(localStorage.getItem('id')),(localStorage.getItem('token'))).subscribe(val=>{
      console.log(val);
      //@ts-ignore
      this.user=val.rows[0];
    })
    this.DS.getDepartements().subscribe(val=>{
      //@ts-ignore
console.log(val);
   var lst=[]
   //@ts-ignore
   for (let i = 0; i < val.results.length; i++) {
    //@ts-ignore
     lst.push(val.results[i]);
     
   }
   this.lstdepartment=lst;
    })
   
  }
  alerts=[]
  AjouterDepartement(){
    if(this.D.code==''){
      swal('Erreur','Veuillez introduire le code du departement','error');
      
       }
       else if(this.D.description==''){
        swal('Erreur','Veuillez introduire le description du departement','error');
       }
       else if(this.D.libelle==''){
        swal('Erreur','Veuillez introduire le libelle du departement','error');
       }
       else{
        swal('Departement','Departement Ajouté avec succée','success');
        this.tabdepartment=false;
        this.formdepartment=true
        this.DS.ajouterDepartement(this.D).subscribe(val=>{
          this.D={code:'',description:'',libelle:''};
         });
       }

    
   
  }

}
