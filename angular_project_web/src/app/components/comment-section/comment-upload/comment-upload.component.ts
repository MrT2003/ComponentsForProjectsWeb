import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../service/AuthService/auth.service';
import { CommentService } from '../../../service/CommentService/comment.service';
import { Comment } from '../../../model/Comment';

@Component({
  selector: 'app-comment-upload',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './comment-upload.component.html',
  styleUrls: ['./comment-upload.component.css'],
})
export class CommentUploadComponent implements OnInit {
  avatarPath!: string;
  @Input() movieId!: string; // The ID of the movie being commented on
  @Output() commentAdded = new EventEmitter<Comment>(); // Emit the new comment

  commentText = ''; // Two-way bound to the textarea

  constructor(
    private authService: AuthService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.avatarPath = user?.avatar || 'assets/images/avatar.jpg';
    });
  }

  createComment(): void {
    // Validate comment text
    if (!this.commentText.trim()) {
      alert('Comment cannot be empty!');
      return;
    }

    // Call the CommentService to create a new comment
    this.commentService.createComment(this.movieId, this.commentText).subscribe({
      next: (newComment) => {
        // Clear the input field
        this.commentText = '';

        // Emit the newly created comment
        this.commentAdded.emit(newComment);
      },
      error: (err) => {
        console.error('Error creating comment:', err);
        alert('Failed to add comment. Please try again.');
      },
    });
  }
}
