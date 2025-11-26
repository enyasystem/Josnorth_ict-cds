"use client";

import { useState } from "react";
import { PageLayout } from "@/components/page-layout";
import dynamic from "next/dynamic";
const FloatingNav = dynamic(() => import("@/components/floating-nav"), {
  ssr: false,
});
import { Button } from "@/components/ui/button";
import { useProfiles } from "@/lib/hooks/useProfiles";
import { Skeleton } from "@/components/ui/skeleton";
import ProfileCard from "@/components/profile-card";
import type { TeamMember } from "@/lib/types/api";
import { Reveal } from "@/components/reveal";
import { motion } from "framer-motion";

export default function TeamPage() {
  const { data: profilesData, isLoading: profilesLoading } = useProfiles();
  const profiles: TeamMember[] = profilesData?.data ?? [];
  const currentList = profiles;
  const currentLoading = profilesLoading;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <PageLayout showHeader={false}>
      <FloatingNav />
      <div className="pt-28 px-6 py-8 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <Reveal variant="fade-up">
            <div className="text-center mb-16">
              <h1 className="text-4xl lg:text-5xl font-bold text-green-800 mb-6 text-balance">
                Meet Our Team
              </h1>
              <p className="text-xl text-green-600 mb-8 max-w-3xl mx-auto text-pretty">
                The dedicated members powering the NYSC Jos North digital
                platform and community initiatives.
              </p>
            </div>
          </Reveal>

          <Reveal
            variant="fade-up"
            stagger={80}
            className="px-8 max-w-6xl mx-auto"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-24 pb-4"
            >
              {currentLoading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <div className="p-2" key={`skeleton-${i}`}>
                    <Skeleton className="h-44 rounded-lg" />
                  </div>
                ))
              ) : currentList.length > 0 ? (
                currentList.map((member) => (
                  <div className="p-2" key={member.id}>
                    <ProfileCard
                      name={member.name}
                      role={member.role}
                      img={
                        member.img ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          member.name
                        )}`
                      }
                      bio={member.bio}
                      socials={{
                        github: member.social?.github,
                        linkedin: member.social?.linkedin,
                        x: member.social?.twitter,
                      }}
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center">
                  <p className="text-gray-600">No profiles available.</p>
                </div>
              )}
            </motion.div>
          </Reveal>

          <div className="text-center bg-green-50 rounded-lg p-8 border border-green-100">
            <h3 className="text-2xl font-bold text-green-800 mb-4">
              Join Our Team
            </h3>
            <p className="text-green-600 mb-6 max-w-2xl mx-auto">
              We're always looking for talented individuals who are passionate
              about technology and making a positive impact in the community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-green-600 hover:bg-green-500 text-white px-8 py-3">
                View Open Positions
              </Button>
              <Button
                variant="outline"
                className="border-green-600 text-green-700 hover:bg-green-50 px-8 py-3 bg-transparent"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
