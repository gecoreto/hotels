import { Component, OnInit } from '@angular/core';
import { hotelI, hotelsDummy } from '../models/hotel.interface';
import { HotelService } from '../services/hotel.service';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.scss']
})
export class HotelListComponent implements OnInit {

  hotels: hotelI[] = [];
  hotelsBack: hotelI[] = [];

  constructor(private hotelS: HotelService) { }

  ngOnInit() {
    this.getHotels();
  }

  getHotels() {
    this.hotelS.getHotels().subscribe(
      (hotels) => {
        this.hotels = hotels
        //Array para mantener los hoteles originales al filtrar desde front
        this.hotelsBack = this.hotels;
      },
      err => {
        alert('Estamos presentando incovenientes...');
        console.log('Error', err);
      }
    );
  }

  getStars(cant: number) {
    let total = [];
    for (let i = 0; i < cant; i++) {
      total[i] = i;
    }
    return total;
  }

  filterSelected(evn: ({ stars?: ({ number: number, active: boolean, total: any[] })[], nameHotel: string, allStars: boolean })) {
    //Filtrar sin llamar al servidor
    // this.filterInFrontend(evn);

    /**
     * Filtro llamando al backend
     */
    let starSeleted = [];
    //Filtro por la estrella seleccionada
    evn.stars.forEach((star) => {
      if (star.active) {
        starSeleted.push(star.number);
      }
    });
    this.hotelS.searchHeroes(evn.allStars, evn.nameHotel, starSeleted).subscribe(
      (hotels) => {
        this.hotels = hotels
        //Array para mantener los hoteles originales al filtrar desde front
        this.hotelsBack = this.hotels;
      },
      err => {
        alert('Estamos presentando incovenientes...');
        console.log('Error', err);
      }
    );
  }

  filterInFrontend(evn: ({ stars?: ({ number: number, active: boolean, total: any[] })[], nameHotel: string })) {
    this.hotels = this.hotelsBack;
    this.hotels = this.hotels.filter((hotel, index) => {
      let starSeleted = [];
      //Filtro por la estrella seleccionada
      evn.stars.forEach((star) => {
        if (star.active) {
          starSeleted.push(star.number);
        }
      });
      //Filtro por el nombre seleccionado
      let validateNameHotel: boolean = (evn.nameHotel !== null) ? (hotel.name.toUpperCase().indexOf(evn.nameHotel.toUpperCase()) > -1) : true;
      //Devuelvo las validaciones correxpondientes
      return validateNameHotel && starSeleted.indexOf(hotel.stars) >= 0;
    });
  }

}
