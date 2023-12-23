export function displayGender(gender: boolean) : string {
    if (gender) return "Male";
    else return "Female";
}

export function calculateHealthScore(lung: string, heart: string, stroke: string): number {
      // Remove the '%' sign from the string
  const numericLung = lung.replace('%', '');
  const numericHeart = heart.replace('%', '');
  const numericStroke = stroke.replace('%', '');

  // Parse the numeric string to a float
  const lungPercent = parseFloat(numericLung);
  const heartPercent = parseFloat(numericHeart);
  const strokePercent = parseFloat(numericStroke);

  let healthScore = 100 - ((lungPercent + heartPercent + strokePercent) / 3)
  return healthScore
}