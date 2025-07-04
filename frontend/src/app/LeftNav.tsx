'use client'
import React, { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LeftNav = () => {
  const path = usePathname();

  return (
    <ul className="w-[80%] space-y-2">
      <li className={`w-full${path.endsWith('/converse') ? ' bg-gray-600' : ''}`}>
        <LeftNavLink href="/converse">Converse</LeftNavLink>
      </li>
      <li className={`w-full${path.endsWith('/documents') ? ' bg-gray-600' : ''}`}>
        <LeftNavLink href="/documents">Documents</LeftNavLink>
      </li>
    </ul>
  );
}

const LeftNavLink: FC<React.ComponentProps<typeof Link>> = ({children, className, ...rest}) => {
  return (
    <Link
      className="w-full border border-purple-300 p-2 hover:border-purple-100 hover:bg-gray-100/10 active:bg-gray-500 inline-block text-center"
      {...rest}
    >
      {children}
    </Link>
  );
}

export default LeftNav;