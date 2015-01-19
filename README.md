# Description of System

## Entities

1. ARTCC / Geo / Airways / SID / STAR
2. VOR / NDB / FIX / Airport
3. Runway
4. Plane

## Components

1. CoordinatesComponent
2. AppearenceComponent
3. LabelComponent (Name)
4. CodeComponent
5. FrequencyComponent
6. ColorComponent

## Systems

1. RenderSystem

## Entries with components

1. VOR
  * CodeComponent
  * LabelComponent
  * FrequencyComponent
  * AppearenceComponent
  * CoordinatesComponent
2. NDB
  * CodeComponent
  * LabelComponent
  * FrequencyComponent
  * AppearenceComponent
  * CoordinatesComponent
3. ARTCC / ARTCC LOW / ARTCC HIGH
  * LabelComponent
  * CoordinatesComponent
  * AppearenceComponent
4. GEO
  * LabelComponent
  * CoordinatesComponent
  * AppearenceComponent
  * ColorComponent


## Idea

If I'm going to be working directly with SVG than handling and rendering is 
better to be handled by architecture like React. As the state of elements is 
constant and should not be re-rendered unless it's required.
NOTE: I need to look for something like React to render SVG.

If I'am going to use canvas than using ECS architecture makes total sense, 
because sector has to be rendered every frame and makes it very convinient 
and fast to develop.
NOTE: I need to look how hard is it to handle clicks for canvas.
