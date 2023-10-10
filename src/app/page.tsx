"use client"

import autoprefixer from 'autoprefixer'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

import React from "react";

import {EditIcon} from '../components/icons/edit_icon';
import {NewTaskIcon} from '../components/icons/NewTaskIcon';
import {AcmeLogo} from "../components/icons/AcmeLogo";

import {Button, Checkbox, Pagination, 
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  cn,
  Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Avatar,
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure,
  Input
} from "@nextui-org/react";

// compnents to be created

// component ends here

export default function Home() {

  const [selectedColor, setSelectedColor] = React.useState("primary")
  const {isOpen, onOpen, onOpenChange} = useDisclosure();


  return (
    <main className={styles.container}>
      <Navbar>
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>

        <NavbarContent className="hidden sm:flex gap-8" justify="center">
          <NavbarItem isActive>
            <Link href="#" aria-current="page" color={selectedColor}>
              To-Do App
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              About project
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent as="div" justify="end">
          <p className='text-sm font-thin'>
            <span className='font-bold'>
              👋 {selectedColor}
            </span>
            , happy to see you here!
          </p>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color={selectedColor}
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat" closeOnSelect={false}>
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="color selection" closeOnSelect={false}>

                <div className='flex flex-col gap-3'>
                  Select your color

                  <div className='flex gap-3 justify-center'>
                    <Button isIconOnly
                        className={`bg-primary-200 hover:bg-primary-300 border-2
                        ${selectedColor == "primary" ? 'border-primary' : 'border-transparent '}`}
                      onPress={() => setSelectedColor("primary")}
                    >
                    </Button>

                    <Button isIconOnly 
                      className={`bg-success-200 hover:bg-success-300 border-2 border-transparent ${cn({
                        'border-success': selectedColor === 'success',
                      })}`}
                      onPress={() => setSelectedColor("success")}
                    >
                    </Button> 

                    <Button isIconOnly 
                      className={`bg-warning-200 hover:bg-warning-300 border-2 border-transparent ${cn({
                        'border-warning': selectedColor === 'warning',
                      })}`}
                      onPress={() => setSelectedColor("warning")}
                    >
                    </Button> 
                  </div>
                </div>

              </DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>

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

            <div className={[styles.todo__interface__topbar__element,styles[selectedColor]].join(" ")}>
              In Progress
            </div>
            <div className={styles.todo__interface__topbar__element}>
              Finished
            </div>
        </div>

        <div className={styles.todo__items}>

          {/* add new todo */}
          <div className={styles.todo__item__elements}>
            <>
              <Button fullWidth onPress={onOpen} variant='light'
              className='border-1 border-content3 text-default-400 py-6' startContent={<NewTaskIcon />}
              >
                Add Task
              </Button>
              <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} backdrop='blur'>
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1 items-center">Your New Task</ModalHeader>
                      <ModalBody>
                        <div className="flex flex-col gap-6">
                            <Input
                              isRequired
                              key="outside"
                              type="text"
                              label="Title"
                              labelPlacement="outside"
                              placeholder="What's the goal?"
                              className='mt-8'
                            />
                            <Input
                              isRequired
                              key="outside"
                              type="text"
                              label="Description"
                              labelPlacement="outside"
                              placeholder="What is it about?"
                            />
                            <Input
                              isRequired
                              key="outside"
                              type="date"
                              label="Date"
                              labelPlacement="outside"
                              placeholder="DD/MM/YYYY"
                            />
                        </div>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                          Close
                        </Button>
                        <Button color="primary" onPress={onClose}>
                          Action
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </>
          </div>

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
                    isIconOnly
                    variant="light"
                    color={selectedColor} 
                  >
                    <EditIcon className={selectedColor}/>
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
            <div className="flex">
              <Dropdown>
                <DropdownTrigger>
                  <Button 
                    isIconOnly
                    variant="light"
                    color={selectedColor} 
                  >
                    <EditIcon className={selectedColor}/>
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
          
        </div>

        <div className='flex items-center justify-center m-3'>
          <Pagination loop showControls color={selectedColor} total={5} initialPage={1} />
        </div>

      </div>


    <footer className='mt-8'>
        <div className='w-full mx-auto max-w-screen p4 flex items-center justify-center my-6'>
          <p>
            Made by Jakub ✌️
          </p>

        </div>
    </footer>


    </main>
  )
}
