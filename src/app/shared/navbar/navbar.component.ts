import {
  Component,
  Output,
  EventEmitter,
  OnDestroy,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
  Inject,
  Renderer2,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList,
  HostListener,
} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { LayoutService } from "../services/layout.service";
import { Subscription } from "rxjs";
import { ConfigService } from "../services/config.service";
import { DOCUMENT } from "@angular/common";
import { CustomizerService } from "../services/customizer.service";
import { FormControl } from "@angular/forms";
import { LISTITEMS } from "../data/template-search";
import { Router } from "@angular/router";

import { map, switchMap } from "rxjs/operators";
import { Observable } from "rxjs";
import "rxjs/add/operator/map";
import firebase from "firebase/app";
import { ProfileService } from "../../shared/services/profile.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {
  currentLang = "en";
  selectedLanguageText = "English";
  selectedLanguageFlag = "./assets/img/flags/us.png";
  toggleClass = "ft-maximize";
  placement = "bottom-right";
  logoUrl = "assets/img/eklogo.png";
  menuPosition = "Side";
  isSmallScreen = false;
  protected innerWidth: any;
  searchOpenClass = "";
  transparentBGClass = "";
  hideSidebar: boolean = true;
  public isCollapsed = true;
  layoutSub: Subscription;
  configSub: Subscription;

  @ViewChild("search") searchElement: ElementRef;
  @ViewChildren("searchResults") searchResults: QueryList<any>;

  @Output()
  toggleHideSidebar = new EventEmitter<Object>();

  @Output()
  seachTextEmpty = new EventEmitter<boolean>();

  listItems = [];
  control = new FormControl();

  public config: any = {};
  name;
  role;
  constructor(
    public translate: TranslateService,
    private layoutService: LayoutService,
    private router: Router,
    private configService: ConfigService,
    private cdr: ChangeDetectorRef,
    public ph: ProfileService
  ) {
    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|es|pt|de/) ? browserLang : "en");
    this.config = this.configService.templateConf;
    this.innerWidth = window.innerWidth;

    this.layoutSub = layoutService.toggleSidebar$.subscribe((isShow) => {
      this.hideSidebar = !isShow;
    });

    this.startUp()
  }

  ngOnInit() {
    this.listItems = LISTITEMS;

    if (this.innerWidth < 1200) {
      this.isSmallScreen = true;
    } else {
      this.isSmallScreen = false;
    }

    this.startUp()
  }

  startUp() {
    console.log("profileServ PROFILE SERVICE", this.ph);
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        // if this is not a user then show entrance scene and hide status bar

        console.log("USER EXISTS:::", user);
        console.log("USER DOESNT NOT EXISTS");

        unsubscribe();
      } else {
        console.log("USER EXISTS:::", user);
        unsubscribe();
        // Check If the connection is okay or bad.
        this.ph
          .getAllUsers()
          .child(this.ph.id)
          .on("value", (userProfileSnapshot) => {
            console.log("USER PROFILE SNAPSHOT::", userProfileSnapshot.val());

            console.log("PROFILE ID::", this.ph.id);
            this.name = userProfileSnapshot.val().name;
            this.role = userProfileSnapshot.val().role;


            console.log(" NAME" + this.name);
            console.log("ROLE" + this.role);
                // this.router.navigate(["/dashboard/dashboard1"]);

          });
      }
    });
  }

  ngAfterViewInit() {
    this.configSub = this.configService.templateConf$.subscribe(
      (templateConf) => {
        if (templateConf) {
          this.config = templateConf;
        }
        this.loadLayout();
        this.cdr.markForCheck();
      }
    );
  }
  users() {
    this.router.navigate(["users"]);
}
 

  ngOnDestroy() {
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
    if (this.configSub) {
      this.configSub.unsubscribe();
    }
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.innerWidth = event.target.innerWidth;
    if (this.innerWidth < 1200) {
      this.isSmallScreen = true;
    } else {
      this.isSmallScreen = false;
    }
  }

  loadLayout() {
    if (
      this.config.layout.menuPosition &&
      this.config.layout.menuPosition.toString().trim() != ""
    ) {
      this.menuPosition = this.config.layout.menuPosition;
    }

    if (this.config.layout.variant === "Light") {
      this.logoUrl = "assets/img/logo-dark.png";
    } else {
      this.logoUrl = "assets/img/logo.png";
    }

    if (this.config.layout.variant === "Transparent") {
      this.transparentBGClass = this.config.layout.sidebar.backgroundColor;
    } else {
      this.transparentBGClass = "";
    }
  }

  onSearchKey(event: any) {
    if (this.searchResults && this.searchResults.length > 0) {
      this.searchResults.first.host.nativeElement.classList.add(
        "first-active-item"
      );
    }

    if (event.target.value === "") {
      this.seachTextEmpty.emit(true);
    } else {
      this.seachTextEmpty.emit(false);
    }
  }

  removeActiveClass() {
    if (this.searchResults && this.searchResults.length > 0) {
      this.searchResults.first.host.nativeElement.classList.remove(
        "first-active-item"
      );
    }
  }

  onEscEvent() {
    this.control.setValue("");
    this.searchOpenClass = "";
    this.seachTextEmpty.emit(true);
  }

  onEnter() {
    if (this.searchResults && this.searchResults.length > 0) {
      let url = this.searchResults.first.url;
      if (url && url != "") {
        this.control.setValue("");
        this.searchOpenClass = "";
        this.router.navigate([url]);
        this.seachTextEmpty.emit(true);
      }
    }
  }

  redirectTo(value) {
    this.router.navigate([value]);
    this.seachTextEmpty.emit(true);
  }

  ChangeLanguage(language: string) {
    this.translate.use(language);

    if (language === "en") {
      this.selectedLanguageText = "English";
      this.selectedLanguageFlag = "./assets/img/flags/us.png";
    } else if (language === "es") {
      this.selectedLanguageText = "Spanish";
      this.selectedLanguageFlag = "./assets/img/flags/es.png";
    } else if (language === "pt") {
      this.selectedLanguageText = "Portuguese";
      this.selectedLanguageFlag = "./assets/img/flags/pt.png";
    } else if (language === "de") {
      this.selectedLanguageText = "German";
      this.selectedLanguageFlag = "./assets/img/flags/de.png";
    }
  }

  ToggleClass() {
    if (this.toggleClass === "ft-maximize") {
      this.toggleClass = "ft-minimize";
    } else {
      this.toggleClass = "ft-maximize";
    }
  }

  toggleSearchOpenClass(display) {
    this.control.setValue("");
    if (display) {
      this.searchOpenClass = "open";
      setTimeout(() => {
        this.searchElement.nativeElement.focus();
      }, 0);
    } else {
      this.searchOpenClass = "";
    }
    this.seachTextEmpty.emit(true);
  }

  toggleNotificationSidebar() {
    this.layoutService.toggleNotificationSidebar(true);
  }

  toggleSidebar() {
    this.layoutService.toggleSidebarSmallScreen(this.hideSidebar);
  }
}
