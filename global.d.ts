declare global {
  const chance: Chance.Chance;
  
  namespace NodeJS {
    interface Global {
      chance: typeof chance;
    }
  }
}

export {};