import { IconKey } from '@/components/icon';
export interface SkillCategoryType {
  key: string;
  skills: SkillType[];
}

export interface SkillType {
  key: string;
  icon?: IconKey;
}

export const skillCategories: SkillCategoryType[] = [
  {
    key: 'languages',
    skills: [
      { key: 'javascript', icon: 'Javascript' },
      { key: 'java', icon: 'Java' },
      { key: 'ruby', icon: 'Ruby' },
      { key: 'php', icon: 'Php' },
      { key: 'cpp', icon: 'Cpp' },
      { key: 'bash', icon: 'Bash' },
    ],
  },
  {
    key: 'frameworks',
    skills: [
      { key: 'react', icon: 'React' },
      { key: 'nodejs', icon: 'Nodejs' },
      { key: 'nextjs', icon: 'Nextjs' },
      { key: 'nestjs', icon: 'Nestjs' },
      { key: 'expressjs', icon: 'Expressjs' },
      { key: 'jquery', icon: 'Jquery' },
      { key: 'jakartaee' },
      { key: 'ruby-on-rails' },
      { key: 'laravel' },
      { key: 'android' },
    ],
  },
  {
    key: 'technologies',
    skills: [
      { key: 'github', icon: 'Github' },
      { key: 'gitlab', icon: 'Gitlab' },
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
      { key: 'kubernetes', icon: 'Kubernetes' },
      { key: 'docker', icon: 'Docker' },
      { key: 'vagrant', icon: 'Vagrant' },
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
      { key: 'github-actions', icon: 'Github' },
      { key: 'github-pages', icon: 'Github' },
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
