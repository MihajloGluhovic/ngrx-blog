import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {Store, select} from '@ngrx/store';
import {Subscription, combineLatest, filter} from 'rxjs';
import {selectCurrentUser} from 'src/app/auth/store/reducers';
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface';
import {selectIsSubmitting, selectValidationErrors} from '../store/reducers';
import {CommonModule} from '@angular/common';
import {BackendErrorsMessages} from 'src/app/shared/components/backendErrorMessages/backendErrorMessages.component';
import {CurrentUserRequestInterface} from 'src/app/shared/types/currentUserRequest.interface';
import {authActions} from 'src/app/auth/store/actions';

@Component({
  selector: 'mc-settings',
  templateUrl: './settings.component.html',
  standalone: true,
  imports: [CommonModule, BackendErrorsMessages, ReactiveFormsModule],
})
export class SettingsComponent implements OnInit, OnDestroy {
  form = this.fb.nonNullable.group({
    image: '',
    username: '',
    bio: '',
    email: '',
    password: '',
  });
  currentUser?: CurrentUserInterface;
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  });
  currentUserSubscription?: Subscription;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.currentUserSubscription = this.store
      .pipe(select(selectCurrentUser), filter(Boolean))
      .subscribe((currentUser) => {
        this.currentUser = currentUser;
        this.initializeForm();
      });
  }

  ngOnDestroy(): void {
    this.currentUserSubscription?.unsubscribe();
  }

  initializeForm() {
    if (!this.currentUser) {
      throw new Error('curent user is not set');
    }
    this.form.patchValue({
      image: this.currentUser.image ?? '',
      username: this.currentUser.username,
      bio: this.currentUser.bio ?? '',
      email: this.currentUser.email,
      password: '',
    });
  }

  submit(): void {
    if (!this.currentUser) {
      throw new Error('current user is not set');
    }
    const currentUserRequest: CurrentUserRequestInterface = {
      user: {
        ...this.currentUser,
        ...this.form.getRawValue(),
      },
    };

    this.store.dispatch(authActions.updateCurrentUser({currentUserRequest}));
  }

  logout(): void {
    this.store.dispatch(authActions.logout());
  }
}
