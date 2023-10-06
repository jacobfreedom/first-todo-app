import autoprefixer from 'autoprefixer'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import {Button} from '@nextui-org/button'; 

export default function Home() {
  return (
    <main className={styles.container}>
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

      <div className={styles.todo__interface}>

        <div className={styles.todo__interface__topbar}>

            <div className={[styles.todo__interface__topbar__element,styles.active].join(" ")}>
              In Progress
            </div>
            <div className={styles.todo__interface__topbar__element}>
              Finished
            </div>
        </div>

        <div className={styles.todo_items}>

          <div className={styles.statuscheck}>
              Status
              <input type='checkbox'/>
          </div>


          <div className={styles.todo__item__elements}>
            <div className={styles.todo__title}>
              To-Do
            </div>

            <div className={styles.todo__description}>
              Description
            </div>
            <div className={styles.todo__deadline}>
              Deadline
            </div>  
          </div>

          <div>
      <Button>Click me</Button>
    </div>
        </div>
      </div>

    </main>
  )
}
