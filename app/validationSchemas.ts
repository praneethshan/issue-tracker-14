/** @format */

import { z } from 'zod';

//Issue Schema object to validate request body
export const createIssueSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  description: z.string().min(1, 'Description is required'),
});
