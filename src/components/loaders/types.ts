import { LucideIcon } from 'lucide-react';

export interface LoaderStep {
  id: number;
  title: string;
  subtitle: string;
  icon: LucideIcon;
}

export interface LoaderChecklistItem {
  id: number;
  title: string;
  subtitle: string;
}

export interface LoaderMetadata {
  title: string;
  subtitle: string;
  location: string;
  tags: string[];
  image: string;
  insightTitle: string;
  insightText: string;
  insightImage: string | null;
  steps: LoaderStep[];
  checklistItems: LoaderChecklistItem[];
}
