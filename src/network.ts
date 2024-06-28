export async function get<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);
    const data = (await response.json()) as T;
    const delay = (timeout: number) =>
      new Promise((resolve) => setTimeout(resolve, timeout));

    await delay(1000);
    return data;
  } catch (error: unknown) {
    throw new Error('Could not fetch the data for now, please try again later');
  }
}
