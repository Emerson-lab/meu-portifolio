import { REVALIDATE_DATA } from "../variables";
import { ProjectsPageDataType } from "../Types/page-info";
import { fetchHygraphQuery } from "../utils/fetch-hygraph-query";
import { ProjectList } from "../components/pages/projects/projects-list";
import { PageIntroduction } from "../components/pages/projects/page-introduction";

export const metadata = {
  title: "Projetos"
}

const getPageData = async (): Promise<ProjectsPageDataType> => {
  const query = `
    query ProjectsQuery {
      projects {
        shortDescription
        slug
        title
        thumbnail {
          url
        }
        technologies {
          name
        }
      }
    }
  `
  return fetchHygraphQuery(query, REVALIDATE_DATA);
}

export default async function Projects() {
  const { projects } = await getPageData();

  return (
    <>
      <PageIntroduction />
      <ProjectList projects={projects}/>
    </>
  )
}