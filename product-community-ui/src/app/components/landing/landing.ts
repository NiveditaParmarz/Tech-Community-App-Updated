import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing',
  imports: [RouterModule],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class LandingComponent implements OnInit, AfterViewInit, OnDestroy {
  private text = 'Get Answers. Share Knowledge. Build Together.';
  private index = 0;
  private typingInterval: any;
  private resetTimeout: any;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.startTypingAnimation();
  }

  ngOnDestroy(): void {
    this.clearIntervals();
  }

  private startTypingAnimation(): void {
    this.typeWriter();
  }

  private typeWriter(): void {
    const typingElement = document.querySelector('.typing-text') as HTMLElement;
    
    if (typingElement) {
      if (this.index < this.text.length) {
        typingElement.textContent += this.text.charAt(this.index);
        this.index++;
        this.typingInterval = setTimeout(() => this.typeWriter(), 100);
      } else {
        // Wait 2 seconds then clear and restart
        this.resetTimeout = setTimeout(() => {
          typingElement.textContent = '';
          this.index = 0;
          this.typeWriter();
        }, 2000);
      }
    }
  }

  private clearIntervals(): void {
    if (this.typingInterval) {
      clearTimeout(this.typingInterval);
    }
    if (this.resetTimeout) {
      clearTimeout(this.resetTimeout);
    }
  }
}
