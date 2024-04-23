/** @format */
'use client';

import { Button, Callout, TextField } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Create interface to make the shape of form
interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  // Use to redirect
  const router = useRouter();
  // Use react hook form to work with form
  const { register, control, handleSubmit } = useForm<IssueForm>();

  // Use state variable to catch errors
  const [error, setError] = useState('');

  return (
    <div className="max-w-xl ">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post('/api/issues', data);
            router.push('/issues');
          } catch (error) {
            setError('Unexpected error occured.');
          }
        })}
      >
        <TextField.Root
          placeholder="Title"
          {...register('title')}
        ></TextField.Root>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
