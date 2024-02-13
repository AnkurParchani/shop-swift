"use client";

import { useGetAllItems } from "@/app/hooks/useItems";
import { useGetUser } from "@/app/hooks/useUser";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Item } from "../../../../global";

type FooterPartType = {
  children: React.ReactNode;
  heading: string;
  fullWidth?: boolean;
};

type FooterLinkType = {
  children: React.ReactNode;
  changeParam?: any;
  href?: string;
  blank?: boolean;
};

const Footer = () => {
  const { data: user } = useGetUser();
  const { data: items } = useGetAllItems();
  const [hasUser, setHasUser] = useState(false);
  const [allItems, setAllItems] = useState(null);

  // For the change in user state
  useEffect(() => {
    if (user) {
      setHasUser(true);
    } else {
      setHasUser(false);
    }
  }, [user]);

  // For change in item's state
  useEffect(() => {
    if (items) {
      setAllItems(items);
    } else {
      setAllItems(null);
    }
  }, [items]);

  return (
    <>
      <div className="mt-4 bg-[#111] px-5 py-6">
        <div className="mx-auto max-w-6xl ">
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Online shopping footer part */}

            <FooterPart heading="Online shopping">
              <FooterLink changeParam={"gender=male"}>Men</FooterLink>
              <FooterLink changeParam={"gender=female"}>Women</FooterLink>

              {allItems &&
                items.map((item: Item) => (
                  <FooterLink
                    key={item.id}
                    changeParam={`category=${item.category}`}
                  >
                    {item.category}
                  </FooterLink>
                ))}
            </FooterPart>

            {/* For Site Map */}
            {hasUser && (
              <FooterPart heading="Site Map">
                <FooterLink href="/my-wishlist">Wishlist</FooterLink>
                <FooterLink href="/my-orders">Orders</FooterLink>
                <FooterLink href="/my-reviews">Reviews</FooterLink>
                <FooterLink href="/my-addresses">Addresses</FooterLink>
                <FooterLink href="/my-cart">Cart</FooterLink>
                <FooterLink href="/settings">Settings</FooterLink>
                <FooterLink href="">Privacy Policy</FooterLink>
              </FooterPart>
            )}

            {/* For Social Links */}
            <FooterPart heading="Get to know us">
              <FooterLink blank href="https://www.facebook.com">
                Facebook
              </FooterLink>
              <FooterLink blank href="https://www.instagram.com">
                Instagram
              </FooterLink>
              <FooterLink blank href="https://www.twitter.com">
                Twitter
              </FooterLink>
              <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
            </FooterPart>

            {/* Address */}
            <FooterPart fullWidth heading="Registered office Addresses">
              <div className="flex flex-col gap-0.5 text-gray-300 ">
                <p>ShopSwift Inc.</p>
                <p>456 Business Boulevard, Suite 789,</p>
                <p>Corporate Plaza,</p>
                <p>Cityville, XY 78901,</p>
                <p>Fictional County</p>
              </div>
            </FooterPart>
          </div>

          <div className="mt-5 flex items-end justify-between text-xs text-yellow-200">
            <Image
              src="/images/logo.png"
              alt="Brand img"
              height={1000}
              width={1000}
              className="h-14 w-auto rounded-full"
            />
            <div>
              <p>CIN: U123456789</p>
              <p>Tel: 9876543210</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Individual footer section
function FooterPart({ children, heading, fullWidth }: FooterPartType) {
  return (
    <div className={`${fullWidth && "col-span-full md:col-auto"}`}>
      <h1 className="mb-1 text-sm font-bold uppercase text-content1-500">
        {heading}
      </h1>
      <div className="flex flex-col gap-1 text-xs font-semibold">
        {children}
      </div>
    </div>
  );
}

// Footer Link
function FooterLink({ children, changeParam, href, blank }: FooterLinkType) {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      {changeParam ? (
        <Link
          className="cursor-pointer capitalize text-gray-300 hover:text-primary hover:underline"
          href={`/?${changeParam}`}
          onClick={() => {
            setSearchParams(`${changeParam}`);
          }}
        >
          {children}
        </Link>
      ) : (
        <Link
          className="cursor-pointer text-gray-300 hover:text-primary hover:underline"
          target={blank ? "_blank" : "_self"}
          href={href as string}
        >
          {children}
        </Link>
      )}
    </>
  );
}

export default Footer;
