import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Container = () => {
  return (
    <div className="w-[1380px]  items-center p-[20px] flex-col m-auto justify-around flex">
      <div className="flex">
        <div className="flex p-[10px] w-[50%] h-[500px] justify-around flex-col bg-amber-200">
          <div className="flex flex-col gap-3">
            <Button className="w-[300px] h-[200xp]">add</Button>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat
              veritatis voluptatum ut laudantium ipsa commodi amet deleniti,
              veniam autem, aliquam exercitationem consequuntur! Vitae tempora
              assumenda fugit dolore perspiciatis quia laboriosam!
            </p>
          </div>
          <div>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Accusamus doloremque nesciunt cum blanditiis totam, repellat a,
              nam culpa voluptatum, nobis tenetur. Necessitatibus, culpa
              consectetur velit deserunt totam beatae fugiat neque.
            </p>
          </div>
        </div>
        <div className="flex  w-[50%] h-[500px] via-gray-500">
          <Image alt="" src={"/window.svg"} width={1000} height={1000} />
        </div>
      </div>
      <div>cc</div>
    </div>
  );
};

export default Container;
