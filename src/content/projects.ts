export interface ProjectType {
  title: string;
  description: string;
  promo: {
    path: string;
    type: 'image' | 'video';
  };
  skills?: string[];
  links?: {
    key: string;
    url: string;
  }[];
}

const projects: ProjectType[] = [
  {
    title: 'Personal Website',
    description:
      'This website, inspired by retro video games, was built to showcase projects and skills and includes a personal blog',
    promo: {
      path: '/videos/projects/480p/personal-website.mp4',
      type: 'video',
    },
    skills: ['nextjs', 'react', 'github', 'github-actions'],
    links: [
      {
        key: 'website',
        url: 'https://shevtsod.com',
      },
      {
        key: 'repository',
        url: 'https://github.com/shevtsod/shevtsod.github.io',
      },
    ],
  },
  {
    title: 'Farm Management IoT System',
    description:
      'Simulation of a distributed IoT system for farm management on a single Raspberry Pi',
    promo: {
      path: '/videos/projects/480p/farm-management-iot-system.mp4',
      type: 'video',
    },
    skills: ['docker', 'nodejs', 'rest', 'influxdb'],
    links: [
      {
        key: 'presentation',
        url: 'https://docs.google.com/presentation/d/1ExSQbTQov24KCKuZ52RYS2P_npSEnD3D8d_UHptHTkA/edit?usp=sharing',
      },
      {
        key: 'repository',
        url: 'https://github.com/shevtsod/ENSE483/tree/master/project',
      },
    ],
  },
  {
    title: 'Android App Store',
    description:
      'Private Android app store with a website, REST API, Android app, and documentation site',
    promo: {
      path: '/videos/projects/480p/android-app-store.mp4',
      type: 'video',
    },
    skills: ['php', 'laravel', 'mysql', 'android', 'react', 'circleci', 'aws'],
    links: [
      {
        key: 'presentation',
        url: 'https://docs.google.com/presentation/d/1P7liHm6jWLsjOQm6U1AvRdb9DiaxgseTAXOOlzTA0Mg/edit?usp=sharing',
      },
      {
        key: 'repository',
        url: 'https://github.com/matryoshkadoll',
      },
    ],
  },
  {
    title: 'Scotty the T. rex',
    description:
      'Interactive 3D model viewer of the skull of Scotty the T. rex exhibited on a touchscreen at the Saskatchewan Royal Museum',
    promo: {
      path: '/videos/projects/480p/rsm-scotty.mp4',
      type: 'video',
    },
    skills: ['godot'],
  },
  {
    title: 'Retro Game Console',
    description:
      'Retro video game console prototype with game switching feature',
    promo: {
      path: '/images/projects/retro-game-console.jpg',
      type: 'image',
    },
    skills: ['c'],
    links: [
      {
        key: 'repository',
        url: 'https://github.com/shevtsod/ENEL387',
      },
    ],
  },
];

export default projects;
