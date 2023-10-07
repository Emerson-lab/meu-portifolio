import { KnownTech, ProjectType } from "./projects";
import type { RichTextContent } from "@graphcms/rich-text-types";
import { WorkExperienceType } from "./work-experience";

export type Social = {
  url: string;
  iconSvg: string;
}

export type HomePageInfo = {
  introduction: {
    raw: RichTextContent;
  }
  technologies: KnownTech[]
  profilePicture: {
    url: string
  }
  socials: Social[]
  knownTechs: KnownTech[]
  highlightProjects: ProjectType[];
}

export type ProjectPageDataType = {
  project: ProjectType
}

export type ProjectsPageDataType = {
  projects: ProjectType[]
}

export type ProjectspageStaticData = {
  projects:{
    slug: string;
  }[]
}

export type HomepageData = {
  page: HomePageInfo;
  workExperiences: WorkExperienceType[]
}