# Description of System

## Entities

1. ARTCC / Geo / Airways / SID / STAR
2. VOR / NDB / FIX / Airport
3. Runway
4. Plane

## Components

1. CoordinatesComponent
2. AppearenceComponent
3. NameComponent
4. CodeComponent
5. FrequencyComponent
6. ColorComponent

## Systems

1. RenderSystem

## Entries with components

1. VOR
  * CodeComponent
  * NameComponent
  * FrequencyComponent
  * AppearenceComponent
  * CoordinatesComponent
2. NDB
  * CodeComponent
  * NameComponent
  * FrequencyComponent
  * AppearenceComponent
  * CoordinatesComponent
3. ARTCC / ARTCC LOW / ARTCC HIGH
  * NameComponent
  * CoordinatesComponent
  * AppearenceComponent
4. GEO
  * NameComponent
  * CoordinatesComponent
  * AppearenceComponent
  * ColorComponent
