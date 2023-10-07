import { REVALIDATE_DATA } from "./variables";
import { HomepageData } from "./Types/page-info";
import { fetchHygraphQuery } from "./utils/fetch-hygraph-query";
import { KnownTechs } from "./components/pages/home/known-techs";
import { HeroSection } from "./components/pages/home/hero-section";
import { WorkExperience } from "./components/pages/home/work-experience";
import { HighlightedProjects } from "./components/pages/home/highlighted-projects";

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
    workExperiences {
      companyLogo {
        url
      }
      role
      companyName
      companyUrl
      startDate
      endDate
      description {
        raw
      }
      technologies {
        name
      }
    }
  }
`
  return fetchHygraphQuery(query, REVALIDATE_DATA);
}

export default async function Home() {
  const { page: pageData, workExperiences } = await getPageData();

  return (
    <>
      <HeroSection homeInfo={pageData} />
      <KnownTechs techs={pageData.knownTechs} />
      <HighlightedProjects projects={pageData.highlightProjects} />
      <WorkExperience expirencies={workExperiences} />
    </>
  )
}
