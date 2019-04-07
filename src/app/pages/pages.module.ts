import { NgModule } from '@angular/core';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { NbDialogModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { MasterTableComponent } from './shared/master-table.component';
import { ConfirmationComponent } from './shared/components/confirmation.component';

const PAGES_COMPONENTS = [
  PagesComponent,
  MasterTableComponent,
  ConfirmationComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    NbDialogModule.forChild()
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
  entryComponents: [ConfirmationComponent]
})
export class PagesModule {
}
