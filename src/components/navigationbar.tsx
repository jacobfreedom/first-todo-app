"use client"

import { AcmeLogo } from "@/icons/AcmeLogo";
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, 
    Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, cn } from "@nextui-org/react";
import { useColor } from "@/app/ColorContext";

function Nav() {

    const { selectedColor, setSelectedColor } = useColor();

    return (
      
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
    )
} 

export default Nav;