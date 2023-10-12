import Image from 'next/image'


<div className={styles.intro}>

        <h1>
          First To-Do App Version
        </h1>

        <p>
          Testing Tailwind properties. <br/>
          How does this work. <br/>
          Starting to have a clue. 
        </p>


        <div className={styles.logos}>
          <div className={styles.logos__logo}>
            <Image src="/Nextjs.png" alt='Next.js logo' layout='fill' className={'image'}/>
          </div>
          <div className={styles.logos__logo}>
            <Image src="/Typescript.png" alt='Tailwind logo' layout='fill' className={'image'}></Image>
          </div>
          <div className={styles.logos__logo}>
            <Image src="/Tailwind.png" alt='Tailwind logo' layout='fill' className={'image'}></Image>
          </div>
        </div>
      </div>
