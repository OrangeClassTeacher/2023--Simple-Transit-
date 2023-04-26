
import Image from "next/image"
import Link from "next/link";


export default function Home(): JSX.Element {
  return (
    <main >
      <Image
        src="/logo.png"
        alt="image"
        width={500}
        height={500}
      />
      <h1>SIMPLE TRANSIT</h1>

      <Link href={"/page1"}>
        Get started !
      </Link>
    </main>
  )
}
