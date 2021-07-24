import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  years = ["2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020"]
  spaceXDetails: any;
  launch_success: any;
  land_success: any;
  prevButtonId: any;
  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.getSpaceXDetails();
  }

  getSpaceXDetails(){
    this.mainService.getSpaceXDetails().subscribe((res)=>{
      console.log('spacex details',res);
      this.spaceXDetails = res;
    })
  }

  onClickButtonChangeStyle(id){
    if(this.prevButtonId){
      let btn = document.getElementById(this.prevButtonId);
      btn.style.backgroundColor = 'rgb(214, 247, 148)'
    }
    this.prevButtonId = id;
    let button = document.getElementById(id);
    button.style.backgroundColor = 'rgb(141, 206, 11)';
  }

  getYearlySpaceXDetails(year, id){
    this.onClickButtonChangeStyle(id+1);
    this.mainService.getYearlySpaceXDetails(year).subscribe((res)=>{
      console.log('spacex yearly details',res);
      this.spaceXDetails = res;
    })
    this.mainService.getFilteredLaunchSpaceXDetails
    this.mainService.getFilteredLaunchAndLandSpaceXDetails
  }

  getFilteredLaunchSpaceXDetails(launch_success){
    this.launch_success = launch_success;
    this.mainService.getFilteredLaunchSpaceXDetails(launch_success).subscribe((res)=>{
      console.log('spacex filtered launch success details',res);
      this.spaceXDetails = res;
    })
  }

  getFilteredLaunchAndLandSpaceXDetails(land_success){
    this.land_success = land_success;
    this.mainService.getFilteredLaunchAndLandSpaceXDetails(this.launch_success,this.land_success).subscribe((res)=>{
      console.log('spacex filtered launch success details',res); 
      this.spaceXDetails = res; 
    })
  }
  
}
