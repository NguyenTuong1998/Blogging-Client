import Navbar from "@/components/Header/page";
import AnimationWraper from "@/common/AnimationWraper";
import InpageNavigation from "@/components/InpageNavigation";
import LateStComponent from "@/app/blogs/latest/page";
import TrendingComponent from "@/app/blogs/trending/page";
import StoriesTagAll from "@/components/StoriesTagAll";
import AppClient from "@/app/AppClient";

export default function Home() {

  return (
      <AnimationWraper>
        <Navbar/>
        <AppClient>
        <section className="h-cover flex justify-center gap-10">
          <div className="w-full">

            <InpageNavigation routes= {[]} defaultHidden ={["trending blogs"]}>
                <>
                    <LateStComponent/>
                </>
                <>
                    <TrendingComponent/>
                </>
            </InpageNavigation>

          </div>
          <div className="min-w-[40%] lg:min-w-[400px] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden">

            <div className="flex flex-col gap-10">

                <div>
                  <h1 className="font-medium text-xl mb-8">Stories form all interests</h1>

                  <StoriesTagAll/>

                </div>

                <div>
                  <h1 className="font-medium text-xl mb-8">Trending <i className="fi fi-rr-arrow-trend-up"></i></h1>
                  
                  <TrendingComponent/>

                </div>
                
            </div>
            
          </div>
        </section>
        </AppClient>
      </AnimationWraper>
  );
}
