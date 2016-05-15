import { Component, AfterViewInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Routes, Router } from '@angular/router';

import { NameListService } from './shared/index';

import { HomeComponent } from './+home/index';
import { DashboardComponent } from './+dashboard/index';
import { AboutComponent } from './+about/index';

declare var componentHandler: any;
declare var document: any;

enum MQDevice {
  Phone,
  Tablet,
  Desktop
}

enum MQScreenSize {
  Small,
  Large
}

@Component({
  selector: 'sd-app',
  viewProviders: [NameListService],
  templateUrl: 'app/app.component.html',
  directives: [ROUTER_DIRECTIVES]
})
@Routes([
  {
    path: '/',
    component: HomeComponent
  },
  {
    path: '/dashboard',
    component: DashboardComponent
  },
  {
    path: '/about',
    component: AboutComponent
  }
])
/**
 * This class represents the main application component.
 * Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy
 * loaded components (HomeComponent, AboutComponent).
 */
export class AppComponent implements AfterViewInit {

  //------------------------------------------------------------------------------
  //
  //  Properties
  //
  //------------------------------------------------------------------------------

  //--------------------------------------
  //  Authentication
  //--------------------------------------

  get isSignedIn(): Boolean {
    return this.auth != null;
  }

  //--------------------------------------
  //  Route
  //--------------------------------------

  public activeRouteName: String;

  //--------------------------------------
  //  Fullscreen
  //--------------------------------------

  get isFullscreenEnabled(): Boolean {
    return document.fullScreenEnabled ||
           document.mozFullScreenEnabled ||
           document.webkitFullscreenEnabled ||
           document.msFullscreenEnabled;
  }

  get isFullscreen(): Boolean {
    return document.fullScreenElement ||
           document.mozFullScreenElement ||
           document.webkitFullscreenElement ||
           document.msFullscreenElementd;
  }

  //------------------------------------------------------------------------------
  //
  //  Fields
  //
  //------------------------------------------------------------------------------

  private mdlObfuscator: HTMLElement;

  //--------------------------------------
  //  Authentication
  //--------------------------------------

  private auth: any = null;

  private signInModelUsername: String;
  private signInModelPassword: String;
  private signInModelRemember: Boolean;

  //------------------------------------------------------------------------------
  //
  //  Constructor
  //
  //------------------------------------------------------------------------------

  constructor(public router: Router) {
    router.changes.subscribe(() => {
      switch (location.pathname) {
        case '/':
          this.activeRouteName = 'Home';
          break;
        case '/about':
          this.activeRouteName = 'About';
          break;
      }

      if (this.mdlObfuscator && this.mdlObfuscator.classList.contains('is-visible')) {
        this.mdlObfuscator.click();
      }
    });

    if (localStorage.getItem('id_token') || sessionStorage.getItem('id_token')) {
      this.auth = {};
    }
  }

  //------------------------------------------------------------------------------
  //
  //  Methods
  //
  //------------------------------------------------------------------------------

  //--------------------------------------
  //  Authentication
  //--------------------------------------

  signIn() {
    if (this.signInModelUsername && this.signInModelPassword) {
      this.auth = {};

      if (this.signInModelRemember) {
        localStorage.setItem('id_token', 'sampleTokenName');
      } else {
        sessionStorage.setItem('id_token', 'sampleTokenName');
      }
    }

    this.signInModelUsername = '';
    this.signInModelPassword = '';
    this.signInModelRemember = false;

    document.getElementById('signin-username-textfield').classList.remove('is-dirty');
    document.getElementById('signin-password-textfield').classList.remove('is-dirty');
    document.getElementById('signin-remember-checkbox').classList.remove('is-checked');
  }

  signOut() {
    this.auth = null;

    localStorage.removeItem('id_token');
    sessionStorage.removeItem('id_token');
  }

  //--------------------------------------
  //  Route
  //--------------------------------------

  isActiveRoute(pathName: String): Boolean {
    if (location.pathname === pathName) {
      return true;
    } else {
      return false;
    }
  }

  //--------------------------------------
  //  Fullscreen
  //--------------------------------------

  requestFullScreen() {
    if (document.documentElement.requestFullScreen) {
      document.documentElement.requestFullScreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
      document.documentElement.webkitRequestFullScreen();
    } else if (document.documentElement.msRequestFullScreen) {
      document.documentElement.msRequestFullScreen();
    }
  }

  exitFullScreen() {
    if (document.exitFullscreen ) {
      document.exitFullscreen ();
    } else if (document.mozCancelFullScreen ) {
      document.mozCancelFullScreen ();
    } else if (document.webkitExitFullscreen ) {
      document.webkitExitFullscreen ();
    } else if (document.msExitFullscreen ) {
      document.msExitFullscreen ();
    }
  }

  //------------------------------------------------------------------------------
  //
  //  Event handlers
  //
  //------------------------------------------------------------------------------

  private onMQDeviceChanged(currentMQDevice: MQDevice) {
    console.debug('MQDevice changed: %s', MQDevice[currentMQDevice]);
  }

  private onMQScreenSizeChanged(currentMQScreenSize: MQScreenSize) {
    console.debug('MQScreenSize changed: %s', MQScreenSize[currentMQScreenSize]);

    let mdlMenuContainers = document.getElementsByClassName('mdl-menu__container');
    for(let container of mdlMenuContainers){
     container.classList.remove('is-visible');
    }
  }

  //------------------------------------------------------------------------------
  //
  //  Lifecycle hooks
  //
  //------------------------------------------------------------------------------

  ngAfterViewInit() {
    componentHandler.upgradeAllRegistered();

    this.mdlObfuscator = <HTMLElement>document.getElementsByClassName('mdl-layout__obfuscator')[0];

    let currentMQDevice: MQDevice;
    let currentMQScreenSize: MQScreenSize;

    if (window.innerWidth <= 479) {
      currentMQDevice = MQDevice.Phone;
    } else if (window.innerWidth >= 480 && window.innerWidth <= 839) {
      currentMQDevice = MQDevice.Tablet;
    } else if (window.innerWidth >= 840) {
      currentMQDevice = MQDevice.Desktop;
    }

    if (window.innerWidth <= 1024) {
      currentMQScreenSize = MQScreenSize.Small;
    } else if (window.innerWidth >= 1025) {
      currentMQScreenSize = MQScreenSize.Large;
    }

    window.addEventListener('resize', () => {
      if (window.innerWidth <= 479) {
        if (currentMQDevice != MQDevice.Phone) {
          currentMQDevice = MQDevice.Phone;
          this.onMQDeviceChanged(currentMQDevice);
        }
      } else if (window.innerWidth >= 480 && window.innerWidth <= 839) {
        if (currentMQDevice != MQDevice.Tablet) {
          currentMQDevice = MQDevice.Tablet;
          this.onMQDeviceChanged(currentMQDevice);
        }
      } else if (window.innerWidth >= 840) {
        if (currentMQDevice != MQDevice.Desktop) {
          currentMQDevice = MQDevice.Desktop;
          this.onMQDeviceChanged(currentMQDevice);
        }
      }

      if (window.innerWidth <= 1024) {
        if (currentMQScreenSize != MQScreenSize.Small) {
          currentMQScreenSize = MQScreenSize.Small;
          this.onMQScreenSizeChanged(currentMQScreenSize);
        }
      } else if (window.innerWidth >= 1025) {
        if (currentMQScreenSize != MQScreenSize.Large) {
          currentMQScreenSize = MQScreenSize.Large;
          this.onMQScreenSizeChanged(currentMQScreenSize);
        }
      }
    }, false);
  }

}
