import Badge from "../Components/Home/Badge";
import Hero from "../Components/Home/Hero";
import HowItWorks from "../Components/Home/HowItWorks";
import Review from "../Components/Home/Review";
import Hungry from "../Components/Home/hungry";
import MapSection from "../Components/Home/map";
import Taste from "../Components/Home/taste";

export default function Home() {
  return (
    <div className="space-y-0">
      <section className="container mx-auto px-4 pt-20 pb-10">
        <Hero />
      </section>
      <section className="bg-[#F1F5F9] py-10">
        <Badge />
      </section>
      <section className="py-28">
        <HowItWorks />
      </section>
      <section className="py-10">
        <Review />
      </section>
      <section className="py-10">
        <MapSection />
      </section>
      <section className="py-10">
        <Taste />
      </section>
      <section className="py-10">
        <Hungry />
      </section>
    </div>
  );
}