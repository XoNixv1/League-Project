import { EntityState } from "@reduxjs/toolkit";

interface Image {
  full: string;
  sprite: string;
  group: string;
  x: number;
  y: number;
  w?: number;
  h?: number;
}

interface Info {
  attack: number;
  defense: number;
  magic: number;
  difficulty: number;
}

export enum Tags {
  MAGE = "Mage",
  ASSASIN = "Assassin",
  TANK = "Tank",
  SUPPORT = "Support",
  MARKSMAN = "Marksman",
  FIGHTER = "Fighter",
}

export interface Skin {
  id: string;
  num: number;
  name: string;
}

export interface Spells {
  id: string;
  name: string;
  description: string;
  maxrank: number;
  cooldown: number[];
  cooldownBurn: string;
  cost: number[];
  costBurn: string;
  costType: string;
  maxammo: string;
  range: number[];
  rangeBurn: string;
  resource: string;
  tooltip: string;
}

interface Passive {
  name: string;
  description: string;
  image: Image;
}

export enum Sort {
  NoSort = "",
  AtoZ = " sortable__abc",
  ZtoA = " sortable__cba",
}

export interface Champion {
  id: string;
  key: string;
  name: string;
  title: string;
  info: Info;
  skins: Skin[];
  tags: Tags[];
  lore: string;
  stats: Record<string, number>;
  spells: Spells[];
  passive: Passive;
}

export interface ChampionState extends EntityState<Champion, string> {
  loading: boolean;
  error: string;
}
