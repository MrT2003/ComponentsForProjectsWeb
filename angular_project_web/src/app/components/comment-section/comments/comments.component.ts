import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../pagination/pagination.component';
import { CommentUploadComponent } from '../comment-upload/comment-upload.component';
import { CommentComponent } from '../comment/comment.component';
import { Comment } from '../../../model/Comment';
import { CommentService } from '../../../service/CommentService/comment.service';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, PaginationComponent, CommentComponent, CommentUploadComponent],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  @Input() movieId!: string;
  comments: Comment[] = [];
  currentPage: number = 1; // Current page number
  totalPages: number = 1; // Total number of pages
  limit: number = 10; // Number of comments per page

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.loadComments();
  }

  // Load comments with pagination
  loadComments(): void {
    this.commentService.getComments(this.movieId, this.currentPage, this.limit).subscribe({
      next: (data) => {
        this.comments = data.comments;
        this.totalPages = data.totalPages;
        this.currentPage = data.currentPage;
      },
      error: (err) => {
        console.error('Error fetching comments:', err);
      },
    });
  }

  // Handle page change
  onPageChange(newPage: number): void {
    if (newPage > 0 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.loadComments();
    }
  }

  // Add new comment to the top of the list
  onCommentAdded(newComment: Comment): void {
    this.comments.unshift(newComment);
  }
}
