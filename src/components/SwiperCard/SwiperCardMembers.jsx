import { ProfileCard } from "./ProfileCard";
import { users } from "../../assets/user.json";

import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

import "/src/style.css";

// import required modules
import { EffectCards } from "swiper/modules";

export function Members() {
  return (
    <div>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
        {users.map(({ id, userName, name, description }) => (
          <SwiperSlide>
            <ProfileCard
              key={id}
              name={name}
              userName={userName}
              description={description}
              className="flex-shrink-0 mx-4 my-4 w-full h-full"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
