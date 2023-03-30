export const get = async (url: string) => {
  const result = await fetch(process.env.REACT_APP_API_URL + url);

  if (!result.ok) {
    throw new Error(`Could not fetch ${url}, status: ${result.status}`);
  }

  return await result.json();
};

export const postReturnBody = async (url: string, data: any) => {
  const json = JSON.stringify(data);
  let result = await fetch(process.env.REACT_APP_API_URL + url, {
    method: "Post",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: json,
  });

  return await result.json();
};
export const postNoBody = async (url: string, data: any) => {
  const json = JSON.stringify(data);
  let result = await fetch(process.env.REACT_APP_API_URL + url, {
    method: "Post",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: json,
  });

  return await result;
};