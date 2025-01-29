import { Daily } from '../models/daily.js';
import { Problem } from '../models/problem.js'; // Assuming Problems is the collection name

// Fetch 3 random problems for the day
const getDailyProblems = async () => {
  const today = new Date(new Date().toISOString().split('T')[0]);
  // console.log(today);

  let daily = await Daily.findOne({ date: today });

  if (!daily) {
    // Fetch 3 random problems from the Problems collection
    const randomProblems = await Problem.aggregate([
      { $sample: { size: 3 } }
    ]);

    // Determine the day of the week (0 = Sunday, 6 = Saturday)
    const dayOfWeek = today.getDay();

    // Fetch 5 MCQs for the current day of the week
    const mcqsForDay = await Daily.aggregate([
      { $unwind: "$mcqs" },
      { $match: { "mcqs.day": dayOfWeek } },
      { $sample: { size: 1 } }
    ]);

    // Create a new daily entry
    daily = await Daily.create({
      date: today,
      problems: randomProblems,
      mcqs: mcqsForDay.map((mcq) => mcq.mcqs) // Extract only the MCQ objects
    });
  }

  return daily;
};

// Get the MCQs and problems for the day
async function getDailymcqs(req, res) {
  try {
    const daily = await getDailyProblems();
    if (!daily) {
      return res.status(404).send('Daily data not found');
    }
    res.send({ problems: daily.problems, mcqs: daily.mcqs });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
}

export { getDailymcqs };
