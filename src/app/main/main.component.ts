import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { SharedFunctionsService } from '../shared/shared-functions.service';
import { Subscription, delay } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit, OnDestroy {
  constructor() {}
  name: any = 'Otari Nozadze';
  sharedFunctions = inject(SharedFunctionsService);
  sub!: Subscription;
  ngOnInit(): void {
    this.sub = this.sharedFunctions.scramble(this.name, 70).subscribe({
      next: (newName) => {
        this.name = newName;
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
