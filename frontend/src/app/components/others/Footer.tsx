"use client";

import Link from "next/link";
import { useSearchParams } from "react-router-dom";

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

const Footer = ({ hasUser }: { hasUser: boolean }) => {
  return (
    <>
      <div className="mt-4 bg-[#111] px-5 py-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Online shopping footer part */}
            <FooterPart heading="Online shopping">
              <FooterLink changeParam={{ gender: "male" }}>Men</FooterLink>
              <FooterLink changeParam={{ gender: "female" }}>Women</FooterLink>
              <FooterLink changeParam={{ category: "clothes" }}>
                Clothes
              </FooterLink>
              <FooterLink changeParam={{ category: "shoes" }}>Shoes</FooterLink>
              <FooterLink changeParam={{ category: "sunglasses" }}>
                Sunglasses
              </FooterLink>
              <FooterLink changeParam={{ category: "watches" }}>
                Watches
              </FooterLink>
            </FooterPart>

            {/* For Site Map */}
            {hasUser && (
              <FooterPart heading="Site Map">
                <FooterLink href="/my-wishlist">Wishlist</FooterLink>
                <FooterLink href="/my-orders">Orders</FooterLink>
                <FooterLink href="/my-reviews">Reviews</FooterLink>
                <FooterLink href="/my-addresses">Addresses</FooterLink>
                <FooterLink href="/my-cart">Cart</FooterLink>
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
              <FooterLink href="">Privacy Policy</FooterLink>
            </FooterPart>

            {/* Address */}
            <FooterPart fullWidth heading="Registered office Addresses">
              <div className="flex flex-col gap-0.5 text-gray-300 ">
                <p>EdenEmpire Inc.</p>
                <p>456 Business Boulevard, Suite 789,</p>
                <p>Corporate Plaza,</p>
                <p>Cityville, XY 78901,</p>
                <p>Fictional County</p>
              </div>
            </FooterPart>
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
      <h1 className="mb-1 text-sm font-bold uppercase text-primary">
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
  const prevSearchParams = Object.fromEntries(searchParams);

  return (
    <>
      {changeParam ? (
        <p
          className="text-gray-300 hover:text-[#0066c0] hover:underline"
          onClick={() => setSearchParams({ ...changeParam, prevSearchParams })}
        >
          {children}
        </p>
      ) : (
        <Link
          className="text-gray-300 hover:text-[#0066c0] hover:underline"
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
