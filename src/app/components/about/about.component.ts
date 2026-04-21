import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';
import { Experience, SkillCategory } from '../../models/portfolio.models';

import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnInit {
  experiences: Experience[] = [];
  skillCategories: SkillCategory[] = [];
  isLoadingExperiences = true;
  isLoadingSkills = true;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.loadExperiences();
    this.loadSkills();
  }

  private loadExperiences(): void {
    this.portfolioService.getExperiences().subscribe({
      next: (data) => {
        this.experiences = data;
        this.isLoadingExperiences = false;
      },
      error: (err) => {
        console.error('Error loading experiences:', err);
        this.isLoadingExperiences = false;
      },
    });
  }

  private loadSkills(): void {
    this.portfolioService.getSkills().subscribe({
      next: (data) => {
        this.skillCategories = data;
        this.isLoadingSkills = false;
      },
      error: (err) => {
        console.error('Error loading skills:', err);
        this.isLoadingSkills = false;
      },
    });
  }
}
