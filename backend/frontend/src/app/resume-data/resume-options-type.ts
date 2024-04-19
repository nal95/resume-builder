export type ResumeDataType =
  'user' | 'basics' | 'networks' |
  'educations' | 'work experiences' |
  'technical experiences' | 'skills' |
  'tools' | 'methodologies' | 'interests' |
  'certifications' | 'trainings' | 'language';


export enum ResumeDataOptions {
  //simple string type
  USER = 'User',
  BASICS = 'Basics',
  IMAGE = 'Image',

  //complex object list type
  NETWORKS = 'Networks',
  EDUCATIONS = 'Educations',
  WORK_EXPERIENCES = 'Work Experiences',
  TECHNICAL_EXPERIENCES = 'Technical Experiences',

  //string list type
  TOOLS = 'Tools',
  METHODOLOGIES = 'Methodologies',
  SKILLS = 'Skills',
  INTERESTS = 'Interests',

  //simple object list type
  CERTIFICATIONS = 'Certifications',
  TRAININGS = 'Trainings',
  LANGUAGES = 'Languages',

  "UNKNOWN" = 'Unknown'
}

export enum LanguageLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
  NATIVE = 'Native'
}
