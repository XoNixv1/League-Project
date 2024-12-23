type Iheaders = { "Content-Type": "application/json" };

const useHttp = () => {
  const request = async (
    url: string,
    method: string = "GET",
    body = null,
    headers: Iheaders = { "Content-Type": "application/json" }
  ) => {
    try {
      const response = await fetch(url, { method, body, headers });

      if (!response.ok) {
        throw new Error(`Couldnt fetch ${url}, status ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (e) {
      throw e;
    }
  };
  return { request };
};

export default useHttp;
