import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { SharedFunctionsService } from '../shared/shared-functions.service';
import { Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'app-project-home',
  templateUrl: './project-home.component.html',
  styleUrl: './project-home.component.scss',
})
export class ProjectHomeComponent implements OnInit, OnDestroy {
  constructor() {}
  projectName = 'Projects';
  shared = inject(SharedFunctionsService);
  sub!: Subscription;
  ngOnInit(): void {
    this.sub = this.shared.scramble(this.projectName, 70).subscribe({
      next: (scrambledData) => {
        this.projectName = scrambledData;
      },
      complete: () => {
        this.sub.unsubscribe();
      },
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
