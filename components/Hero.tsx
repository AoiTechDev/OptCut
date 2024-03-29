import React from 'react'
import { Input } from './ui/input'

const Hero = ({bladeSize, handleBladeSizeChange}: {
    bladeSize: string;
    handleBladeSizeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="w-full min-h-[20vh]">
    <div className="flex w-full flex-col justify-center items-center">
      <h1 className="text-6xl font-bold text-center my-16">
        <span className=" bg-gradient-to-r from-indigo-500 to-purple-500 inline-block text-transparent bg-clip-text">
          OptCut
        </span>
      </h1>
      <p className="max-w-prose text-center ">
        Cutting stock problem solver. An algorithm was created using a
        greedy approach, efficiently accounting for waste and optimizing the
        use of patterns.
      </p>
    </div>
    <div className="flex max-w-3xl w-full mx-auto my-32 justify-center items-center gap-4">
      <div className="flex flex-col">
        <div>Set size of your blade:</div>
        <div className="opacity-70">(by default is 0)</div>
      </div>
      <Input className="w-20"  value={bladeSize || 0} onChange={(e) => handleBladeSizeChange(e)}/>
    </div>
  </div>
  )
}

export default Hero