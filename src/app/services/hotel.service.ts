import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {
  HttpClient, HttpParams
} from '@angular/common/http';
import { hotelI } from '../models/hotel.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private http: HttpClient) {
  }

  getHotels(): Observable<hotelI[]> {
    let url = environment.service.ListHotels.endpoint;
    return this.http.get<hotelI[]>(url);
  }

  searchHeroes(allStars: boolean, term?: string, stars?: string[]): Observable<hotelI[]> {
    let url = environment.service.searchHotels.endpoint;
    let params = new HttpParams();
    params = params.append('allStars', allStars ? '1' : '0');
    if (term) {
      term = term.trim();
      params = params.append('name', term);
    }
    if (stars && stars.length > 0) {
      params = params.append('stars', stars.join(','));
    }

    // Add safe, URL encoded search parameter if there is a search term
    const options = (term || stars) ?
      { 'params': params } : {};

    return this.http.get<hotelI[]>(url, options);
  }

}
