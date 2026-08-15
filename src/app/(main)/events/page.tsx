import { redirect } from 'next/navigation';

export default function EventsIndex() {
  // If the user navigates directly to /events, redirect them to the main event calendar page
  redirect('/hackathons');
}
