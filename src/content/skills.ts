import { IconKey } from '@/components/icon';
export interface SkillCategoryType {
  key: string;
  skills: SkillType[];
}

export interface SkillType {
  key: string;
  icon?: IconKey;
  url?: string;
}

export const skillCategories: SkillCategoryType[] = [
  {
    key: 'languages',
    skills: [
      {
        key: 'html',
        icon: 'Html',
        url: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
      },
      {
        key: 'css',
        icon: 'Css',
        url: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
      },
      {
        key: 'javascript',
        icon: 'Javascript',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
      },
      {
        key: 'typescript',
        icon: 'Typescript',
        url: 'https://www.typescriptlang.org/',
      },
      {
        key: 'java',
        icon: 'Java',
        url: 'https://www.java.com',
      },
      {
        key: 'ruby',
        icon: 'Ruby',
        url: 'https://www.ruby-lang.org',
      },
      {
        key: 'php',
        icon: 'Php',
        url: 'https://www.php.net',
      },
      {
        key: 'c',
        icon: 'C',
        url: 'https://www.c-language.org',
      },
      {
        key: 'cpp',
        icon: 'Cpp',
        url: 'https://isocpp.org',
      },
      {
        key: 'bash',
        icon: 'Bash',
        url: 'https://www.gnu.org/software/bash',
      },
    ],
  },
  {
    key: 'frameworks',
    skills: [
      {
        key: 'react',
        icon: 'React',
        url: 'https://react.dev',
      },
      {
        key: 'nodejs',
        icon: 'Nodejs',
        url: 'https://nodejs.org',
      },
      {
        key: 'nextjs',
        icon: 'Nextjs',
        url: 'https://nextjs.org',
      },
      {
        key: 'nestjs',
        icon: 'Nestjs',
        url: 'https://nestjs.com',
      },
      {
        key: 'expressjs',
        icon: 'Expressjs',
        url: 'https://expressjs.com',
      },
      {
        key: 'jquery',
        icon: 'Jquery',
        url: 'https://jquery.com',
      },
      {
        key: 'jakartaee',
        icon: 'Jakartaee',
        url: 'https://jakarta.ee',
      },
      {
        key: 'ruby-on-rails',
        icon: 'RubyOnRails',
        url: 'https://rubyonrails.org',
      },
      {
        key: 'laravel',
        icon: 'Laravel',
        url: 'https://laravel.com',
      },
      {
        key: 'android',
        icon: 'Android',
        url: 'https://developer.android.com/develop',
      },
    ],
  },
  {
    key: 'technologies',
    skills: [
      {
        key: 'github',
        icon: 'Github',
        url: 'https://github.com',
      },
      {
        key: 'gitlab',
        icon: 'Gitlab',
        url: 'https://about.gitlab.com',
      },
      {
        key: 'postgresql',
        icon: 'Postgresql',
        url: 'https://www.postgresql.org',
      },
      {
        key: 'mysql',
        icon: 'Mysql',
        url: 'https://www.mysql.com',
      },
      {
        key: 'redis',
        icon: 'Redis',
        url: 'https://redis.io',
      },
      {
        key: 'ansible',
        icon: 'Ansible',
        url: 'https://docs.ansible.com',
      },
      {
        key: 'prometheus',
        icon: 'Prometheus',
        url: 'https://prometheus.io',
      },
      {
        key: 'grafana',
        icon: 'Grafana',
        url: 'https://grafana.com',
      },
      {
        key: 'influxdb',
        icon: 'Influxdb',
        url: 'https://www.influxdata.com',
      },
      {
        key: 'rest',
        icon: 'Rest',
      },
      {
        key: 'godot',
        icon: 'Godot',
        url: 'https://godotengine.org',
      },
    ],
  },
  {
    key: 'virtualization',
    skills: [
      {
        key: 'kubernetes',
        icon: 'Kubernetes',
        url: 'https://kubernetes.io',
      },
      {
        key: 'docker',
        icon: 'Docker',
        url: 'https://www.docker.com',
      },
      {
        key: 'vagrant',
        icon: 'Vagrant',
        url: 'https://developer.hashicorp.com/vagrant',
      },
    ],
  },
  {
    key: 'cloud',
    skills: [
      {
        key: 'aws',
        icon: 'Aws',
        url: 'https://aws.amazon.com',
      },
      {
        key: 'heroku',
        icon: 'Heroku',
        url: 'https://www.heroku.com',
      },
      {
        key: 'openstack',
        icon: 'Openstack',
        url: 'https://www.openstack.org',
      },
    ],
  },
  {
    key: 'cicd',
    skills: [
      {
        key: 'gitlab-cicd',
        icon: 'Gitlab',
        url: 'https://docs.gitlab.com/ci/',
      },
      {
        key: 'argocd',
        icon: 'Argocd',
        url: 'https://argo-cd.readthedocs.io',
      },
      {
        key: 'circleci',
        icon: 'Circleci',
        url: 'https://circleci.com',
      },
      {
        key: 'github-actions',
        icon: 'Github',
        url: 'https://github.com/features/actions',
      },
      {
        key: 'github-pages',
        icon: 'Github',
        url: 'https://docs.github.com/en/pages',
      },
    ],
  },
  {
    key: 'networking',
    skills: [
      {
        key: 'fortigate',
        icon: 'Fortigate',
        url: 'https://www.fortinet.com/products/next-generation-firewall',
      },
      {
        key: 'netbox',
        icon: 'Netbox',
        url: 'https://netboxlabs.com',
      },
      {
        key: 'bind',
        icon: 'Bind',
        url: 'https://www.isc.org/bind/',
      },
    ],
  },
  {
    key: 'design',
    skills: [
      {
        key: 'adobe-cc',
        icon: 'AdobeCc',
        url: 'https://www.adobe.com/ca/creativecloud.html',
      },
      {
        key: 'figma',
        icon: 'Figma',
        url: 'https://www.figma.com',
      },
      {
        key: 'krita',
        icon: 'Krita',
        url: 'https://krita.org',
      },
      {
        key: 'inkscape',
        icon: 'Inkscape',
        url: 'https://inkscape.org',
      },
    ],
  },
];
