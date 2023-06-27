import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MainService } from 'src/app/services/main.service';
import { UserService } from 'src/app/services/user.service';
import { USerData } from 'src/app/types/UserData';
import { SettingsService } from 'src/app/services/settings.service';
import Swal from 'sweetalert2';
import { domain } from 'src/app/services/shared-values.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css'],
})
export class ProfileSettingsComponent implements OnInit, OnDestroy {
  subs_param: Subscription;
  subs_userdata!: Subscription;
  userName!: string;
  userId!: string;
  userData!: USerData;
  profilePath!: string;
  subs_ownerData!: Subscription;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService,
    private _mainService: MainService,
    private _settingsService: SettingsService,
    private _router: Router
  ) {
    this.subs_param = this._activatedRoute.params.subscribe((param) => {
      if (param['id'] && param['username']) {
        const username = param['username'];
        const userId = param['id'];
        this.subs_userdata = this._userService.getUserData(username).subscribe(
          (dataWithName) => {
            this.subs_ownerData = this._mainService
              .getUserData(userId)
              .subscribe(
                (dataWithId) => {
                  if (dataWithId._id === dataWithName._id) {
                    this.userName = dataWithId.full_name;
                    this.userId = dataWithId._id;
                    if (dataWithId.avatar) {
                      this.profilePath = `${domain}/${dataWithId.avatar}`;
                    } else {
                      this.profilePath =
                        '../../../../assets/images/defulat_profile_avatar_of_codebox_2023.png';
                    }
                    this.userData = dataWithId;
                  } else {
                    this._router.navigate(['**']);
                  }
                },
                (err) => {
                  this._router.navigate(['**']);
                }
              );
          },
          (err) => {
            this._router.navigate(['**']);
          }
        );
      }
    });
  }

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  // profile image updation
  subs_profileUpdate!: Subscription;
  handleFileSelect(event: any) {
    this.subs_profileUpdate = this._settingsService
      .profileUpdate(event.target.files[0])
      .subscribe(
        (res: any) => {
          if (res.data) {
            this.profilePath = `${domain}/${res.data.fileName}`;
          }
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            showCloseButton: true,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: 'success',
            title: `${res.message}`,
          });
        },
        (err) => {
          console.log('profile upload error ', err);
          if (err) {
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 4000,
              showCloseButton: true,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
              },
            });

            Toast.fire({
              icon: err.error.status > 400 ? 'error' : 'warning',
              title: `${err.error.message}`,
            });
          }
        }
      );
  }

  openFilePicker() {
    this.fileInput.nativeElement.click();
  }

  ngOnInit(): void {}
  error!: string | null;

  submitAboutForm(aboutForm: NgForm): void {
    const name: any = aboutForm.controls['displayName'];
    let displayName: string = name.value;
    displayName = displayName.trim();
    if (aboutForm.invalid) {
      if (name.errors.required) {
        this.error = 'Name is required!';
      } else if (displayName) {
        displayName = displayName.trim();
        // console.log('empty ', displayName);
      }
    } else {
      const aboutData = aboutForm.value;
      console.log('empty:', displayName.replaceAll('  ', ''));
      console.log('about data: ', aboutData);
    }
  }

  submitSocialForm(socialMedia: NgForm): void {
    if (!this.error) {
      const socialMediaData = socialMedia.value;
      console.log('social media urls: ', socialMediaData);
    }
  }

  clearError() {
    this.error = null;
  }

  ngOnDestroy(): void {
    this.subs_param?.unsubscribe();
    this.subs_ownerData?.unsubscribe();
    this.subs_userdata?.unsubscribe();
    this.subs_profileUpdate?.unsubscribe();
  }
}