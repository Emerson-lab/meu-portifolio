import type { RichTextContent } from "@graphcms/rich-text-types";

export type KnownTech = {
  iconSvg: string;
  name: string;
  startDate: string
}

export type ProjectSectionType = {
  title: string;
  image: {
    url: string;
  }
}

export type ProjectType = {
  slug: string;
  thumbnail: {
    url: string;
  }
  title: string;
  shortDescription: string;
  technologies: KnownTech[];
  pageThumbnail: {
    url: string;
  }
  sections: ProjectSectionType[]
  description: {
    raw: RichTextContent
  }
  liveProjectUrl?: string;
  githubUrl?: string;
}