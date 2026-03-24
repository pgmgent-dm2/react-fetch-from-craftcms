const GET_ALL_PROJECTS_QUERY = `
  query Projects {
    projects: entries(section: "projects") {
      id
      title
      slug
      ... on projectsET_Entry {
        featuredImagesMatrix {
          ... on featuredImageET_Entry {
            isThumbnail
            image {
              url
            }
          }
        }
      }
    }
  }
`;

const GET_PROJECT_BY_SLUG_QUERY = `
query GetSingleProject($slug:[String]) {
    project: entries(section: "projects", slug: $slug, limit: 1) {
      id
      title
      slug
      ... on projectsET_Entry {
        featuredImagesMatrix {
          ... on featuredImageET_Entry {
            isThumbnail
            image {
              url
            }
          }
        }
      }
    }
  }
`;



export async function fetchAllProjects() {
  const data = await graphqlRequest(GET_ALL_PROJECTS_QUERY);
  console.log(data.projects);
  return data.projects.map((project) => ({
    id: project.id,
    title: project.title,
    slug: project.slug,
    imageUrl: project.featuredImagesMatrix.find((img) => img.isThumbnail)?.image[0]?.url || project.featuredImagesMatrix[0]?.image[0]?.url
  }));
}

export async function fetchProjectBySlug(slug) {
  const data = await graphqlRequest(GET_PROJECT_BY_SLUG_QUERY, { slug });
  const project = data.project[0];
  if (!project) throw new Error("Project niet gevonden");
  return {
    id: project.id,
    title: project.title,
    slug: project.slug,
    imageUrl: project.featuredImagesMatrix.find((img) => img.isThumbnail)?.image[0]?.url || project.featuredImagesMatrix[0]?.image[0]?.url
  };
}


// Helper voor GraphQL requests naar Craft CMS
// Deze wordt later gebruikt om projects op te halen
async function graphqlRequest(query, variables) {
  const response = await fetch(import.meta.env.VITE_CRAFT_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_CRAFT_BEARER_TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const json = await response.json();

  if (json.errors?.length) {
    throw new Error(json.errors[0].message || "GraphQL error");
  }

  return json.data;
}
