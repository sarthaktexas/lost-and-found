import HeadObject from '../components/head'
import useSWR from "swr"
import fetcher from '../lib/fetcher'
import Link from 'next/link'

export default function Home() {
  const events = useSWR('/api/getlistofevents', fetcher).data;
  return (
    <div className="m-10">
      <HeadObject />
      <h1 className="font-handjet text-6xl">Lost and Found</h1>
      <ol className="list-disc  list-inside">
        {events?.map((event) => (
          <li key={event} className="text-lg text-gray-400 hover:underline italic"><Link href={`/${event}`}>{event}</Link></li>
        ))}
      </ol>
    </div>
  )
}
