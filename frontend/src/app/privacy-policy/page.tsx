import Footer from "../components/others/Footer";

export default function Page() {
  return (
    <>
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-5 py-5">
        <p className="flex items-center gap-1 text-lg font-semibold text-content1-400">
          Privacy Policy
        </p>

        <div className="flex flex-col gap-5 px-2">
          <h2 className="mt-5 text-xs font-bold sm:text-sm md:text-base">
            Last updated: February 12, 2024
          </h2>
          <Paragraph>
            We know that you care how information about you is used and shared,
            and we appreciate your trust that we will do so carefully and
            sensibly. This Privacy Notice describes how ShopSwift Private
            Limited and its affiliates including shopswift.com, Inc. collect and
            process your personal information through websites, devices,
            products, services, online marketplace and applications that
            reference this Privacy Notice.
            <br />
            <br />
            By using ShopSwift you agree to our use of your personal information
            (including sensitive personal information) in accordance with this
            Privacy Notice, as may be amended from time to time by us at our
            discretion. You also agree and consent to us collecting, storing,
            processing, transferring, and sharing your personal information
            (including sensitive personal information) with third parties or
            service providers for the purposes set out in this Privacy Notice.
          </Paragraph>

          <Section heading="What Personal Information About Customers Does ShopSwift Collect?">
            We collect your personal information in order to provide and
            continually improve our products and services. We automatically
            collect and store certain types of information about your use of
            website, including information about your interaction with content
            and services available through website. Like many websites, we use
            cookies and other unique identifiers.
          </Section>

          <Section heading="For What Purposes Does ShopSwift Use Your Personal Information?">
            We use your personal information to take and fulfill orders, deliver
            products and services, process payments, and communicate with you
            about orders, products and services, and promotional offers.
          </Section>

          <Section heading="What About Cookies and Other Identifiers?">
            Our website utilizes cookies to track user sessions and
            automatically log users out after a designated period of inactivity.
            These cookies enhance your browsing experience and help ensure the
            security of your personal information. You can manage your cookie
            preferences in your browser settings. Your privacy is of utmost
            importance to us, and we are dedicated to safeguarding your
            information.
          </Section>

          <Section heading="Payment Invoices?">
            Please note that our website is a demonstration platform, and as
            such, we do not generate actual payment invoices or process payments
            at the time of ordering or after an order is placed. The ordering
            process and product invoices are for illustrative purposes only,
            allowing you to explore our website&apos;s functionality. Rest
            assured that no actual financial transactions or product deliveries
            occur through this demo website.
          </Section>

          <Section heading="Does ShopSwift Share Your Personal Information??">
            We want to emphasize that we do not share your personal information
            with third parties. Your privacy is of utmost importance to us, and
            we are committed to safeguarding the confidentiality of any data you
            provide. Rest assured that any information you entrust to us remains
            strictly within our organization, and we respect your privacy at all
            times. If you have any concerns or questions about our data handling
            practices, please do not hesitate to contact us for further
            clarification. Your trust is paramount to us, and we are dedicated
            to maintaining the highest standards of privacy protection.
          </Section>
        </div>
      </div>

      <Footer />
    </>
  );
}

function Section({
  children,
  heading,
}: {
  children: React.ReactNode;
  heading: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-lg font-bold leading-snug  md:text-2xl ">
        {heading}
      </h1>
      <Paragraph>{children}</Paragraph>
    </div>
  );
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-medium leading-normal sm:text-sm md:text-base">
      {children}
    </p>
  );
}
