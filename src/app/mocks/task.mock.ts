import { Task } from 'src/app/models/task.model';

export const MOCKTASKS: Task[] =
  [
    {
      "id": 1,
      "title": "Task 1",
      "completed": true,
      "deadline": "2024-09-30T10:00:00.000Z",
      "persons": [
        {
          "fullName": "John Doe",
          "age": 30,
          "skills": [
            { "name": "JavaScript" },
            { "name": "React" }
          ]
        },
        {
          "fullName": "Jane Smith",
          "age": 28,
          "skills": [
            { "name": "TypeScript" },
            { "name": "Node.js" }
          ]
        }
      ]
    },
    {
      "id": 2,
      "title": "Task 2",
      "completed": false,
      "deadline": "2024-10-05T12:00:00.000Z",
      "persons": [
        {
          "fullName": "Alice Brown",
          "age": 25,
          "skills": [
            { "name": "HTML" },
            { "name": "CSS" },
            { "name": "SASS" }
          ]
        },
        {
          "fullName": "Bob White",
          "age": 32,
          "skills": [
            { "name": "Photoshop" },
            { "name": "Illustrator" }
          ]
        }
      ]
    },
    {
      "id": 3,
      "title": "Task 3",
      "completed": false,
      "deadline": "2024-10-10T14:00:00.000Z",
      "persons": [
        {
          "fullName": "Charlie Black",
          "age": 35,
          "skills": [
            { "name": "Python" },
            { "name": "Django" }
          ]
        },
        {
          "fullName": "Diana Green",
          "age": 29,
          "skills": [
            { "name": "Ruby" },
            { "name": "Rails" }
          ]
        }
      ]
    },
    {
      "id": 4,
      "title": "Task 4",
      "completed": false,
      "deadline": "2024-10-15T09:00:00.000Z",
      "persons": [
        {
          "fullName": "Edward Gray",
          "age": 40,
          "skills": [
            { "name": "Java" },
            { "name": "Spring" }
          ]
        },
        {
          "fullName": "Fiona Silver",
          "age": 27,
          "skills": [
            { "name": "Go" },
            { "name": "Kubernetes" }
          ]
        }
      ]
    },
    {
      "id": 5,
      "title": "Task 5",
      "completed": false,
      "deadline": "2024-10-20T11:00:00.000Z",
      "persons": [
        {
          "fullName": "George Blue",
          "age": 38,
          "skills": [
            { "name": "C#" },
            { "name": "ASP.NET" }
          ]
        },
        {
          "fullName": "Hannah Red",
          "age": 30,
          "skills": [
            { "name": "Swift" },
            { "name": "iOS Development" }
          ]
        }
      ]
    },
    {
      "id": 6,
      "title": "Task 6",
      "completed": false,
      "deadline": "2024-10-25T15:00:00.000Z",
      "persons": [
        {
          "fullName": "Iris Yellow",
          "age": 31,
          "skills": [
            { "name": "PHP" },
            { "name": "Laravel" }
          ]
        },
        {
          "fullName": "Jack Gray",
          "age": 33,
          "skills": [
            { "name": "Scala" },
            { "name": "Akka" }
          ]
        }
      ]
    }
  ]
