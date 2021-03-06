import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Article } from 'src/app/article.model';
import { ArticleService } from 'src/app/services/article.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent implements OnInit {
  id!: string | null;
  currentUser: any;
  canModify: boolean = false;
  article!: Article;
  comment!: string;
  commentArr: any[] = [];
  imgUser!: string;
  isDelete: boolean = false;
  isFollow!: boolean;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private articleService: ArticleService,
    private router: Router
  ) {}
  @HostListener('document:click', ['$event'])
  clickOutside(e: any) {
    if (e.target.className == 'btn btn-outline-danger btn-delete') {
      this.isDelete = true;
    }
    if (
      e.target.className == 'confirm_delete' ||
      e.target.className == 'btn btn-outline-secondary cancel' ||
      e.target.className == 'btn btn-outline-danger confirm'
    ) {
      this.isDelete = false;
    }
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      this.articleService.getArticle(this.id).subscribe(
        (data: any) => {
          this.article = data?.article;
          this.userService
            .getProfile(this.article?.author?.username)
            .subscribe((data: any) => {
              this.isFollow = data?.profile?.following;
            });
          this.userService.getUser().subscribe((data) => {
            this.currentUser = data;
            this.imgUser = this.currentUser?.user?.image;
            this.canModify =
              this.currentUser?.user?.username ===
              this.article?.author?.username;
          });
        },
        (err) => {
          this.router.navigateByUrl('/notfound');
        }
      );
    });

    this.articleService.getComments(this.id).subscribe((data: any) => {
      this.commentArr = data?.comments;
    });
  }
  deleteArticle() {
    this.articleService.deleteArticle(this.article.slug).subscribe((data) => {
      this.router.navigateByUrl('/');
    });
  }

  addComment() {
    if (this.comment === '') {
      return;
    } else {
      this.articleService
        .addComment(this.id, {
          comment: {
            body: this.comment,
          },
        })
        .subscribe((a: any) => {
          this.articleService.getComments(this.id).subscribe((data: any) => {
            this.commentArr = data?.comments;
            this.comment = '';
          });
        });
    }
  }

  deleteComment(comment: any) {
    this.articleService.deleteComment(this.id, comment);
    this.commentArr = this.commentArr.filter((cmt) => {
      return comment?._id !== cmt?._id;
    });
  }

  follow() {
    if (!localStorage.getItem('token')) {
      this.router.navigateByUrl('/signin');
    }
    this.userService
      .follow(this.article?.author?.username)
      .subscribe((data: any) => {
        this.isFollow = data?.profile?.following;
      });
  }

  unfollow() {
    if (!localStorage.getItem('token')) {
      this.router.navigateByUrl('/signin');
    }
    this.userService
      .unfollow(this.article?.author?.username)
      .subscribe((data: any) => {
        this.isFollow = data?.profile?.following;
      });
  }

  toggleLike(isFavoried: boolean | undefined, slug: string | undefined) {
    if (!localStorage.getItem('token')) {
      this.router.navigateByUrl('/signin');
    }
    if (isFavoried) {
      this.articleService.unFavorite(slug).subscribe((data: any) => {
        this.article = data?.article;
      });
    } else {
      this.articleService.favorite(slug).subscribe((data: any) => {
        this.article = data?.article;
      });
    }
  }
}
