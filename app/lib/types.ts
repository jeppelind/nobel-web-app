export type NobelPrizesResponse = {
  nobelPrizes: NobelPrize[];
  links: {
    next: string;
  };
}
  
export type NobelPrize = {
  awardYear: string;
  category: {
    en: string;
    se: string;
  };
  laureates: NobelPrizeLaureate[];
}
  
export type NobelPrizeLaureate = {
  id: string;
  knownName: {
    en: string;
  };
  motivation: {
    en: string;
  };
}
