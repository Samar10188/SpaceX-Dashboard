import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SpaceX Dashboard';
  constructor(private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((data)=>{
      console.log('query', data);
    })
    this.router.navigate(['all'])
  }
}
