interface ReportValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArray = (args: Array<string>): Array<number> => {
  if (args.length < 4)
    throw new Error("Please provide both a target and some amount of days");
  if (isNaN(Number(args[2]))) {
    throw new Error(
      "Target must be a number. Use the format: npm run calculateExercises <target> <day 1> <day 2> ... <day n>."
    );
  }
  const userData = args.filter((arg, i) => i > 1);
  return userData.map((arg) => {
    if (isNaN(Number(arg))) {
      throw new Error("Exercise amount must be a number");
    }
    return Number(arg);
  });
};

const calculateExercise = (exercise: Array<number>): ReportValues => {
  const periodLength = exercise.length - 1;
  const trainingDays = exercise.reduce((a, c) => (c > 0 ? a + 1 : a), 0) - 1;
  const trainingHoursTotal = exercise.reduce((a, c) => a + c, 0) - exercise[0];
  const average = trainingHoursTotal / periodLength;
  const target = exercise[0];
  const success = average >= target;
  let rating: number;
  let ratingDescription: string;
  let successRate = average / target;

  if (successRate < 0.8) {
    rating = 1;
    ratingDescription = "You didn't reach the target. Better luck next week.";
  } else if (successRate < 1) {
    rating = 2;
    ratingDescription = "Not too bad. Could be better!";
  } else {
    rating = 3;
    ratingDescription = "You did it!";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const data = parseArray(process.argv);
  console.log(data);
  console.log(calculateExercise(data));
} catch (error) {
  console.log("Something went wrong: ", error.message);
}
