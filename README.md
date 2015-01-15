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
