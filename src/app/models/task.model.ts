export interface Skill {
  name: string;
}

export interface Person {
  fullName: string;
  age: number;
  skills: Skill[];
}

export interface Task {
  id: number;
  title: string;
  deadline: string;
  completed: boolean;
  persons: Person[];
}
