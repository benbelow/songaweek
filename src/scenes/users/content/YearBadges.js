import { submissionsInYear, submissionYears } from '../services/UserSubmissionAnalyser';

import icon2019bw from '../../../assets/2019bw.png';
import icon2019c from '../../../assets/2019c.png';
import icon2020bw from '../../../assets/2020bw.png';
import icon2020c from '../../../assets/2020c.png';
import icon2018bw from '../../../assets/2018bw.png';
import icon2018c from '../../../assets/2018c.png';
import icon2017bw from '../../../assets/2017bw.png';
import icon2017c from '../../../assets/2017c.jpg';
import icon2016bw from '../../../assets/2016bw.png';
import icon2016c from '../../../assets/2016c.png';
import icon2015bw from '../../../assets/2015bw.png';
import icon2015c from '../../../assets/2015c.png';
import icon2014bw from '../../../assets/2014bw.png';
import icon2014c from '../../../assets/2014c.png';

import icon2021bw from '../../../assets/2021bw.jpg';
import icon2021c from '../../../assets/2021c.png';

import icon2022bw from '../../../assets/2022bw.jpg';
import icon2022c from '../../../assets/2022c.png';

const completedYear = (user, year) => submissionsInYear(user, year).length >= 52;

const participant = (user, year) => submissionYears(user).includes(year) && !completedYear(user, year);

export default [
  {
    name: '2014 Participant',
    test: (user) => participant(user, 2014),
    icon: icon2014bw
  },
  {
    name: '2014 Complete!',
    test: (user) => completedYear(user, 2014),
    icon: icon2014c
  },
  {
    name: '2015 Participant',
    test: (user) => participant(user, 2015),
    icon: icon2015bw
  },
  {
    name: '2015 Complete!',
    test: (user) => completedYear(user, 2015),
    icon: icon2015c
  },
  {
    name: '2016 Participant',
    test: (user) => participant(user, 2016),
    icon: icon2016bw
  },
  {
    name: '2016 Complete!',
    test: (user) => completedYear(user, 2016),
    icon: icon2016c
  },
  {
    name: '2017 Participant',
    test: (user) => participant(user, 2017),
    icon: icon2017bw
  },
  {
    name: '2017 Complete!',
    test: (user) => completedYear(user, 2017),
    icon: icon2017c
  },
  {
    name: '2018 Participant',
    test: (user) => participant(user, 2018),
    icon: icon2018bw
  },
  {
    name: '2018 Complete!',
    test: (user) => completedYear(user, 2018),
    icon: icon2018c
  },
  {
    name: '2019 Participant',
    test: (user) => participant(user, 2019),
    icon: icon2019bw
  },
  {
    name: '2019 Complete!',
    test: (user) => completedYear(user, 2019),
    icon: icon2019c
  },
  {
    name: '2020 Participant',
    test: (user) => participant(user, 2020),
    icon: icon2020bw
  },
  {
    name: '2020 Complete!',
    test: (user) => completedYear(user, 2020),
    icon: icon2020c
  },
  {
    name: '2021 Participant',
    test: (user) => participant(user, 2021),
    icon: icon2021bw
  },
  {
    name: '2021 Complete!',
    test: (user) => completedYear(user, 2021),
    icon: icon2021c
  },
  {
    name: '2022 Participant',
    test: (user) => participant(user, 2022),
    icon: icon2022bw
  },
  {
    name: '2022 Complete!',
    test: (user) => completedYear(user, 2022),
    icon: icon2022c
  }
];
