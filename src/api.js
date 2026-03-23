const PROJECTS_QUERY = `
  query Projects {
    entries(section: "projects") {
      id
      slug
      title
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

const PROJECT_BY_SLUG_QUERY = `
  query ProjectBySlug($slug: [String]) {
    entries(section: "projects", slug: $slug) {
      id
      slug
      title
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

function mapProject(entry) {
  const blocks = entry.featuredImagesMatrix || [];
  const thumbnail = blocks.find((block) => block.isThumbnail);

  return {
    id: entry.id,
    slug: entry.slug,
    title: entry.title || "Zonder titel",
    imageUrl: thumbnail?.image?.[0]?.url || null,
  };
}

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

export async function fetchProjects() {
  const data = await graphqlRequest(PROJECTS_QUERY);
  return (data?.entries || []).map(mapProject);
}

export async function fetchProjectBySlug(slug) {
  const data = await graphqlRequest(PROJECT_BY_SLUG_QUERY, { slug: [slug] });
  const entry = data?.entries?.[0];
  return entry ? mapProject(entry) : null;
}
