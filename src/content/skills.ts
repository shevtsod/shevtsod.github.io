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
      { key: 'html', icon: 'Html' },
      { key: 'css', icon: 'Css' },
      { key: 'javascript', icon: 'Javascript' },
      { key: 'typescript', icon: 'Typescript' },
      { key: 'java', icon: 'Java' },
      { key: 'ruby', icon: 'Ruby' },
      { key: 'php', icon: 'Php' },
      { key: 'c', icon: 'C' },
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
      { key: 'jakartaee', icon: 'Jakartaee' },
      { key: 'ruby-on-rails', icon: 'RubyOnRails' },
      { key: 'laravel', icon: 'Laravel' },
      { key: 'android', icon: 'Android' },
    ],
  },
  {
    key: 'technologies',
    skills: [
      { key: 'github', icon: 'Github' },
      { key: 'gitlab', icon: 'Gitlab' },
      { key: 'postgresql', icon: 'Postgresql' },
      { key: 'mysql', icon: 'Mysql' },
      { key: 'redis', icon: 'Redis' },
      { key: 'ansible', icon: 'Ansible' },
      { key: 'prometheus', icon: 'Prometheus' },
      { key: 'grafana', icon: 'Grafana' },
      { key: 'influxdb', icon: 'Influxdb' },
      { key: 'rest', icon: 'Rest' },
      { key: 'godot', icon: 'Godot' },
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
    skills: [
      { key: 'aws', icon: 'Aws' },
      { key: 'heroku', icon: 'Heroku' },
      { key: 'openstack', icon: 'Openstack' },
    ],
  },
  {
    key: 'cicd',
    skills: [
      { key: 'gitlab-cicd', icon: 'Gitlab' },
      { key: 'argocd', icon: 'Argocd' },
      { key: 'circleci', icon: 'Circleci' },
      { key: 'github-actions', icon: 'Github' },
      { key: 'github-pages', icon: 'Github' },
    ],
  },
  {
    key: 'networking',
    skills: [
      { key: 'fortigate', icon: 'Fortigate' },
      { key: 'netbox', icon: 'Netbox' },
      { key: 'bind', icon: 'Bind' },
    ],
  },
  {
    key: 'design',
    skills: [
      { key: 'adobe-cc', icon: 'AdobeCc' },
      { key: 'figma', icon: 'Figma' },
      { key: 'krita', icon: 'Krita' },
      { key: 'inkscape', icon: 'Inkscape' },
    ],
  },
];
