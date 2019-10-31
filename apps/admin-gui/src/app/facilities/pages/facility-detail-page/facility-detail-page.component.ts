import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fadeIn } from '../../../shared/animations/Animations';
import { SideMenuService } from '../../../core/services/common/side-menu.service';
import { SideMenuItemService } from '../../../shared/side-menu/side-menu-item.service';
import { FacilityService } from '@perun-web-apps/perun/services';
import { Facility } from '@perun-web-apps/perun/models';
import { addRecentlyVisited } from '@perun-web-apps/perun/utils';

@Component({
  selector: 'app-facility-detail-page',
  templateUrl: './facility-detail-page.component.html',
  styleUrls: ['./facility-detail-page.component.scss'],
  animations: [
    fadeIn
  ]
})
export class FacilityDetailPageComponent implements OnInit {

  constructor(
    private facilityService: FacilityService,
    private route: ActivatedRoute,
    private sideMenuService: SideMenuService,
    private sideMenuItemService: SideMenuItemService
  ) { }

  facility: Facility;

  ngOnInit() {
    this.route.params.subscribe(params => {
      const facilityId = params['facilityId'];

      this.facilityService.getFacilityById(facilityId).subscribe(facility => {
        this.facility = facility;
        const facilityItem = this.sideMenuItemService.parseFacility(facility);

        this.sideMenuService.setFacilityMenuItems([facilityItem]);

        addRecentlyVisited('facilities', this.facility);
      });
    });
  }
}
