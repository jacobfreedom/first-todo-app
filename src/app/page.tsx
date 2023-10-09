"use client"

import autoprefixer from 'autoprefixer'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

import React from "react";

import {Button, Checkbox, Pagination, 
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  RadioGroup, 
  Radio
} from "@nextui-org/react";

export default function Home() {

  const [selectedColor, setSelectedColor] = React.useState("primary")


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
        <div className=''>
          <RadioGroup
                label="Select your color"
                orientation="horizontal"
                color={selectedColor}
                defaultValue="primary"
                onValueChange={setSelectedColor}
              >
                <Radio value="primary">Primary</Radio>
                <Radio value="secondary">Secondary</Radio>
                <Radio value="success">Success</Radio>
                <Radio value="warning">Warning</Radio>
                <Radio value="danger">Danger</Radio>
              </RadioGroup>
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

        <div className={styles.todo__items}>


          {/* first item */}
          <div className={styles.todo__item__elements}>

            <div className="flex items-center">
              <Checkbox color={selectedColor} radius="full" />
            </div>
            <div className={styles.todo__elements__cotent}>
              <div className='font-semibold'>
                An example To Do Title
              </div>

              <div className='font-extralight text-sm h-13'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris varius enim sed orci pellentesque, ut ornare justo vulputate. Cras tristique ante ut mauris sagittis, sit amet volutpat justo aliquet. Pellentesque pulvinar eleifend dignissim. 
              </div>
            </div>

            <div className={styles.todo__elements__info}>
              <div className='font-medium'>
                Deadline
              </div>
              <div className='font-extralight truncate'>
                01. 13. 2028
              </div>
            </div>  
            <div className="flex">
              <Dropdown>
                <DropdownTrigger>
                  <Button 
                    variant="light"
                    color={selectedColor} 
                  >
                    Open Menu
                  </Button>
                </DropdownTrigger>
                <DropdownMenu 
                  aria-label="Action event example" 
                  onAction={(key) => alert(key)}
                >
                  <DropdownItem key="edit">Edit file</DropdownItem>
                  <DropdownItem key="delete" className="text-danger" color="danger">
                    Delete file
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>


          {/* second item */}
          <div className={styles.todo__item__elements}>


            <div className="flex items-center">
              <Checkbox color="success" radius="full" />
            </div>
            <div className={styles.todo__elements__cotent}>
              <div className='font-semibold'>
                An example To Do Title
              </div>

              <div className='font-extralight text-sm h-13'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris varius enim sed orci pellentesque, ut ornare justo vulputate. Cras tristique ante ut mauris sagittis, sit amet volutpat justo aliquet. Pellentesque pulvinar eleifend dignissim. 
              </div>
            </div>

            <div className={styles.todo__elements__info}>
              <div className='font-medium'>
                Deadline
              </div>
              <div className='font-extralight truncate'>
                01. 13. 2028
              </div>
            </div>  
          </div>
          
        </div>

        <div className='flex items-center justify-center m-3'>
          <Pagination loop showControls color={selectedColor} total={5} initialPage={1} />
        </div>
      </div>

    </main>
  )
}
