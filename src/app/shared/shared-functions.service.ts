import { Injectable } from '@angular/core';
import { Observable, Subject, delay, from, interval, zipWith } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedFunctionsService {
  constructor() {}
  mainPageProjects = [
    {
      title: 'Hotel Booking Site',
      link: 'https://step-project-hotel-aa21.vercel.app',
      desc: 'This project showcases my front-end skills with a booking website where <br /> guests can view and book rooms, as well as check their reservations.<br />',
    },
    {
      title: 'Film Site',
      link: 'https://films-site-murex.vercel.app',
      desc: 'This site features full authorization, bookmarking, and search <br/> systems. The backend is built with Node.js, Express, and <br/> MongoDB/Mongoose.',
    },
  ];
  mainPageEducation = [
    {
      title: 'Do It in Georgia and PCAP Certification',
      link: '',
      desc: 'I was selected for the "Do It in Georgia" government project, part <br> of an international certification training program. Out of 15,000 <br> applicants, only 1,000 were chosen, and I am currently preparing for <br> the PCAP (Python Certified Associate Programmer) exam. <br>',
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
      from(name.split(''))
        .pipe(zipWith(interval(time)))
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
    });
  }
}
