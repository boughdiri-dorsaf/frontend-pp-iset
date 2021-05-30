import { Subscription } from 'rxjs/Subscription';
import swal  from 'sweetalert';
import { EtudiantService } from './../../services/etudiant.service';
import { EtablissementService } from './../../services/etablissement.service';
import { User, UserService } from './../../services/user.service';
import { MasterService } from './../../services/master.service';
import { Component, OnInit } from '@angular/core';
import 'assets/charts/amchart/amcharts.js';
import 'assets/charts/amchart/gauge.js';
import 'assets/charts/amchart/pie.js';
import 'assets/charts/amchart/serial.js';
import 'assets/charts/amchart/light.js';
import 'assets/charts/amchart/ammap.js';
import 'assets/charts/amchart/worldLow.js';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { formatDate } from '@angular/common';

declare const AmCharts: any;
declare const $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private modal:NgbModal,private Etudiant:EtudiantService,private US:UserService,private MS:MasterService,private ES:EtablissementService) { }
lstmasters=[];

lstetablissement=[];
lstAppli:any=[];title='Liste Totale'
page = 1;
user:User={email:'',nom:'',prenom:'',password:'',num_passport:'',age:0,cin:'',
sexe:'',date_naissance:'',ville:'',gouvernorat_adresse:'',pays:'',rue:'',code_postale:'',id_role:0, gouvern_naissance: 'hjg'};
pageSize =10;
p1
sub:Subscription
sub1:Subscription
sub2:Subscription
sub3:Subscription
Application={
  date_inscrit:new Date(),
  id_etat_demande_master:3,
  id_master:0,
  id_etudiant:0,
  fichier:null}
  ngOnInit() {
  this.sub=  this.MS.GetDemandesMaster().subscribe(Applications=>{
  this.sub1=  this.Etudiant.getetudiant(Number(localStorage.getItem('id'))).subscribe(Etud=>{
  this.sub2=  this.MS.getmasters().subscribe(val=>{
  this.sub3=    this.ES.getetablissements().subscribe(etablissemt=>{
    console.log(Applications);
        //@ts-ignore
        this.lstAppli=Applications.results
        //@ts-ignore
        //@ts-ignore
        this.lstetablissement=etablissemt.results;
        //@ts-ignore
        this.Application.id_etudiant=Etud.results[0].id_etudiant;
        console.log(val)
      //@ts-ignore
       for (let i = 0; i < val.results.length; i++) {
         //@ts-ignore
         this.lstmasters.push({nom:val.results[i].nom,
          //@ts-ignore
          date_fin:val.results[i].date_fin_master,
           //@ts-ignore
          etablissement:this.getetablissemt(val.results[i].id_etablissement),
           //@ts-ignore
          Seuil_Admission:val.results[i].seuil_admission,
           //@ts-ignore
          id:val.results[i].id_master,
           //@ts-ignore
          idEtudiant:Etud.results[0].id_etudiant,
          //@ts-ignore
        etat:this.exist(Etud.results[0].id_etudiant,val.results[i].id_master)})
       }
    });
  });
});

});
    this.US.getUser(Number(localStorage.getItem('id')),localStorage.getItem('token')).subscribe(val=>{

      //@ts-ignore
     // this.user=val.data[0];
    });

  }
  filtermasters(option){
    this.sub.unsubscribe();
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
    this.lstAppli=new Array();
    this.lstetablissement=new Array();
    this.lstmasters=new Array();
    if(option=='Liste Totale'){
      this.sub=  this.MS.GetDemandesMaster().subscribe(Applications=>{
        this.sub1=  this.Etudiant.getetudiant(Number(localStorage.getItem('id'))).subscribe(Etud=>{
        this.sub2=  this.MS.getmasters().subscribe(val=>{
        this.sub3=    this.ES.getetablissements().subscribe(etablissemt=>{
                //@ts-ignore
        this.lstAppli=Applications.results
        //@ts-ignore
        //@ts-ignore
        this.lstetablissement=etablissemt.results;
        //@ts-ignore
        this.Application.id_etudiant=Etud.results[0].id_etudiant;
        console.log(val)
      //@ts-ignore
       for (let i = 0; i < val.results.length; i++) {
         //@ts-ignore
         this.lstmasters.push({nom:val.results[i].nom,
          //@ts-ignore
          date_fin:val.results[i].date_fin_master,
           //@ts-ignore
          etablissement:this.getetablissemt(val.results[i].id_etablissement),
           //@ts-ignore
          Seuil_Admission:val.results[i].seuil_admission,
           //@ts-ignore
          id:val.results[i].id_master,
           //@ts-ignore
          idEtudiant:Etud.results[0].id_etudiant,
          //@ts-ignore
        etat:this.exist(Etud.results[0].id_etudiant,val.results[i].id_master)})
             }
          });
        });
      });

      });
    }
    else if(option=='Mes Applications'){
      this.sub=  this.MS.GetDemandesMaster().subscribe(Applications=>{
        this.sub1=  this.Etudiant.getetudiant(Number(localStorage.getItem('id'))).subscribe(Etud=>{
        this.sub2=  this.MS.getmasters().subscribe(val=>{
        this.sub3=    this.ES.getetablissements().subscribe(etablissemt=>{
                    //@ts-ignore
        this.lstAppli=Applications.results
        //@ts-ignore
        //@ts-ignore
        this.lstetablissement=etablissemt.results;
        //@ts-ignore
        this.Application.id_etudiant=Etud.results[0].id_etudiant;
        console.log(val)
      //@ts-ignore
       for (let i = 0; i < val.results.length; i++) {
         //@ts-ignore
         this.lstmasters.push({nom:val.results[i].nom,
          //@ts-ignore
          date_fin:val.results[i].date_fin_master,
           //@ts-ignore
          etablissement:this.getetablissemt(val.results[i].id_etablissement),
           //@ts-ignore
          Seuil_Admission:val.results[i].seuil_admission,
           //@ts-ignore
          id:val.results[i].id_master,
           //@ts-ignore
          idEtudiant:Etud.results[0].id_etudiant,
          //@ts-ignore
        etat:this.exist(Etud.results[0].id_etudiant,val.results[i].id_master)})
              var tab=[];
              for (let i = 0; i < this.lstmasters.length; i++) {
               if(this.lstmasters[i].etat!="Pas D application"){
                  tab.push(this.lstmasters[i]);
               }

              }
              this.lstmasters=tab;
             }
          });
        });
      });

      });

    }
    else if(option=='Liste des Masters'){
      this.sub=  this.MS.GetDemandesMaster().subscribe(Applications=>{
        this.sub1=  this.Etudiant.getetudiant(Number(localStorage.getItem('id'))).subscribe(Etud=>{
        this.sub2=  this.MS.getmasters().subscribe(val=>{
        this.sub3=    this.ES.getetablissements().subscribe(etablissemt=>{
                 //@ts-ignore
        this.lstAppli=Applications.results
        //@ts-ignore
        //@ts-ignore
        this.lstetablissement=etablissemt.results;
        //@ts-ignore
        this.Application.id_etudiant=Etud.results[0].id_etudiant;
        console.log(val)
      //@ts-ignore
       for (let i = 0; i < val.results.length; i++) {
         //@ts-ignore
         this.lstmasters.push({nom:val.results[i].nom,
          //@ts-ignore
          date_fin:val.results[i].date_fin_master,
           //@ts-ignore
          etablissement:this.getetablissemt(val.results[i].id_etablissement),
           //@ts-ignore
          Seuil_Admission:val.results[i].seuil_admission,
           //@ts-ignore
          id:val.results[i].id_master,
           //@ts-ignore
          idEtudiant:Etud.results[0].id_etudiant,
          //@ts-ignore
        etat:this.exist(Etud.results[0].id_etudiant,val.results[i].id_master)})
              var tab=[];
              for (let i = 0; i < this.lstmasters.length; i++) {
               if(this.lstmasters[i].etat=="Pas D application"){
                  tab.push(this.lstmasters[i]);
               }
              }
              this.lstmasters=tab;
             }
          });
        });
      });

      });

    }

  }
  exist(idetudiant,idmaster){
 var msg="Pas D application"
   for (let i = 0; i < this.lstAppli.length; i++) {
     if(this.lstAppli[i].id_etudiant==idetudiant&&this.lstAppli[i].id_master==idmaster){
         msg=this.lstAppli[i].edmlibelle;
     }

   }
   return msg;
  }
  idmaster
appliquer(){
this.Application.id_master=this.idmaster;
this.Application.date_inscrit=new Date();
var year=this.Application.date_inscrit.getFullYear();
if(Number(this.Application.date_inscrit.getMonth())+1<10)
{
  var month="0"+(Number(this.Application.date_inscrit.getMonth())+1);
}
else{
 var month=(Number(this.Application.date_inscrit.getMonth())+1)+""
}

if(Number(this.Application.date_inscrit.getDate())<10)
{
  var day="0"+(Number(this.Application.date_inscrit.getDate()));
}
else{
 var day=(Number(this.Application.date_inscrit.getDate()))+""
}
//@ts-ignore
this.Application.date_inscrit=year+"-"+month+"-"+day;
swal({
  title: "Application",
  text: "Voulez vous Vraiment Appliquer dans ce Master  ?",
  icon: "warning",
  buttons: ["Non", "Oui"],
  dangerMode: false,
})
.then((willDelete) => {
  if (willDelete) {
    var form=new FormData();
    form.append('fichier', this.Application.fichier);
    form.append('id_master', String(this.Application.id_master));
    form.append('id_etudiant', String(this.Application.id_etudiant));
    form.append('id_etat_demande_master', String(this.Application.id_etat_demande_master));
    form.append('date_inscrit', String(this.Application.date_inscrit));
    this.MS.AppliquerMaster(form);
  }
});

}
pic
async imageselect() {

  this.Application.fichier
  //@ts-ignore
  const file = document.getElementById('img').files;
  console.log(file[0]);
  this.Application.fichier = file[0];
}
  getetablissemt(id){
    var etablissement='';
  for (let i = 0; i < this.lstetablissement.length; i++) {
    if(id==this.lstetablissement[i].id_etablissement){
      return etablissement=this.lstetablissement[i].libelle
    }

  }
  }
  open(content,id) {
    this.idmaster=id;
    this.modal.open(content, {ariaLabelledBy: 'Application'}).result.then((result) => {

    }, (reason) => {

    });
  }
}


function getRandomData() {
  let data = [];
  const totalPoints = 300;
  if (data.length > 0) {
    data = data.slice(1);
  }

  while (data.length < totalPoints) {
    const prev = data.length > 0 ? data[data.length - 1] : 50;
    let y = prev + Math.random() * 10 - 5;
    if (y < 0) {
      y = 0;
    } else if (y > 100) {
      y = 100;
    }
    data.push(y);
  }

  const res = [];
  for (let i = 0; i < data.length; ++i) {
    res.push([i, data[i]]);
  }
  return res;
}

function buildChartJS(a, b, f, c) {
  if (f == null) {
    f = 'rgba(0,0,0,0)';
  }
  return {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October'],
    datasets: [{
      label: '',
      borderColor: a,
      borderWidth: 2,
      hitRadius: 30,
      pointHoverRadius: 4,
      pointBorderWidth: 50,
      pointHoverBorderWidth: 12,
      pointBackgroundColor: c,
      pointBorderColor: 'transparent',
      pointHoverBackgroundColor: a,
      pointHoverBorderColor: 'rgba(0,0,0,0.5)',
      fill: true,
      backgroundColor: f,
      data: b,
    }]
  };
}

function buildChartOption() {
  return {
    title: {
      display: false
    },
    tooltips: {
      enabled: true,
      intersect: false,
      mode: 'nearest',
      xPadding: 10,
      yPadding: 10,
      caretPadding: 10
    },
    legend: {
      display: false,
      labels: {
        usePointStyle: false
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    hover: {
      mode: 'index'
    },
    scales: {
      xAxes: [{
        display: false,
        gridLines: false,
        scaleLabel: {
          display: true,
          labelString: 'Month'
        }
      }],
      yAxes: [{
        display: false,
        gridLines: false,
        scaleLabel: {
          display: true,
          labelString: 'Value'
        },
        ticks: {
          beginAtZero: true
        }
      }]
    },
    elements: {
      point: {
        radius: 4,
        borderWidth: 12
      }
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 5,
        bottom: 0
      }
    }
  };
}
