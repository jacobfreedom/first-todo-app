'use client'

import React from "react";
import { AcmeLogo } from "@/icons/AcmeLogo";
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, 
    Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, cn, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import { useUserContext } from "@/providers/Context/UserContext";
import { usePathname } from "next/navigation";

function Nav() {

    const { selectedColor, setSelectedColor } = useUserContext();

    const updateSelectedColor = (color: string) => {
      setSelectedColor(color);
      const userSelectedColor = 'primary';
      localStorage.setItem('user_selectedColor', JSON.stringify(userSelectedColor));
      };

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);   
    const pathname = usePathname(); 

    return (
      
        <Navbar onMenuOpenChange={setIsMenuOpen}>

        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarMenu>
            <NavbarMenuItem className="flex flex-col gap-2 w-full">
            <Link
            href="/"
            color={pathname === '/' ? selectedColor : "foreground"}
          >
            To-Do App
          </Link>
          <Link
            href="/about"
            color={pathname === '/about' ? selectedColor : "foreground"}
          >
            About project
          </Link>
            </NavbarMenuItem>
        </NavbarMenu>

        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">ACME</p>

        </NavbarBrand>


        <NavbarContent className="hidden sm:flex gap-8" justify="center">
          <NavbarItem isActive={pathname === '/'}>
            <Link
              href="/"
              color={pathname === '/' ? selectedColor : "foreground"}
              aria-current={pathname === '/' ? 'page' : undefined}
            >
              To-Do App
            </Link>
          </NavbarItem>
          <NavbarItem isActive={pathname === '/about'}>
            <Link
              href="/about"
              color={pathname === '/about' ? selectedColor : "foreground"}
              aria-current={pathname === '/about' ? 'page' : undefined}
            >
              About project
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent as="div" justify="end">
          <p className='text-sm font-thin text-right'>
            <span className='font-bold'>
              👋&nbsp;{selectedColor}
            </span>
            , welcome!
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
                      onPress={() => updateSelectedColor("primary")}
                    >
                    </Button>

                    <Button isIconOnly 
                      className={`bg-success-200 hover:bg-success-300 border-2 border-transparent ${cn({
                        'border-success': selectedColor === 'success',
                      })}`}
                      onPress={() => updateSelectedColor("success")}
                    >
                    </Button> 

                    <Button isIconOnly 
                      className={`bg-warning-200 hover:bg-warning-300 border-2 border-transparent ${cn({
                        'border-warning': selectedColor === 'warning',
                      })}`}
                      onPress={() => updateSelectedColor("warning")}
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