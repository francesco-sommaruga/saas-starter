"use client";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
  CreditCardIcon,
  HeartIcon,
  ChatBubbleBottomCenterIcon,
  ChatBubbleBottomCenterTextIcon,
  ChevronDownIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { handleLogout } from "./auth/actions";
import Logo from "./Logo";
import { useToast } from "./ui/use-toast";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: true },
  {
    name: "Chatbots",
    href: "#",
    icon: ChatBubbleBottomCenterTextIcon,
    current: false,
  },
  { name: "Chat", href: "/chat", icon: FolderIcon, current: false },
  { name: "Calendar", href: "#", icon: CalendarIcon, current: false },
  { name: "Documents", href: "#", icon: DocumentDuplicateIcon, current: false },
  { name: "Reports", href: "#", icon: ChartPieIcon, current: false },
];
const settings = [
  {
    id: 1,
    name: "Account",
    href: "/dashboard/account",
    initial: "A",
    current: false,
    icon: UsersIcon,
  },
  {
    id: 2,
    name: "Branding",
    href: "/settings/branding",
    initial: "B",
    current: false,
    icon: HeartIcon,
  },
  {
    id: 3,
    name: "Billing",
    href: "/settings/billing",
    initial: "B",
    current: false,
    icon: CreditCardIcon,
  },
];

const userNavigation = [
  { name: "Your profile", href: "/dashboard/account" },
  {
    name: "Sign out",
    href: "#",
    action: (afterAction?: () => void) => {
      handleLogout();
      if (afterAction) afterAction();
    },
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Example({ userEmail }: { userEmail?: string }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const { toast } = useToast();
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-card px-6 pb-2 ring-1 ring-white/10">
                    <Logo />
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <Link
                                  href={item.href}
                                  className={classNames(
                                    item.href === pathname
                                      ? "bg-primary text-primary-foreground"
                                      : "text-foreground  hover:bg-foreground/10",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <item.icon
                                    className="h-6 w-6 shrink-0"
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li>
                          <div className="text-xs font-semibold leading-6 text-foreground">
                            Settings
                          </div>
                          <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {settings.map((setting) => (
                              <li key={setting.name}>
                                <Link
                                  href={setting.href}
                                  className={classNames(
                                    setting.href === pathname
                                      ? "bg-primary text-primary-foreground"
                                      : "text-foreground hover:bg-background/10",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <span
                                    className={classNames(
                                      setting.href === pathname
                                        ? "text-primary-foreground"
                                        : "text-foreground",
                                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg  text-[0.625rem] font-medium"
                                    )}
                                  >
                                    <setting.icon />
                                  </span>
                                  <span className="truncate">
                                    {setting.name}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-card px-6 border-r">
            <Logo />
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={classNames(
                            item.href === pathname
                              ? "bg-primary text-primary-foreground"
                              : "text-foreground  hover:bg-foreground/10 ",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <item.icon
                            className="h-6 w-6 shrink-0"
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <div className="text-xs font-semibold leading-6 text-foreground/80 dark:text-foreground">
                    Settings
                  </div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {settings.map((setting) => (
                      <li key={setting.name}>
                        <Link
                          href={setting.href}
                          className={classNames(
                            setting.href === pathname
                              ? "bg-primary text-primary-foreground"
                              : "text-foreground hover:bg-foreground/10",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <span
                            className={classNames(
                              setting.href === pathname
                                ? "text-primary-foreground"
                                : "text-foreground",
                              "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg  text-[0.625rem] font-medium"
                            )}
                          >
                            <setting.icon />
                          </span>
                          <span className="truncate">{setting.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="-mx-6 mt-auto">
                  <Link
                    href="/dashboard/settings/account"
                    className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-foreground hover:bg-foreground/10"
                  >
                    <Cog6ToothIcon className="h-6 w-6" />
                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true">Settings</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Header */}
        <header className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b bg-background px-4 sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-foreground lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div
              className="h-6 w-px bg-foreground/30 lg:hidden"
              aria-hidden="true"
            />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              {/* <form className="relative flex flex-1" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <MagnifyingGlassIcon
                  className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                  aria-hidden="true"
                />
                <input
                  id="search-field"
                  className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                  placeholder="Search..."
                  type="search"
                  name="search"
                />
              </form> */}
              <div className="flex-1"></div>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                {/* <button
                  type="button"
                  className="-m-2.5 p-2.5 text-foreground/30 hover:text-foreground/40"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}

                {/* Separator */}
                {/* <div
                  className="hidden lg:block lg:h-6 lg:w-px lg:bg-foreground/30"
                  aria-hidden="true"
                /> */}

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <Menu.Button className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    {/* <img
                      className="h-8 w-8 rounded-full bg-gray-50"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    /> */}
                    <UserCircleIcon className="h-8 w-8" aria-hidden="true" />
                    <span className="hidden lg:flex lg:items-center">
                      <span
                        className="ml-4 text-sm font-semibold leading-6 text-foreground"
                        aria-hidden="true"
                      >
                        {userEmail || "Account"}
                      </span>
                      <ChevronDownIcon
                        className="ml-2 h-5 w-5 text-foreground/40"
                        aria-hidden="true"
                      />
                    </span>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-card py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) =>
                            item.action ? (
                              <button
                                onClick={() => {
                                  let afterAction = () => {};
                                  if (item.name === "Sign out")
                                    afterAction = () =>
                                      toast({
                                        title: "Signed out",
                                        description: "You have been logged out",
                                      });
                                  item.action(afterAction);
                                }}
                                className={classNames(
                                  active ? "bg-card/90" : "",
                                  "block px-3 py-1 text-sm leading-6 text-card-foreground font-semibold"
                                )}
                              >
                                {item.name}
                              </button>
                            ) : (
                              <Link
                                href={item.href}
                                className={classNames(
                                  active ? "bg-card/90" : "",
                                  "block px-3 py-1 text-sm leading-6 text-card-foreground font-semibold"
                                )}
                              >
                                {item.name}
                              </Link>
                            )
                          }
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}
