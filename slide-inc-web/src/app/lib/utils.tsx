export function displayGender(gender: boolean) : string {
    if (gender) return "Male";
    else return "Female";
}

export function calculateHealthScore(lung: number, heart: number, stroke: number): number {
    // Exclude NaN or undefined inputs from the calculation
    const validInputs = [lung, heart, stroke].filter(value => !isNaN(value) && value !== undefined);

    // If there are no valid inputs, return the default value
    if (validInputs.length === 0) {
        return 65;
    }

    // Calculate health score from valid inputs
    const average = validInputs.reduce((sum, value) => sum + value, 0) / validInputs.length;
    const score = 100 - average;

    // If the result is NaN, null, or 0, return the default value
    return isNaN(score) || score === null || score === 0 ? 65 : score;
}
