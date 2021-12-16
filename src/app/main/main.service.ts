import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class MainService {

  types$: Observable<any> = this.http.get('/api/MonitorType');


  constructor(
    private http: HttpClient
  ) { }

  getMonitorTypes(){
    return this.http.get('/api/MonitorType');
  }

  getMonitors(monitor_id: number){
    let filterVal: any;
    return this.http.get('/api/Monitor')
      .pipe(
        map(val => filterVal = val),
        // use filter to get the values you want
        map((items: any) => items.filter((item: any) => item.MonitorTypeId === monitor_id))
      )
  }

  getLegend(legend_id: number){
    let filterVal: any;
    return this.http.get('/api/Legends')
      .pipe(
        map(val => filterVal = val),
        // use filter to get the values you want
        map((items: any) => items.filter((item: any) => item.Id === legend_id))
      );
  }

 
}
