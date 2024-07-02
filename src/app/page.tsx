import Navbar from "@/components/Header/page";
import AnimationWraper from "@/common/AnimationWraper";
import InpageNavigation from "@/components/InpageNavigation";
import LateStComponent from "@/app/(blogs)/latest/page";
import TrendingComponent from "@/app/(blogs)/trending/page";

export default function Home() {
  return (
    <AnimationWraper>
      <Navbar/>
      <section className="h-cover flex justify-center gap-10">
        <div className="w-full">

           <InpageNavigation routes={["home", "trending blogs"]} defaultHidden ={["trending blogs"]}>
              <>
                  <LateStComponent/>
              </>
              <>
                <TrendingComponent/>
              </>
           </InpageNavigation>

        </div>
      </section>
    </AnimationWraper>
  );
}
