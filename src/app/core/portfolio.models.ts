export interface NavLink {
  path: string;
  label: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Skill {
  name: string;
  level: string;
}

export interface SkillBar {
  name: string;
  percent: number;
}

export interface Card {
  title: string;
  text: string;
  icon?: string;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  description: string;
  category: 'Web' | 'Mobile' | 'API';
  tags: string[];
  thumb: string;
  year: string;
  role: string;
  features: string[];
  link?: string;
}

export interface Experience {
  period: string;
  role: string;
  org: string;
  text: string;
}

export interface Plan {
  title: string;
  amount: string;
  text: string;
  featured?: boolean;
}

export interface Review {
  text: string;
  author: string;
}

export interface Faq {
  q: string;
  a: string;
}
