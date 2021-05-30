import { MasterService,master } from './../../services/master.service';
import  swal  from 'sweetalert';
import { departement, DepartementService } from './../../services/departement.service';
import { EtablissementService, establishment } from './../../services/etablissement.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import '../../../assets/charts/amchart/amcharts.js';
import '../../../assets/charts/amchart/gauge.js';
import '../../../assets/charts/amchart/pie.js';
import '../../../assets/charts/amchart/serial.js';
import '../../../assets/charts/amchart/light.js';
import '../../../assets/charts/amchart/ammap.js';
import '../../../assets/charts/amchart/worldLow.js';
import { Subscription } from 'rxjs';

declare const AmCharts: any;
declare const $: any;

@Component({ 
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html', 
  styleUrls: ['./dashboard.component.scss','../../../assets/icon/svg-animated/svg-weather.css']
})
export class DashboardAdminComponent implements OnInit {
  totalValueGraphData1 = buildChartJS('#fff', [45, 25, 35, 20, 45, 20, 40, 10, 30, 45], '#3a73f1', 'transparent');
  totalValueGraphData2 = buildChartJS('#fff', [10, 25, 35, 20, 10, 20, 15, 45, 15, 10], '#e55571', 'transparent');
  totalValueGraphOption = buildChartOption();
  lstmasters=[];
  p
  constructor(private US:UserService,private ES:EtablissementService,private DS:DepartementService,private MS:MasterService) { }
tabmasters=false;
formmasters=true;
lstdepartement:departement[]=[];
sub:Subscription;
lstetablissement:establishment[]=[];
M:master={nom:'',id_departement:null,
seuil_admis_attente:0,seuil_admission:0,
id_etablissement:null,date_fin_master:''}
  ngOnInit() { 
this.ES.getetablissements().subscribe(val=>{
  
   //@ts-ignore
   for (let i = 0; i < val.results.length; i++) {
    //@ts-ignore
    this.lstetablissement.push(val.results[i]);

     
   }
});
this.DS.getDepartements().subscribe(val=>{
  
   //@ts-ignore
   for (let i = 0; i < val.results.length; i++) {
    //@ts-ignore
    this.lstdepartement.push(val.results[i]);
     
   }
});
this.sub=this.MS.getmasters().subscribe(val=>{
  console.log(val)
 //@ts-ignore
 for (let i = 0; i < val.results.length; i++) {
  //@ts-ignore
  this.lstmasters.push(val.results[i]);
   
 }
 console.log(this.lstmasters);
});
    this.US.getUser(Number(localStorage.getItem('id')),(localStorage.getItem('token'))).subscribe(val=>{
      console.log(val);
      //@ts-ignore
      this.user=val.rows[0];
    })
    
  
  }

 refreshmasters(){
  this.lstmasters=new Array();
   this.sub.unsubscribe();
   this.sub=this.MS.getmasters().subscribe(val=>{
    //@ts-ignore
    for (let i = 0; i < val.results.length; i++) {
     //@ts-ignore
     this.lstmasters.push(val.results[i]);
      
    }
    console.log(this.lstmasters);
   });
 }
  Addmaster(){
    if(this.M.nom==''){
      swal('Erreur',"Veuillez introduire le Nom du Master",'error');
       }
       else if(this.M.date_fin_master==''){
        swal('Erreur',"Veuillez introduire la Date du Master",'error');
       }
       else if(this.M.id_etablissement==null){
        swal('Erreur',"Veuillez choisir l'Etablissement du Master",'error');
       }
       else if(this.M.id_departement==null){
        swal('Erreur',"Veuillez choisir le Departement du Master",'error');
       }
       else if(this.M.seuil_admission==0){
        swal('Erreur',"Le Seuil admission doit etre supérieure de 0",'error');
       }
       else{
        swal('Master','Master Ajouté avec succée','success');
        this.tabmasters=false;
        this.formmasters=true
        console.log(this.M);
        this.MS.ajoutermaster(this.M).subscribe(val=>{
          console.log(val);
          this.M={nom:'',id_departement:null,
          seuil_admis_attente:0,seuil_admission:0,
          id_etablissement:null,date_fin_master:''}
          this.refreshmasters()
         });
       }
  
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
