import { Component } from '@angular/core';
import { PaginationComponent } from '../../pagination/pagination.component';
import { CommentUploadComponent } from '../comment-upload/comment-upload.component';
import { CommentComponent } from '../comment/comment.component';
@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [PaginationComponent, CommentComponent, CommentUploadComponent],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {

}
