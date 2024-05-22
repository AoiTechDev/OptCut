# OptCut

Simple tool for the cutting stock problem. Implemented using a greedy approach for efficiently accounting for waste and optimizing the use of patterns.

## How to use

Basically, you input the quantity and length of your source items, followed by specifying the desired lengths of the demand items. Additionally, you can input the blade thickness for greater precision. Afterward, you click 'CUT', and the algorithm will generate optimal cutting patterns and quantities to minimize waste.


### Input your desired lengths and quantities in the control panel.

![image](https://github.com/AoiTechDev/OptCut/assets/88384089/65512d0b-5ec4-499a-8366-e62e859fa2b6)


### The output you receive and the desired patterns.

![image](https://github.com/AoiTechDev/OptCut/assets/88384089/0c3d811d-ff4f-45a9-8ed3-7fb55d41806f)


As mentioned earlier, I implemented a greedy approach to address this issue. Consequently, the results may not be entirely optimal, as my algorithm prioritizes the selection of the best local pattern that meets the given requirements.

## Tech Stack

- `Next.js`
- `Tailwind CSS`
- `Typescript`
