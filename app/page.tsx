import { HeroSection } from "./components/pages/home/hero-section";
import { KnownTechs } from "./components/pages/home/known-techs";
import { HighlightedProjects } from "./components/pages/home/highlighted-projects";
import { WorkExperience } from "./components/pages/home/work-experience";
import { fetchHygraphQuery } from "./utils/fetch-hygraph-query";
import { HomepageData } from "./Types/page-info";

const getPageData = async (): Promise<HomepageData> => {
  const query = `
    query PageInfoQuery {
      page(where: {slug: "home"}) {
        introduction {
          raw
        }
        technologies {
          name
        }
        profilePicture {
          url
        }
        socials {
          url
          iconSvg
        }
        knownTechs {
          iconSvg
          name
          startDate
        }
        highlightProjects {
          slug
          thumbnail {
            url
          }
          title
          shortDescription
          technologies {
            name
          }
        }
      }
    }
  `
  const revalidateData = 60 * 60 * 24// 24 hours;
  return fetchHygraphQuery(query, revalidateData);
}

export default async function Home() {
  const { page: pageData } = await getPageData();

  return (
    <>
      <HeroSection homeInfo={pageData} />
      <KnownTechs techs={pageData.knownTechs} />
      <HighlightedProjects projects={pageData.highlightProjects}/>
      <WorkExperience />
    </>
  )
}
