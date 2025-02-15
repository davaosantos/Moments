import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { MomentService } from 'src/app/services/moment.service';
import { Moment } from 'src/app/interfaces/Moment';
import { Router , ActivatedRoute} from '@angular/router';
import { environment } from 'src/environments/environment';
import { faTimes , faEdit} from '@fortawesome/free-solid-svg-icons';
import { MessagesService } from 'src/app/services/messages.service';
import { Comment } from 'src/app/interfaces/Comment';
import { CommentService } from 'src/app/services/comment.service';


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

  commentForm! : FormGroup;

  constructor(
    private momentService : MomentService, 
    private route : ActivatedRoute,
    private messageService : MessagesService,
    private router : Router,
    private commentService : CommentService
  ) { }

  ngOnInit(): void {

    // id que está na URL 
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService
    .getMoment(id)
    .subscribe(item => this.moment = item.data);

    this.commentForm = new FormGroup({
      text : new FormControl('', [Validators.required]),
      username : new FormControl('', [Validators.required] )

    })

  }

  get text(){
    return this.commentForm.get('text')!;
  }

  get username(){
    return this.commentForm.get('username')!;
  }

  async removeHandler(id: number){
    await this.momentService.removeMoment(id).subscribe()
    this.messageService.add("Momento excluido com sucesso")
    this.router.navigate(['/'])

  }

  async onSubmit(formDirective : FormGroupDirective){
    if(this.commentForm.invalid){
      return;
    }

    const data: Comment = this.commentForm.value;
    data.momentId = Number(this.moment!.id);

    await this.commentService.createComment(data).subscribe((comment) => this.moment!.comments!.push(comment.data));

    this.messageService.add("Comentário adicionado com sucesso");
    
    //Reseta o Form
    this.commentForm.reset();

    formDirective.resetForm();

  }

}
