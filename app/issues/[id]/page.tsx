/** @format */
import IsssueStatusBadge from '@/app/components/IssueStatusBadge';
import prisma from '@/prisma/client';
import { Card, Flex, Heading } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import delay from 'delay';

interface Props {
  params: {
    id: string;
  };
}
const IssueDetailsPage = async ({ params }: Props) => {
  // Get issue
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) notFound();

  // Set delay to reder page
  await delay(2000);

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex className="space-x-3" my="2">
        <IsssueStatusBadge status={issue.status} />
        <p>{issue.createdAt.toDateString()}</p>
      </Flex>
      <Card className="prose" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default IssueDetailsPage;
