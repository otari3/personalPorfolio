import { Injectable } from '@angular/core';
import {
  Observable,
  Subject,
  delay,
  from,
  interval,
  take,
  zipWith,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedFunctionsService {
  constructor() {}
  mainPageProjects = [
    {
      title: 'Hotel Booking Platform For Hotels',
      link: 'https://hotelfront-three.vercel.app/login',
      desc: '  This site is designed for hotels to book guests, featuring full auth,  guest booking, and search systems. The backend is built with Django and  PostgreSQL, and the frontend is powered by Angular. P.S. The site might experience a 30-35 second cold start.',
    },
    {
      title: 'Film Site',
      link: 'https://films-site-murex.vercel.app',
      desc: 'This site features full authorization, bookmarking, and search <br/> systems. The backend is built with Node.js, Express, and <br/> MongoDB/Mongoose. P.S site might have 30-35s cold start',
    },
    {
      title: 'Hotel Booking Site For Guests',
      link: 'https://step-project-hotel-aa21.vercel.app',
      desc: 'This project showcases my front-end skills with a booking website where <br /> guests can view and book rooms, as well as check their reservations.<br />',
    },
  ];
  mainPageEducation = [
    {
      title: 'Do It in Georgia and PCAP Certification',
      link: '',
      desc: 'I successfully secured financing for the PCAP (Python Certified Associate<br />Programmer) exam after passing the internal assessments of the "Do It in<br />Georgia" government project—an international certification training program<br />that selected only 1,000 participants from 15,000 applicants. I went on to<br />pass the PCAP exam with a score of 80%.<a href="https://verify.openedg.org/?id=iBxP.reSD.kJmG" target="_blank">Confirmation</a>',
    },
    {
      title: 'Angular Training and Advanced Concepts at Step Academy',
      link: '',
      desc: 'I completed a training program at Step Academy, where I learned <br> Angular and gained experience with advanced concepts like NgRx for <br> state management, routing, and handling complex data flows in large <br> applications.',
    },
    {
      title: 'Python, Django, and PostgreSQL Training at Step Academy',
      link: '',
      desc: 'I completed a training program at Step Academy, where I learned Python <br> and Django, with a focus on building REST APIs, handling back-end <br> development tasks, and working extensively with PostgreSQL for <br> database management.',
    },
  ];
  mainPageExperinec = [
    {
      title:
        'Maintenance and Development of In-House Hotel Booking Web Application',
      desc: "Worked at Gelati Residence Hotel as the primary maintainer and developer <br> of their in-house booking web application. Responsibilities included <br> ensuring smooth operation of the system, fixing bugs, improving <br> functionality, and enhancing the user experience for both staff and <br> guests. Contributed to the application's stability and scalability by <br> implementing updates, managing data integrity, and addressing technical <br> challenges promptly to support the hotel's operational needs.",
    },
  ];
  allProjects = [
    {
      header: 'Hotel Booking Platform For Hotels',
      link: 'https://hotelfront-three.vercel.app/login',
      subHeader: 'creator',
      desc: 'Hotel booking web application for Hotels',
      achiv: [
        'successfully create complex postgress queries with both raw queries and django orm ',
        'successfully hosted my own django backend and postgres DB useing render',
        'Implemented my own download system with dynamic file generation.',
      ],
      tech: [
        'Angular',
        'postgresql',
        'django',
        'python',
        'typescript',
        'psycopg2',
        'ngrx',
      ],
    },
    {
      header: 'Hotel Booking Site For Guests',
      link: 'https://step-project-hotel-aa21.vercel.app/',
      subHeader: 'creator',
      desc: 'Hotel booking web application for guest',
      achiv: [
        'successfully implemented already existing api',
        'successfully used ngrx for complicated state management',
      ],
      tech: ['Angular', 'ngrx', 'c#'],
    },
    {
      header: 'Film Site',
      link: 'https://films-site-murex.vercel.app/',
      subHeader: 'creator',
      desc: 'Film  web application with its own auth search,function,booking logic',
      achiv: [
        'successfully created my own backend',
        'successfully used mongodb/mongoose to create complex queries',
        'successfully implemented my own secure authorization',
      ],
      tech: ['Angular', 'ngrx', 'mongodb', 'mongoose', 'express', 'nodejs'],
    },
  ];
  scramble(name: string, time: number): Observable<string> {
    const scrambleChars = '!@#$%^&*()_+1234567890abcdefghijklmnopqrstuvwxyz';
    return new Observable<string>((subscriber) => {
      let scrambled = name
        .split('')
        .map(
          () => scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
        )
        .join('');
      subscriber.next(scrambled);
      const innerSub = from(name.split(''))
        .pipe(zipWith(interval(time)), take(name.length))
        .subscribe({
          next: ([char, index]) => {
            let newDisplay = scrambled.split('');
            for (let i = index; i < name.length; i++) {
              newDisplay[i] =
                scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
            }
            newDisplay[index] = char;
            scrambled = newDisplay.join('');
            subscriber.next(scrambled);
          },
          complete: () => {
            subscriber.complete();
          },
        });
      return () => {
        innerSub.unsubscribe();
      };
    });
  }
}
