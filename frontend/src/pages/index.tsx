



import Image from "next/image"
import Link from "next/link";


export default function Home(): JSX.Element {
  return (
    <main className="landing flex item-center justify-center mx-auto">
      <div className="flex flex-col justify-around ">

        {/* <Image
            src="/logo.png"
            alt="image"

            fill
            sizes="(max-width: 768px) 500px,
                    (max-width: 1200px) 500px,
                    500px
                    "/> */}
        <img className="image_div land" src="/logo.png" alt="logo" />


        <h1 id="text" className="land text-blue-500 text-6xl blue1">SIMPLE TRANSIT</h1>

        <Link className="land button1" href={"/page1"}>
          Get started !
        </Link>
      </div>

    </main >
  )
}
