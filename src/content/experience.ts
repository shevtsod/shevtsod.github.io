export interface ExperienceCategoryType {
  key: string;
  experienceItems: ExperienceItemType[];
}
export interface ExperienceItemType {
  title: string;
  company: string;
  location: string;
  start: Date;
  end?: Date;
}

export const experienceCategories: ExperienceCategoryType[] = [
  {
    key: 'employment',
    experienceItems: [
      {
        title: 'Senior Sector Network Support Analyst',
        company: 'Government of Saskatchewan',
        location: 'Regina, SK, Canada',
        start: new Date(2019, 9),
      },
      {
        title: 'Sector Network Support Analyst',
        company: 'Government of Saskatchewan',
        location: 'Regina, SK, Canada',
        start: new Date(2017, 8),
        end: new Date(2019, 9),
      },
    ],
  },
  {
    key: 'education',
    experienceItems: [
      {
        title: 'Bachelor of Applied Science - Software Systems Engineering',
        company: 'University of Regina',
        location: 'Regina, SK',
        start: new Date(2014, 8),
        end: new Date(2020, 5),
      },
    ],
  },
];
