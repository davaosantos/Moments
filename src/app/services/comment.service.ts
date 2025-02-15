import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs'; // Pois terei um observable para adicionar um comentário

import { environment } from 'src/environments/environment'; // Com as variaveis de URL da api
import { Comment } from '../interfaces/Comment'; // Interfaces de comentario e Response
import { Response } from '../interfaces/Response';
import { env } from 'process';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private baseApiUrl = environment.baseApiUrl; // URL da API
  private apiUrl = `${this.baseApiUrl}api/moments`

  constructor(private http : HttpClient) { }

  createComment(data : Comment) : Observable<Response<Comment>>{
    const url = `${this.apiUrl}/${data.momentId}/comments`

    console.log(url);
    return this.http.post<Response<Comment>>(url, data);
  }
}
