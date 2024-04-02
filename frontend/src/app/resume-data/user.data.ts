// Main export interface representing the entire user data for the resume
export interface User {
  id?: number,
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
  tools: string[],
  methodologies: string[],
  skills: string[],
  hobbiesAndInterest: string[],
  trainingsAndCertifications: string[],
}

export interface UserBasic {
  location: string,
  summary: string,
  title: string,
  profession: string,
  mobilePhoneNumber: string,
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
  summary: string,
  showContent?: boolean
}

export interface WorkExperience {
  company: string,
  companyCity: string,
  companyLink: string,
  occupiedPosition: string,
  startDate: string,
  endDate: string,
  duration: string,
  summary: string[],
  showContent?: boolean
}

export interface TechnicalDetail {
  name: string,
  level: number,
}

export interface TechnicalExperience {
  topic: string,
  technicalDetails: TechnicalDetail[],
}


