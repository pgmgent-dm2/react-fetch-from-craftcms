const GET_ALL_PROJECTS_QUERY = `
  query Projects {
    projects: entries(section: "projects") {
      id
      title
      slug
    }
  }
`;

export async function fetchAllProjects() {
  const data = await graphqlRequest(GET_ALL_PROJECTS_QUERY);
  console.log(data.projects);
  return data.projects;
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
