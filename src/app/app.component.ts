import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs';
import { GlobalService } from './shared/services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router, private titleService: Title, private global: GlobalService, private activatedRoute: ActivatedRoute) {
    this.setHTMLTitle();
    this.global.windowWidth = window.innerWidth;
  }

  @HostListener('window:resize')
  onResize() {
    this.global.windowWidth = window.innerWidth;
  }

  setHTMLTitle() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          const child = this.activatedRoute.firstChild;
          if (child!.snapshot.data['title']) {
            return child!.snapshot.data['title'];
          }
          return null;
        })
      )
      .subscribe((title: string) => {
        if (title) {
          this.titleService.setTitle(title);
        }
      });
  }
}
