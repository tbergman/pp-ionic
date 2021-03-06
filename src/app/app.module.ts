import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { LocalResolvers } from './graphql/resolvers';
import { FCM } from '@ionic-native/fcm/ngx';
import { FcmService } from './services/fcm.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { GraphQLModule } from './graphql.module';
import { SharedModule } from './shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from 'angularfire2';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { environment } from 'src/environments/environment';

registerLocaleData(en);

library.add(far);
const uri = (environment.production ? environment.backendUrl : '') + '/graphql';
const firebase = {
    apiKey: 'AIzaSyC1eMI4ek5ta6zGGRje6NPOnHdtwc-b3nQ',
    authDomain: 'partyplanner-c76a2.firebaseapp.com',
    databaseURL: 'https://partyplanner-c76a2.firebaseio.com',
    projectId: 'partyplanner-c76a2',
    storageBucket: 'partyplanner-c76a2.appspot.com',
    messagingSenderId: '115558485597',
    appId: '1:115558485597:web:6a85b1da3500e426a307b4',
};

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot({
            mode: 'ios',
        }),
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        NgZorroAntdMobileModule,
        GraphQLModule,
        SharedModule,
        FontAwesomeModule,
        NgZorroAntdModule,
        AngularFireModule.initializeApp(firebase),
        AngularFirestoreModule,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        { provide: NZ_I18N, useValue: en_US },
        FCM,
        FcmService,
        Deeplinks,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
