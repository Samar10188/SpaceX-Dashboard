import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  years = ["2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020"]
  spaceXDetails: any;
  launch_success: any = null;
  land_success: any = null;
  prevButtonId: any;
  launch_year: any = null;
  prevButtonLaunchId: any;
  prevButtonLandId: any;
  constructor(private mainService: MainService,
              private router: Router) { }

  ngOnInit(): void {
    this.getSpaceXDetails();
  }

  getSpaceXDetails(){
    this.mainService.getSpaceXDetails().subscribe((res)=>{
      console.log('spacex details',res);
      this.spaceXDetails = res;
    })
  }

  getfilteredDetails(){
    this.mainService.getFilteredSpaceXDetails(this.launch_year, this.land_success, this.launch_success).subscribe((data)=>{
      this.spaceXDetails = data
    })
  }

  onClickYearButtonChangeStyle(year, id){
    
    if(!this.prevButtonId){
      //first time select the year
      let button = document.getElementById(id);
      button.style.backgroundColor = 'rgb(141, 206, 11)';
      this.launch_year = year;
      this.prevButtonId = id;
    } else if(this.prevButtonId == id){
      //  deselect the year
      let btn = document.getElementById(this.prevButtonId);
      btn.style.backgroundColor = 'rgb(214, 247, 148)'         // non clicked 
      this.launch_year = null;
      this.prevButtonId = null;
    } else {
      // select another year
      let btn = document.getElementById(this.prevButtonId);
      btn.style.backgroundColor = 'rgb(214, 247, 148)'         // non clicked 
      let button = document.getElementById(id);
      button.style.backgroundColor = 'rgb(141, 206, 11)';      // clicked
      this.launch_year = year;
      this.prevButtonId = id;
    }
  }

  getYearlySpaceXDetails(year, id){
    this.onClickYearButtonChangeStyle(year, id+1);
    this.getfilteredDetails();
    this.navigateToRoute();
  }

  onClickLaunchButtonChangeStyle(success, id){
    if(!this.prevButtonLaunchId){
      //first time select
      let button = document.getElementById(id);
      button.style.backgroundColor = 'rgb(141, 206, 11)';
      this.launch_success = success;
      this.prevButtonLaunchId = id;
    } else if(this.prevButtonLaunchId == id){
      //  deselect
      let btn = document.getElementById(this.prevButtonLaunchId);
      btn.style.backgroundColor = 'rgb(214, 247, 148)'         // non clicked 
      this.launch_success = null;
      this.prevButtonLaunchId = null;
    } else {
      // select another
      let btn = document.getElementById(this.prevButtonLaunchId);
      btn.style.backgroundColor = 'rgb(214, 247, 148)'         // non clicked 
      let button = document.getElementById(id);
      button.style.backgroundColor = 'rgb(141, 206, 11)';      // clicked
      this.launch_success = success;
      this.prevButtonLaunchId = id;
    }
  }

  getFilteredLaunchSpaceXDetails(launch_success, id){
    this.onClickLaunchButtonChangeStyle(launch_success, id);
    this.getfilteredDetails();
    this.navigateToRoute();
  }

  onClickLandButtonChangeStyle(success, id){
    if(!this.prevButtonLandId){
      //first time select
      let button = document.getElementById(id);
      button.style.backgroundColor = 'rgb(141, 206, 11)';
      this.land_success = success;
      this.prevButtonLandId = id;
    } else if(this.prevButtonLandId == id){
      //  deselect 
      let btn = document.getElementById(this.prevButtonLandId);
      btn.style.backgroundColor = 'rgb(214, 247, 148)'         // non clicked 
      this.land_success = null;
      this.prevButtonLandId = null;
    } else {
      // select another 
      let btn = document.getElementById(this.prevButtonLandId);
      btn.style.backgroundColor = 'rgb(214, 247, 148)'         // non clicked 
      let button = document.getElementById(id);
      button.style.backgroundColor = 'rgb(141, 206, 11)';      // clicked
      this.land_success = success;
      this.prevButtonLandId = id;
    }
  }

  getFilteredLandSpaceXDetails(land_success, id){
    this.onClickLandButtonChangeStyle(land_success, id);
    this.getfilteredDetails();
    this.navigateToRoute();
  }

  navigateToRoute(){
    if(this.launch_year == null && this.land_success == null && this.launch_success != null){
      this.router.navigate(['/filter'],{queryParams: {launch_success: this.launch_success}});
      
    } else if(this.launch_year == null && this.land_success != null && this.launch_success == null){
      this.router.navigate(['/filter'],{queryParams: {land_success: this.land_success}});

    } else if(this.launch_year != null && this.land_success == null && this.launch_success == null){
      this.router.navigate(['/filter'],{queryParams: {launch_year: this.launch_year}});

    } else if(this.launch_year == null && this.land_success != null && this.launch_success != null){
      this.router.navigate(['/filter'],{queryParams: {launch_success: this.launch_success, land_success: this.land_success}});

    } else if(this.launch_year != null && this.land_success == null && this.launch_success != null){
      this.router.navigate(['/filter'],{queryParams: {launch_year: this.launch_year, launch_success: this.launch_success}});

    } else if(this.launch_year != null && this.land_success != null && this.launch_success == null){
      this.router.navigate(['/filter'],{queryParams: {launch_year: this.launch_year, land_success: this.land_success}});

    } else if(this.launch_year != null && this.land_success != null && this.launch_success != null){
      this.router.navigate(['/filter'],{queryParams: {launch_year: this.launch_year, launch_success: this.launch_success, land_success: this.land_success}});

    } else if(this.launch_year == null && this.land_success == null && this.launch_success == null){
      this.router.navigate(['/all']);
    }
  }
  
}
