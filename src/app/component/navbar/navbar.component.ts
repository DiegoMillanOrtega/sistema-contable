import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { CardModule } from 'primeng/card';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { filter } from 'rxjs';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MenubarModule,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    CommonModule,
    RippleModule,
    CardModule,
    SidebarComponent,
    ButtonModule,
    RouterModule,
    SidebarModule,
    IconFieldModule,
    InputIconModule,
    BreadcrumbModule,

],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  @ViewChild('sidebar') sidebar!: SidebarComponent;
  items: MenuItem[] | undefined;
  sidebarVisible: boolean = true;
  sidebarWidth: string = '250px';

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.generateBreadcrumbs(this.activatedRoute.root);
      });
  }

  private generateBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: MenuItem[] = []): void {
    // Set up a static "Home" item if it's the first breadcrumb
    if (breadcrumbs.length === 0) {
      breadcrumbs.push({
        icon: 'pi pi-home',
        route: ''
      });
    }

    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      this.items = breadcrumbs;
      console.log('holaaa');
      
      return;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      // Add breadcrumb item for current route if it has a title
      if (child.snapshot.data['title']) {
        breadcrumbs.push({
          label: child.snapshot.data['title'],
          route: url
        });
      }

      this.generateBreadcrumbs(child, url, breadcrumbs);
    }
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible; // Alternar la visibilidad
    this.sidebarWidth = this.sidebarVisible ? '250px' : '0';
  }
}
