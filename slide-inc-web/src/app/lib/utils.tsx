export function displayGender(gender: boolean) : string {
    if (gender) return "Male";
    else return "Female";
}

export function calculateHealthScore(lung: number, heart: number, stroke: number): number {
    // Calculate health score directly from numbers
    return 100 - ((lung + heart + stroke) / 3);
  }
  