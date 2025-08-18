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
      { key: 'javascript', icon: '16x/javascript' },
      { key: 'java', icon: '16x/java' },
      { key: 'ruby', icon: '16x/ruby' },
      { key: 'php', icon: '16x/php' },
      { key: 'cpp', icon: '16x/cpp' },
      { key: 'bash', icon: '16x/bash' },
    ],
  },
  {
    key: 'frameworks',
    skills: [
      { key: 'react', icon: '16x/react' },
      { key: 'nodejs', icon: '16x/nodejs' },
      { key: 'nextjs', icon: '16x/nextjs' },
      { key: 'nestjs' },
      { key: 'expressjs' },
      { key: 'jquery' },
      { key: 'jakartaee' },
      { key: 'ruby-on-rails' },
      { key: 'laravel' },
      { key: 'android' },
    ],
  },
  {
    key: 'technologies',
    skills: [
      { key: 'github', icon: '16x/github' },
      { key: 'gitlab' },
      { key: 'mysql' },
      { key: 'postgresql' },
      { key: 'redis' },
      { key: 'prometheus' },
      { key: 'grafana' },
      { key: 'influxdb' },
      { key: 'rest' },
      { key: 'godot' },
    ],
  },
  {
    key: 'virtualization',
    skills: [{ key: 'kubernetes' }, { key: 'docker' }, { key: 'vagrant' }],
  },
  {
    key: 'cloud',
    skills: [{ key: 'aws' }, { key: 'heroku' }, { key: 'openstack' }],
  },
  {
    key: 'ci-cd',
    skills: [
      { key: 'gitlab-cicd' },
      { key: 'argocd' },
      { key: 'circleci' },
      { key: 'github-actions', icon: '16x/github' },
      { key: 'github-pages', icon: '16x/github' },
    ],
  },
  {
    key: 'networking',
    skills: [{ key: 'fortigate' }, { key: 'netbox' }, { key: 'bind' }],
  },
  {
    key: 'design',
    skills: [
      { key: 'adobe-cc' },
      { key: 'figma' },
      { key: 'krita' },
      { key: 'inkscape' },
    ],
  },
];

export default skillCategories;
