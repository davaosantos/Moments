import { Component, OnInit } from '@angular/core';
import { MomentService } from 'src/app/services/moment.service';
import { Moment } from 'src/app/interfaces/Moment';
import { Router , ActivatedRoute} from '@angular/router';
import { environment } from 'src/environments/environment';
import { faTimes , faEdit} from '@fortawesome/free-solid-svg-icons';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent implements OnInit {

  moment? : Moment;
  baseApiUrl = environment.baseApiUrl
  faTimes = faTimes;
  faEdit = faEdit;

  constructor(
    private momentService : MomentService, 
    private route : ActivatedRoute,
    private messageService : MessagesService,
    private router : Router
  ) { }

  ngOnInit(): void {

    // id que está na URL 
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService
    .getMoment(id)
    .subscribe(item => this.moment = item.data);

  }

  async removeHandler(id: number){
    await this.momentService.removeMoment(id).subscribe()
    this.messageService.add("Momento excluido com sucesso")
    this.router.navigate(['/'])

  }

}
