import { z } from 'zod';

export async function get<T extends z.ZodTypeAny, D>(
  url: string,
  schema: T
): Promise<D> {
  try {
    const response = await fetch(url);
    const data = (await response.json()) as D;

    const validatedData = schema.parse(data) as D;

    const delay = (timeout: number) =>
      new Promise((resolve) => setTimeout(resolve, timeout));

    await delay(1000);

    return validatedData;
  } catch (error: unknown) {
    console.log((error as z.ZodError).flatten());
    throw error;
  }
}
