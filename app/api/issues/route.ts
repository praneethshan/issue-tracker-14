/** @format */

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { createIssueSchema } from '../../validationSchemas';

export async function POST(requeset: NextRequest) {
  // Get the request body
  const body = await requeset.json();

  // Validte request body
  const validation = createIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
