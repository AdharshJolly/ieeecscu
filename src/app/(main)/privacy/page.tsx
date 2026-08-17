import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for IEEE CS CHRIST University Student Branch Chapter.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 mt-24">
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8 text-center">
        Privacy Policy
      </h1>

      <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400">
        <p className="mb-6">
          <strong>
            Last Updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </strong>
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
            1. Introduction
          </h2>
          <p className="mb-4 leading-relaxed">
            Welcome to the official website of the IEEE Computer Society Student
            Branch Chapter of CHRIST (Deemed to be University), Bangalore ("we",
            "our", or "us"). We are committed to respecting your privacy and
            protecting your personal information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
            2. Information Collection
          </h2>
          <p className="mb-4 leading-relaxed">
            <strong>
              We do not collect, store, or process any personal information
            </strong>{" "}
            from visitors to this website. Our website serves purely as an
            informational platform to showcase our chapter's events, team, and
            activities.
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 leading-relaxed">
            <li>We do not require account registration.</li>
            <li>We do not use cookies for tracking personal data.</li>
            <li>
              We do not use any forms that ask for your personal details on this
              site.
            </li>
          </ul>
          <p className="leading-relaxed">
            Any registrations for our events are handled through external,
            third-party platforms (such as Google Forms or official university
            portals), which have their own privacy policies.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
            3. Third-Party Links
          </h2>
          <p className="mb-4 leading-relaxed">
            Our website may contain links to external sites (such as our social
            media pages or event registration forms) that are may not be
            operated by us. Please be aware that we have no control over the
            content and practices of these sites, and cannot accept
            responsibility or liability for their respective privacy policies.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
            4. Changes to This Policy
          </h2>
          <p className="mb-4 leading-relaxed">
            We may update our Privacy Policy from time to time. Any changes will
            be reflected on this page with an updated "Last Updated" date.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
            5. Contact Us
          </h2>
          <p className="leading-relaxed">
            If you have questions or comments about this policy, you may contact
            us through our official social media channels or mail us at{" "}
            <a
              href="mailto:ieee.cs@christuniversity.in"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              ieee.cs@christuniversity.in
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
