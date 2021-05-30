import { MasterService } from './../../services/master.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {
lstmasters=[];
selectedmaster=0;
lstDemandesmasters=[];
  constructor(private MS:MasterService) { }

  ngOnInit() {
  
  this.MS.getmasters().subscribe(val=>{
    //@ts-ignore
    this.lstmasters=val.results
  console.log(this.lstmasters)
  });
this.MS.GetDemandesMaster().subscribe(val=>{
  console.log(val);
  //@ts-ignore
  this.lstDemandesmasters=val.results
})
  }

}
