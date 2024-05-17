import { Members } from "../SwiperCard/SwiperCardMembers";
import CardComponent from "../Card/Card";

export function Home() {
  return (
    <section>
      <div className="container px-4 mx-auto max-w-8xl">
        <div className="flex flex-wrap justify-between pt-20 sm:pl-20 sm:-m-6">
          <div className="circlePosition w-[200px] h-[200px] left-[60%] top-[40%] absolute bg-[#d22fe0] rounded-[100%] z-1 blur-[100px] overflow-x-hidden"></div>
          <div className="z-10 w-full p-6 sm:-mt-10 lg:w-5/12 xl:w-1/2">
            <p className="inline px-3 py-1 mb-5 text-xs font-medium text-slate-700 border-2 rounded-lg font-heading sm:text-sm opacity-40 border-white/10">
              Group #2 Diseño 2
            </p>
            <h1 className="mt-4 mb-5 text-4xl font-medium text-black font-heading md:text-6xl xl:text-11xl">
              Take{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-indigo-600">
                {" "}
                control{" "}
              </span>
              of your data!
            </h1>
            <p className="max-w-lg text-slate-900 mb-9 sm:text-lg opacity-60">
              Easily and securely manage your personal data with our app.
            </p>
            <div className="flex flex-wrap mb-20 -m-3">
              <CardComponent />
            </div>
          </div>

          <div className="relative z-10 hidden w-full lg:w-7/12 xl:w-1/2 sm:block">
            <div className="pr-2 mx-auto -mt-16 max-w-max">
              <div className="flex items-center justify-around">
                <div className="mt-20 ml-10">
                  <Members />
                  <p className="inline px-3 py-1   mb-5 text-xs font-medium text-gray-800 border-2 rounded-lg font-heading sm:text-sm opacity-40 border-white/10">
                    Swipt to see more members
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
