export const fetchHygraphQuery = async <T>(
  query: string, 
  revalidate?: number
  ): Promise<T> => {
  const hygraphUrl = process.env.HYGRAPH_URL;

  if (!hygraphUrl) {
    throw new Error("HYGRAPH_URL nao definida. Configure essa variavel no arquivo .env.local.");
  }

  const response = await fetch(hygraphUrl, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`
    },
    body: JSON.stringify({ query }),
    next: {
      revalidate
    }
  })

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Erro ao consultar Hygraph (${response.status}): ${errorBody}`);
  }

  const { data } = await response.json();

  return data;
}