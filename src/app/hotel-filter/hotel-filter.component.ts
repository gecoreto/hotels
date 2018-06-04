import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-hotel-filter',
  templateUrl: './hotel-filter.component.html',
  styleUrls: ['./hotel-filter.component.scss']
})
export class HotelFilterComponent implements OnInit {

  @Output() filterSelected = new EventEmitter<any>();

  vform: FormGroup;
  stars: ({ number: number, active: boolean, total: any[] })[] = [];
  allStars: boolean = true;

  showFilters: boolean = (window.innerWidth > 576);
  showFilterName: boolean = true;
  showFilterStars: boolean = true;

  constructor(public fb: FormBuilder) {
  }

  ngOnInit() {
    //Inicializar validaciones del formulario
    this.vform = this.fb.group({
      'nameHotel': [null, Validators.required],
    });
    //Inicializar estrellas
    for (let index = 5; index > 0; index--) {
      let total = [];
      for (let i = 0; i < index; i++) {
        total[i] = (i + 1);
      }
      this.stars.push({
        number: index,
        active: true,
        total: total
      });
    }
  }

  searchByName() {
    if (this.vform.valid) {
      //Emito el output para filtrar el listado de hoteles
      this.filterSelected.emit({
        'stars': this.stars,
        'nameHotel': this.vform.value['nameHotel'],
        'allStars': this.allStars
      });
    }
  }

  onchangeAllStar(evn) {
    //marco/desmarco las estrella como seleccionada
    this.stars.forEach((item) => {
      item.active = evn.currentTarget.checked;
    });
    //Emito el output para filtrar el listado de hoteles
    this.filterSelected.emit({
      'stars': this.stars,
      'nameHotel': this.vform.value['nameHotel'],
      'allStars': this.allStars
    });
  }

  onchangeStar(evn) {
    const star = parseInt(evn.currentTarget.value);
    //marco la estrella como seleccionada
    this.stars.forEach((item) => {
      if (item.number == star) {
        item.active = evn.currentTarget.checked;
      }
    });
    //Emito el output para filtrar el listado de hoteles
    this.filterSelected.emit({
      'stars': this.stars,
      'nameHotel': this.vform.value['nameHotel'],
      'allStars': this.allStars
    });
  }
}
