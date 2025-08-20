export interface SkillCategoryType {
  key: string;
  skills: SkillType[];
}

export interface SkillType {
  key: string;
  icon?: string;
}

export const skillCategories: SkillCategoryType[] = [
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
      { key: 'nestjs', icon: '16x/nestjs' },
      { key: 'expressjs', icon: '16x/expressjs' },
      { key: 'jquery', icon: '16x/jquery' },
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
      { key: 'gitlab', icon: '16x/gitlab' },
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
    skills: [
      { key: 'kubernetes', icon: '16x/kubernetes' },
      { key: 'docker', icon: '16x/docker' },
      { key: 'vagrant', icon: '16x/vagrant' },
    ],
  },
  {
    key: 'cloud',
    skills: [{ key: 'aws' }, { key: 'heroku' }, { key: 'openstack' }],
  },
  {
    key: 'cicd',
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
