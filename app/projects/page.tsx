import { REVALIDATE_DATA } from "../variables";
import { fetchHygraphQuery } from "../utils/fetch-hygraph-query";
import { ProjectList } from "../components/pages/projects/projects-list";
import { PageIntroduction } from "../components/pages/projects/page-introduction";

const getPageData = async () => {
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

export default function Projects() {
  return (
    <>
      <PageIntroduction />
      <ProjectList />
    </>
  )
}