'use client';

import { useRouter } from 'next/navigation';
import JobForm from '@/components/JobForm';

export default function EmployerDashboard() {
  const router = useRouter();

  const handleAddJob = async (newJob: Job) => {
    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newJob),
      });

      if (!res.ok) {
        throw new Error('Failed to create job');
      }

      // Redirect to homepage after successful job creation
      router.push('/');
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-6 mt-26">
      <h1 className="text-3xl font-bold mb-6">Post a Job</h1>
      <JobForm onSubmit={handleAddJob} />
    </main>
  );
}
