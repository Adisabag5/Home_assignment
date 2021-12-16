import { Component, OnInit } from '@angular/core';
import { MainService } from './main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  types: any = [];
  monitors: any = [];
  currLegent: any = [];

  currMonitorLegendId: number = 0;

  constructor(
    private mainService: MainService
  ) { }

  ngOnInit(): void {
    this.getMonitorTypes();
    
  }

  getMonitorTypes(){
    this.mainService.getMonitorTypes().subscribe(
      rest => {
        this.types = rest
        this.getMonitors(this.types[0].Id, this.types[0].LegentId)
        this.currMonitorLegendId = this.types[0].LegentId;
        console.log(rest)
      },
      error => {
        console.log(error)
      }
    );
  }

  getMonitors(type_Id: number, legend_id: number){
    this.currMonitorLegendId = legend_id;
    this.mainService.getMonitors(type_Id).subscribe(
          rest => {
            this.monitors = rest
            this.getLegent(legend_id)
            console.log(rest)
          },
          error => {
            console.log(error)
          }
        );
  }

  getLegent(legend_Id: number){
    this.mainService.getLegend(legend_Id).subscribe(
      rest => {
        this.currLegent = rest[0].tags
        console.log(this.currLegent)
      },
      error => {
        console.log(error)
      }
    );
  }

}
