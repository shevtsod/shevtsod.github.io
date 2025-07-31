export interface SkillType {
  key: string;
  icon?: string;
}

export interface SkillCategoryType {
  key: string;
  skills: SkillType[];
}

const skillCategories: SkillCategoryType[] = [
  {
    key: 'languages',
    skills: [
      {
        key: 'javascript',
      },
      {
        key: 'java',
      },
      {
        key: 'csharp',
      },
      {
        key: 'ruby',
      },
      {
        key: 'php',
      },
      {
        key: 'cpp',
      },
      {
        key: 'bash',
      },
    ],
  },
  {
    key: 'frameworks',
    skills: [
      {
        key: 'react',
      },
      {
        key: 'nodejs',
      },
      {
        key: 'nextjs',
      },
      {
        key: 'nestjs',
      },
      {
        key: 'expressjs',
      },
      {
        key: 'jquery',
      },
      {
        key: 'jakartaee',
      },
      {
        key: 'ruby-on-rails',
      },
      {
        key: 'laravel',
      },
      {
        key: 'android',
      },
    ],
  },
  {
    key: 'technologies',
    skills: [
      {
        key: 'github',
      },
      {
        key: 'gitlab',
      },
      {
        key: 'mysql',
      },
      {
        key: 'postgresql',
      },
      {
        key: 'mongodb',
      },
      {
        key: 'redis',
      },
      {
        key: 'prometheus',
      },
      {
        key: 'grafana',
      },
      {
        key: 'influxdb',
      },
      {
        key: 'rest',
      },
      {
        key: 'godot',
      },
    ],
  },
  {
    key: 'virtualization',
    skills: [
      {
        key: 'kubernetes',
      },
      {
        key: 'docker',
      },
      {
        key: 'vagrant',
      },
    ],
  },
  {
    key: 'cloud',
    skills: [
      {
        key: 'aws',
      },
      {
        key: 'azure',
      },
      {
        key: 'heroku',
      },
      {
        key: 'openstack',
      },
    ],
  },
  {
    key: 'ci-cd',
    skills: [
      {
        key: 'gitlab-cicd',
      },
      {
        key: 'argocd',
      },
      {
        key: 'circleci',
      },
      {
        key: 'github-actions',
      },
      {
        key: 'github-pages',
      },
    ],
  },
  {
    key: 'networking',
    skills: [
      {
        key: 'fortigate',
      },
      {
        key: 'netbox',
      },
      {
        key: 'bind',
      },
    ],
  },
  {
    key: 'design',
    skills: [
      {
        key: 'photoshop',
      },
      {
        key: 'premiere',
      },
      {
        key: 'figma',
      },
      {
        key: 'krita',
      },
      {
        key: 'inkscape',
      },
    ],
  },
];

export default skillCategories;
