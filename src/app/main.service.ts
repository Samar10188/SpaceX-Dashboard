import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MainService {

  baseUrl = 'http://localhost:3000/customer';

  constructor(private httpClient: HttpClient) {
  }

  getSpaceXDetails() {
    let url = 'https://api.spaceXdata.com/v3/launches?limit=100'
    return this.httpClient.get(url)
      .pipe(catchError(this.handleError));
  }

  getFilteredSpaceXDetails(launch_year, land_success, launch_success) {
    if(launch_year == null && land_success == null && launch_success != null){
      var url = 'https://api.spaceXdata.com/v3/launches?limit=100&launch_success=' + launch_success;
    } else if(launch_year == null && land_success != null && launch_success == null){
      var url = 'https://api.spaceXdata.com/v3/launches?limit=100&land_success=' + land_success;
    } else if(launch_year != null && land_success == null && launch_success == null){
      var url = 'https://api.spaceXdata.com/v3/launches?limit=100&launch_year=' + launch_year;
    } else if(launch_year == null && land_success != null && launch_success != null){
      var url = 'https://api.spaceXdata.com/v3/launches?limit=100&launch_success=' + launch_success + '&land_success=' + land_success;
    } else if(launch_year != null && land_success == null && launch_success != null){
      var url = 'https://api.spaceXdata.com/v3/launches?limit=100&launch_success=' + launch_success + '&launch_year=' + launch_year;
    } else if(launch_year != null && land_success != null && launch_success == null){
      var url = 'https://api.spaceXdata.com/v3/launches?limit=100&land_success=' + land_success + '&launch_year=' + launch_year;
    } else if(launch_year != null && land_success != null && launch_success != null){
      var url = 'https://api.spaceXdata.com/v3/launches?limit=100&launch_success=' + launch_success + '&land_success=' + land_success + '&launch_year=' + launch_year;
    } else if(launch_year == null && land_success == null && launch_success == null){
      var url = 'https://api.spaceXdata.com/v3/launches?limit=100';
    }
    // var url = 'https://api.spaceXdata.com/v3/launches?limit=100&launch_year=' + year;
    return this.httpClient.get(url)
      .pipe(catchError(this.handleError));
  }

  getFilteredLaunchSpaceXDetails(launch_success) {
    let url = 'https://api.spaceXdata.com/v3/launches?limit=100&launch_success=' + launch_success;
    return this.httpClient.get(url)
      .pipe(catchError(this.handleError));
  }

  getFilteredLaunchAndLandSpaceXDetails(launch_success, land_success) {
    let url = 'https://api.spaceXdata.com/v3/launches?limit=100&launch_success=' + launch_success + '&land_success=' + land_success;
    return this.httpClient.get(url)
      .pipe(catchError(this.handleError));
  }

  getAllFilteredSpaceXDetails(launch_success, land_success, year) {
    let url = 'https://api.spaceXdata.com/v3/launches?limit=100&launch_success=' + launch_success + '&land_success=' + land_success + '&launch_year=' + year;
    return this.httpClient.get(url)
      .pipe(catchError(this.handleError));
  }

  handleError(errorResponse: HttpErrorResponse) {
    return throwError(errorResponse.error)
  }
}
