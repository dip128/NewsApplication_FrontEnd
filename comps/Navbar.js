import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  return (
    <div className="container">
      <nav>
        <Image src="/rupee.png" width={50} height={48} />
        <h1>GETNEWS</h1>
        <ul>
           <li><Link href="/"><a>Home</a></Link></li>
          <li><Link href="/news"><a>News</a></Link></li>
          <li><Link href="/report"><a>Report</a></Link></li>
          <li><Link href="/add"><a>Admin</a></Link></li>
        </ul>
      </nav>
    </div>
  )
}