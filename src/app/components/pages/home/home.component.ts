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

  faSearch = faSearch

  searchTerm : String = "";

  allMoments: Moment[] = [];

  filteredMoments: Moment[] = [];

  baseApiUrl = environment.baseApiUrl;

  //TODO search
  search(e : Event) : void{
    const target = e.target as HTMLInputElement
    const value = target.value

    console.log(value)

    this.filteredMoments = this.allMoments.filter((moment) => {
      return moment.title.toLowerCase().includes(value.toLowerCase())
    })

    console.log(this.filteredMoments)
  }

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
