/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Dual-licensed under the Single Application / Multi Application License (when this software was purchased) and GNU AFFERO GENERAL PUBLIC LICENSE Version 3 (when it was not).
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP / LICENSE_AGPL in the 'docs' folder for license information on type of license applicable.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'ngx-popover-tabs',
  template: `
    <nb-tabset>
      <nb-tab tabTitle="What's up?">
        <div class="p-4">
          Such a wonderful day!
        </div>
      </nb-tab>
      <nb-tab tabTitle="Second Tab">
        <div class="p-4">
          Indeed!
        </div>
      </nb-tab>
    </nb-tabset>
  `,
})
export class NgxPopoverTabsComponent {
}

@Component({
  selector: 'ngx-popover-form',
  template: `
    <div class="p-4">
      <form>
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Recipients">
        </div>
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Subject">
        </div>
        <div class="form-group">
          <textarea class="form-control" placeholder="Message"></textarea>
        </div>
        <button type="submit" class="btn btn-primary w-100">Send</button>
      </form>
    </div>
  `,
})
export class NgxPopoverFormComponent {
}

@Component({
  selector: 'ngx-popover-card',
  template: `
    <nb-card class="popover-card">
      <nb-card-header status="warning">
        Hello!
      </nb-card-header>
      <nb-card-body>
        Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,
        there live the blind texts.
        Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.
      </nb-card-body>
    </nb-card>
  `,
  styles: [`
    nb-card {
      margin: 0;
      max-width: 20rem;
    }
  `],
})
export class NgxPopoverCardComponent {
}
