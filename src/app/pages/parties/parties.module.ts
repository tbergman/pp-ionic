import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PartiesPage } from './parties.page';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { NzIconModule, NzButtonModule } from 'ng-zorro-antd';
import { PartyItemComponent } from './components/party-item/party-item.component';
import { MapBoxComponent } from '../../shared/components/map-box/map-box.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { environment } from 'src/environments/environment';
import { MomentModule } from 'ngx-moment';

const routes: Routes = [
    {
        path: '',
        component: PartiesPage,
    },
    { path: 'create', loadChildren: './pages/create/create.module#CreatePageModule' },
    {
        path: ':id',
        loadChildren: './pages/view/view.module#ViewPageModule',
        children: [
            { path: '', redirectTo: 'home' },
            {
                path: 'home',
                loadChildren: './pages/view/pages/parties-view-home/parties-view-home.module#PartiesViewHomePageModule',
            },
        ],
    },
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        NgZorroAntdMobileModule,
        NzButtonModule,
        NzIconModule,
        NgxMapboxGLModule.withConfig({
            accessToken: environment.mapbox.accessToken,
        }),
        MomentModule,
    ],

    declarations: [PartiesPage, PartyItemComponent, MapBoxComponent],
})
export class PartiesPageModule {}
