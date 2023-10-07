import ProjectDeatails from "@/app/components/pages/project/project-details";
import { ProjectSections } from "@/app/components/pages/project/project-sections";
import { fetchHygraphQuery } from "@/app/utils/fetch-hygraph-query";
import { REVALIDATE_DATA } from "@/app/variables";
import { ProjectPageProps } from "./types";
import { ProjectPageDataType } from "@/app/Types/page-info";

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
      <ProjectDeatails project={project}/>
      <ProjectSections sections={project.sections}/>
    </>
  )
}