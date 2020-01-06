import { ModalController } from '@ionic/angular';
import { QueryRef } from 'apollo-angular';
import { map, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { PP_USER_ID } from './../../../../../../../../../constants';
import {
    Party_PlaylistsConnectionGQL,
    Party,
    PlaylistEdge,
} from './../../../../../../../../../graphql/generated/types';
import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import gql from 'graphql-tag';

export const IMPORT_PLAYLISTS_TO_PARTY_MUTATION = gql`
    mutation Party_ImportPlaylistsToParty($playlists: String!, $partyId: ID!) {
        importPlaylistsToParty(playlists: $playlists, partyId: $partyId)
    }
`;
@Component({
    selector: 'app-import-playlist-modal',
    templateUrl: './import-playlist-modal.component.html',
    styleUrls: ['./import-playlist-modal.component.scss'],
})
export class ImportPlaylistModalComponent implements OnInit {
    @Input() id: string;
    loading = true;
    watcher: QueryRef<any>;
    playlists$: any = [];
    filterQuery: string;
    selectedPlaylists: PlaylistEdge[] = [];
    filterQueryChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
    constructor(private readonly ppcgql: Party_PlaylistsConnectionGQL, private readonly modalCtrl: ModalController) {}

    ngOnInit() {
        this.watcher = this.ppcgql.watch(
            {
                where: {
                    parties_none: { id: this.id },
                    user: { id: localStorage.getItem(PP_USER_ID) },
                    name_contains: this.filterQuery,
                    importable: true,
                },
            },
            { fetchPolicy: 'cache-and-network' },
        );
        this.playlists$ = this.watcher.valueChanges.pipe(
            map((r) => {
                this.loading = r.loading;
                this.selectedPlaylists = [];
                return r.data ? r.data.playlistsConnection.edges : [];
            }),
        );

        this.filterQueryChanged.pipe(distinctUntilChanged(), debounceTime(600)).subscribe((_) => {
            this.watcher.refetch({
                where: {
                    parties_none: { id: this.id },
                    user: { id: localStorage.getItem(PP_USER_ID) },
                    name_contains: this.filterQuery,
                    importable: true,
                },
            });
        });
    }

    selectPlaylist(edge: PlaylistEdge) {
        this.selectedPlaylists.push(edge);
    }
    deselectPlaylist(edge: PlaylistEdge) {
        this.selectedPlaylists = this.selectedPlaylists.filter((p) => p.node.id !== edge.node.id);
    }

    handleChangeSelection(ev: boolean, edge: PlaylistEdge) {
        console.log(ev, edge);
        if (ev) {
            this.selectPlaylist(edge);
        } else {
            this.deselectPlaylist(edge);
        }
    }
    handleFilter(event) {
        this.filterQueryChanged.next(event);
    }

    handleDismiss() {
        this.modalCtrl.dismiss();
    }

    importPlaylists() {}
}
