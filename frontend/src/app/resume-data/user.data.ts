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
  referenceName: string,
  link: string,
}

export interface Education {
  school: string,
  field: string,
  degree: string,
  startDate: string,
  endDate: string,
  duration: number,
  summary: string,
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
}

export interface TechnicalDetail {
  name: string,
  level: number,
}

export interface TechnicalExperience {
  topic: string,
  technicalDetails: TechnicalDetail[],
}


