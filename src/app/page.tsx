import autoprefixer from 'autoprefixer'
import Image from 'next/image'
// import Style from ''

export default function Home() {
  return (
    <main className='container mx-auto px-4 h-screen'>
      <div className='flex items-center justify-center flex-col mt-20'>

        <p className='text-3xl font-bold mar'>
          First To-Do App Version
        </p>

        <p className='text-center'>
          Testing Tailwind properties. <br/>
          How does this work. <br/>
          Starting to have a clue. 
        </p>


        <div className='flex items-center justify-center m-10 space-x-12'>
          <div className='image__wrapper'>
            <Image src="/Nextjs.png" alt='Next.js logo' layout='fill' className={'image'}/>
          </div>
          <div className='image__wrapper'>
            <Image src="/Typescript.png" alt='Tailwind logo' height={120} width={120}></Image>
          </div>
          <div className='image__wrapper'>
            <Image src="/Tailwind.png" alt='Tailwind logo' height={120} width={120}></Image>
          </div>
        </div>
      </div>

      <div className='container mx-auto bg-yellow-200'>
        <div className='grid grid-cols-12 gap-4 justify-center '>

            <div className='
            col-span-2
            flex justify-center py-2
            rounded-tl-2xl bg-lime-400'>
              <p>In Progress</p>
            </div>
            <div className='col-span-2
            flex justify-center py-2
             bg-red-300'>
              <p>Finished</p>

            </div>
        </div>

        <div className='flex'>

          <div className=''>
            <p>
              Status
            </p>
          </div>


          <div className=''>
            <p>
              To-Do
            </p>
          </div>

          <div className=''>
            <p>
              Description
            </p>
          </div>
          <div className=''>
            <p>
              Deadline
            </p>
          </div>
        </div>
      </div>

    </main>
  )
}
