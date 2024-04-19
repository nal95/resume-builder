// Main export interface representing the entire user data for the resume

export interface User {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  userDetails: UserDetails
}

export interface UserDetails {
  basic: UserBasic,
  image:string,
  networks: Network[],
  educations: Education[],
  workExperiences: WorkExperience[],
  technicalExperiences: TechnicalExperience[],
  languages: Language[],
  certifications: Certification[],
  trainings: Training[],
  interests: string[],
  tools: string[],
  methodologies: string[],
  skills: string[],
}

export interface UserBasic {
  location: string,
  summary: string ,
  title: string,
  profession: string,
  mobilePhoneNumber: string,
  website: string,
  relevantExperienceYears: number,
}

export interface Network {
  name: string,
  referenceName: string,
  link: string,
  showContent?: boolean
}

export interface Education {
  school: string,
  field: string,
  degree: string,
  startDate: string,
  endDate: string,
  duration: number,
  grade?: string,
  description?: string,
  showContent?: boolean
}

export interface WorkExperience {
  company: string,
  companyCity: string,
  companyLink: string,
  occupiedPosition: string,
  startDate: string,
  endDate: string,
  duration: number,
  summary: string,
  showContent?: boolean,
  actual?: boolean
}

export interface TechnicalDetail {
  name: string,
  level: number,
}

export interface Language {
  name: string,
  level: string,
}

export interface Certification {
  name: string,
  validity: string,
}

export interface Training {
  title: string,
  platform: string,
}

export interface TechnicalExperience {
  topic: string,
  showContent?: boolean
  technicalDetails: TechnicalDetail[],
}

