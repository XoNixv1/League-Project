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

interface Stats {
  hp: number;
  hpperlevel: number;
  mp: number;
  mpperlevel: number;
  movespeed: number;
  armor: number;
  armorperlevel: number;
  spellblock: number;
  spellblockperlevel: number;
  attackrange: number;
  hpregen: number;
  hpregenperlevel: number;
  mpregen: number;
  mpregenperlevel: number;
  crit: number;
  critperlevel: number;
  attackdamage: number;
  attackdamageperlevel: number;
  attackspeedperlevel: number;
  attackspeed: number;
}

export enum Tags {
  MAGE = "Mage",
  ASSASIN = "Assassin",
  TANK = "Tank",
  SUPPORT = "Support",
  MARKSMAN = "Marksman",
  FIGHTER = "Fighter",
}

export interface Champion {
  version: string;
  id: string;
  key: string;
  name: string;
  title: string;
  blurb: string;
  info: Info;
  image: Image;
  tags: Tags[];
  partype: string;
  stats: Stats;
}

export interface ChampionState extends EntityState<Champion, string> {
  loading: boolean;
  error: string;
}
