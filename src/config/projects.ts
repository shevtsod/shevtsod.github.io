import type { To } from 'react-router';

export interface ProjectType {
  title: string;
  description: string;
  repository?: To;
  url?: To;
  skills: string[];
}

const projects: ProjectType[] = [
  {
    title: 'Personal Website',
    description:
      'This website, inspired by retro video games, was built to showcase projects and skills and includes a personal blog.',
    repository: 'https://github.com/shevtsod/shevtsod.github.io',
    url: 'https://shevtsod.com',
    skills: ['react', 'github', 'github-actions'],
  },
  {
    title: 'Scotty the T. rex',
    description:
      'Interactive 3D model viewer of the skull of Scotty the T. rex built for the Saskatchewan Royal Museum.',
    skills: ['godot'],
  },
  {
    title: 'Farm Management IoT System',
    description:
      'Simulation of a distributed IoT system for farm management on a single Raspberry Pi',
    repository: 'https://github.com/shevtsod/ENSE483/tree/master/project',
    url: 'https://docs.google.com/presentation/d/1ExSQbTQov24KCKuZ52RYS2P_npSEnD3D8d_UHptHTkA/edit?usp=sharing',
    skills: ['docker', 'nodejs', 'rest', 'influxdb'],
  },
  {
    title: 'Android App Store',
    description:
      'Private Android app store with a website, REST API, Android app, and documentation site',
    repository: 'https://github.com/matryoshkadoll',
    skills: ['php', 'laravel', 'android', 'react', 'circleci', 'aws'],
  },
  {
    title: 'Retro Game Console',
    description:
      'Retro video game console prototype with game switching feature',
    repository: 'https://github.com/shevtsod/ENEL387',
    skills: ['cpp'],
  },
];

export default projects;
