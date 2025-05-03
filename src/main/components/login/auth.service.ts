import { computed, Injectable, signal } from '@angular/core';
import { User } from '../../../app/data-access/models/base-api.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #user = signal<User | null>(null);
  isLoggedIn = computed(() => !!this.#user());
  user = this.#user.asReadonly();
  setUser(user:User | null) {
    this.#user.set(user);
  }
}
