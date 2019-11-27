import { PlaylistsComponent } from './components/playlists/playlists.component';
import { SavedTracksComponent } from './components/saved-tracks/saved-tracks.component';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { StyledComponentsModule } from 'angular-styled-components';
import { SharedModule } from './../../../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PartiesViewMusicPage } from './parties-view-music.page';
import { NgZorroAntdModule, NzButtonModule } from 'ng-zorro-antd';
import { SpotifyAuth } from '@ionic-native/spotify-auth/ngx';
import { TopTrackComponent } from './components/top-track/top-track.component';
import { Media } from '@ionic-native/media/ngx';

const routes: Routes = [
    {
        path: '',
        component: PartiesViewMusicPage,
    },
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        NgZorroAntdModule,
        NgZorroAntdMobileModule,
        NzButtonModule,
        SharedModule,
        StyledComponentsModule,
    ],
    declarations: [PartiesViewMusicPage, TopTrackComponent, SavedTracksComponent, PlaylistsComponent],
    providers: [SpotifyAuth, Media],
})
export class PartiesViewMusicPageModule {}
