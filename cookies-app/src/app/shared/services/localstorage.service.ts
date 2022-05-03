import { Inject, Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  constructor(@Inject('Window') protected window: Window) {}

  set(key: string, data: any): void {
    try {
      this.window.localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  get(key: string) {
    try {
      return JSON.parse(this.window.localStorage.getItem(key)!);
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }
}