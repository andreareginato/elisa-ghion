import type { Route } from "./+types/home";
import { Navigation } from "~/components/navigation";
import { HeroSection } from "~/components/hero/hero-section";
import { AboutSection } from "~/components/about-section";
import { GallerySection } from "~/components/gallery-section";
import { VideoSection } from "~/components/video-section";
import { WorkshopsSection } from "~/components/workshops/workshops-section";
import { CollaborationsSection } from "~/components/collaborations-section";
import { NewsletterSection } from "~/components/newsletter-section";
import { Footer } from "~/components/footer";
import { getUpcoming } from "~/lib/workshop-utils";
import {
  getAllWorkshopsWithTestimonials,
  getAllGalleryItems,
  getAllVideos,
  getAllCollaborations,
  getAboutSettings,
} from "~/db/queries.server";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "Elisa Ghion — Contact Improvisation" },
    {
      name: "description",
      content:
        "Elisa Ghion is a contact improvisation teacher and performer. Explore workshops, intensives, and the art of movement dialogue.",
    },
    { property: "og:title", content: "Elisa Ghion — Contact Improvisation" },
    {
      property: "og:description",
      content:
        "Explore workshops, intensives, and the art of movement dialogue with Elisa Ghion.",
    },
    { property: "og:type", content: "website" },
  ];
}

export function loader() {
  return {
    upcomingWorkshops: getUpcoming(getAllWorkshopsWithTestimonials()),
    galleryItems: getAllGalleryItems(),
    videos: getAllVideos(),
    collaborations: getAllCollaborations(),
    aboutSettings: getAboutSettings(),
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <Navigation />
      <HeroSection />
      <AboutSection aboutSettings={loaderData.aboutSettings} />
      <GallerySection items={loaderData.galleryItems} />
      <VideoSection videos={loaderData.videos} />
      <WorkshopsSection workshops={loaderData.upcomingWorkshops} />
      <CollaborationsSection collaborations={loaderData.collaborations} />
      <NewsletterSection />
      <Footer />
    </>
  );
}
