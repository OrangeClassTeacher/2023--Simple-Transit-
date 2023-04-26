
import Image from "next/image"
import Link from "next/link";


export default function Home() {
  return (
    <main className="landing flex item-center justify-center">
      <div className="flex flex-col justify-around ">
        <div className="image_div">
          <Image
            src="/logo.png"
            alt="image"

            fill
            sizes="(max-width: 768px) 500px,
                    (max-width: 1200px) 500px,
                    500px
                    "
          />
        </div>

        <h1 id="text" className="text-blue-500 text-6xl blue1">SIMPLE TRANSIT</h1>

        <Link className="button1" href={"/api"}>
          Get started !
        </Link>
      </div>

    </main>
  )
}
