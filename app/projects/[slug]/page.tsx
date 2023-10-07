import { ProjectPageProps } from "./types";
import { REVALIDATE_DATA } from "@/app/variables";
import { fetchHygraphQuery } from "@/app/utils/fetch-hygraph-query";
import ProjectDeatails from "@/app/components/pages/project/project-details";
import { ProjectSections } from "@/app/components/pages/project/project-sections";
import { ProjectPageDataType, ProjectspageStaticData } from "@/app/Types/page-info";
import { Metadata } from "next";

const getProjectsDetails = async (slug: string): Promise<ProjectPageDataType> => {
  const query = `
  query ProjectQuery() {
    project(where: {slug: "${slug}"}) {
      pageThumbnail {
        url
      }
      thumbnail {
        url
      }
      sections {
        title
        image {
          url
        }
      }
      title
      shortDescription
      description {
        raw
        text
      }
      technologies {
        name
      }
      liveProjectUrl
      githubUrl
    }
  }
  `
  return fetchHygraphQuery(query, REVALIDATE_DATA);
}

export default async function Project({ params: { slug } }: ProjectPageProps) {
  const { project } = await getProjectsDetails(slug);

  return (
    <>
      <ProjectDeatails project={project} />
      <ProjectSections sections={project.sections} />
    </>
  )
}

export async function generateStaticParams() {
  const query = `
    query ProjectsSlugsQuery() {
      projects(first: 100) {
        slug
      }
    }
  `

  const { projects } = await fetchHygraphQuery<ProjectspageStaticData>(query);

  return projects
}

export async function generateMetadata({
  params: { slug }
}: ProjectPageProps): Promise<Metadata> {
  const data = await getProjectsDetails(slug);
  const project = data.project;
  return {
    title: project.title,
    description: project.description.text,
    openGraph: {
      images: [
        {
          url: project.thumbnail.url,
          width: 1200,
          height: 630
        }
      ]
    }
  }
}