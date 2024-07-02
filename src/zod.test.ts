import { z } from 'zod';

test('zod tests', () => {
  const addressSchema = z.object({
    street: z.string(),
    pinCode: z.number(),
  });
  const userSchema = z.object({
    // User Id should not be also 50 and 75
    userId: z
      .number()
      .min(1)
      .max(10000)
      .refine((val) => val !== 50 && val !== 75, {
        message: 'userId can not be 50 or 75 and must be within 1 and 10000',
      }),
    id: z.number().gt(100),
    gender: z
      .union([z.literal('f'), z.literal('m')])
      .transform((val) => ({ f: 'female', m: 'male' }[val])),
    body: z.string().nullable(),
    name: z.string().min(5).max(50).trim().toLowerCase(),
    address: addressSchema,
  });

  type User = z.infer<typeof userSchema>;

  const user: User = {
    userId: 74,
    id: 191,
    gender: 'm',
    body: 'some stuff',
    name: 'S P Balasubrahmanyam',
    address: {
      street: 'near city mall',
      pinCode: 45555,
    },
  };
  // expect(() => userSchema.parse(user)).toThrow();
  const parsedUser = userSchema.safeParse(user);
  // console.dir(parsedUser.error, { depth: null });
  console.dir(parsedUser.error?.flatten());
  console.dir(parsedUser);
});
