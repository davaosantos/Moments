import {Component, OnInit} from '@angular/core';
import {MomentService} from "../../../services/moment.service";
import {Moment} from "../../../interfaces/Moment";
import {environment} from "src/environments/environment";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allMoments: Moment[] = [];

  filteredMoments: Moment[] = [];

  baseApiUrl = environment.baseApiUrl;

  //TODO search

  constructor(private momentService: MomentService) {

  }

  ngOnInit(): void {
    this.momentService.getMoments().subscribe(
      (items) => {
        const data = items.data;

        data.map((item) => {
          item.created_at = new Date(item.created_at!).toLocaleDateString('pt-BR');
        })

        this.allMoments = data;
        this.filteredMoments = data;

        console.log(this.allMoments)
      })
  }

}
