"use client"

import autoprefixer from 'autoprefixer'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import React from "react";
import {Button, Checkbox} from "@nextui-org/react";

export default function Home() {
  const [isSelected, setIsSelected] = React.useState(false);

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
            <div className="flex flex-col">
              <Checkbox color="success" radius="full" isSelected={isSelected} onValueChange={setIsSelected}>
                Subscribe
              </Checkbox>
              <p className="text-default-500">
                Selected: {isSelected ? "true" : "false"}
              </p>
              <Checkbox color="success">Success</Checkbox>
            </div>
          </div>


          <div className={styles.todo__item__elements}>
            <div className={styles.todo__elements__cotent}>
              <div className='font-semibold'>
                Nakoupit si rohliky
              </div>

              <div className='font-extralight text-sm'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris varius enim sed orci pellentesque, ut ornare justo vulputate. Cras tristique ante ut mauris sagittis, sit amet volutpat justo aliquet. Pellentesque pulvinar eleifend dignissim. Proin fringilla massa lorem, ut facilisis neque posuere ac. Maecenas sollicitudin, sem eget porttitor placerat, elit dui semper dolor, non lacinia felis neque sit amet massa. Cras nec urna vestibulum, malesuada est eget, eleifend erat. Ut sed erat dapibus, tristique urna sed, ultrices lacus. Mauris lobortis sem et finibus convallis. Quisque malesuada magna eget diam fermentum tristique. Etiam lobortis, libero ac euismod lacinia, enim leo auctor eros, non hendrerit ligula ex non mauris. Praesent vitae pretium mauris, a auctor metus.

              Ut metus tortor, finibus vitae mauris vitae, tempor porttitor erat. Suspendisse sed magna vestibulum, sodales libero at, eleifend orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus luctus risus sed maximus elementum. Morbi nec risus lectus. Cras suscipit faucibus imperdiet. Sed nec urna enim. Ut dapibus iaculis nisi vel consequat. Aenean pharetra sollicitudin augue, ac sodales lacus facilisis in.

              Sed finibus, est sit amet efficitur ultrices, neque purus pharetra mauris, vel suscipit orci quam vel tellus. Phasellus vitae mi id magna egestas ornare. Nullam vitae varius mauris. Praesent tempus iaculis nisl, eu congue felis. Fusce justo metus, egestas vitae urna nec, malesuada aliquet mi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse auctor nibh nec nulla convallis iaculis. Sed sapien enim, consectetur at sem eget, faucibus eleifend nulla. Phasellus eget eros laoreet, mattis tortor in, viverra nisl. Sed sit amet imperdiet ante. Vestibulum eu diam vel sem viverra sodales quis a diam. Nulla consequat consequat consequat. In ultricies sit amet lectus a bibendum. Aenean ac convallis enim, et tincidunt purus. Mauris a turpis venenatis diam suscipit interdum. Vestibulum blandit, mi euismod suscipit facilisis, orci purus vehicula lorem, placerat dictum tortor sem eget justo.

              Nulla a maximus turpis. Integer faucibus est at lectus convallis, et dictum nisi varius. Morbi ac diam ut felis commodo tincidunt. Donec felis sapien, vehicula sed cursus vitae, tincidunt eget mauris. Curabitur et enim a ex porttitor ultrices in sit amet turpis. Sed aliquam quis justo et varius. Proin consequat mi vitae arcu tempus, ut vehicula ligula scelerisque. Cras eleifend velit eget dui cursus, vitae pulvinar erat sagittis. Nulla malesuada elit id erat eleifend, fringilla vulputate urna consequat. Sed in eros id lacus dignissim luctus. Nullam viverra maximus ligula id gravida. In tincidunt massa a magna bibendum aliquam.

              Integer malesuada orci nisi, quis rhoncus ligula venenatis at. In egestas lorem elit, finibus dapibus erat pharetra id. Aliquam blandit, mauris sed auctor dapibus, felis nibh feugiat ipsum, ut varius velit diam vel augue. Suspendisse convallis tortor massa, ut suscipit nunc porttitor id. Pellentesque non finibus orci. Cras ornare varius urna ut lobortis. Duis at libero vitae ante efficitur sodales. Vivamus vulputate justo quis sapien suscipit, at euismod risus euismod. Duis interdum mi at libero scelerisque fringilla. Pellentesque luctus ut ante ut iaculis. Suspendisse potenti. Morbi efficitur mi est, id accumsan lacus tincidunt at. Duis vitae nunc in ante ultricies malesuada id et neque.
              </div>
            </div>

            <div className={styles.todo__elements__info}>
              <div className='font-medium'>
                Deadline
              </div>
              <div className='font-extralight'>
                01. 13. 2028
              </div>
            </div>  
          </div>
        </div>
      </div>

    </main>
  )
}
