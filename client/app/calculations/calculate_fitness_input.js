export default (clientInfo) => {
    
/* male BMR multiples:  height * 12.7 + weight * 6.23 - age * 6.8 + 66
female BMR multiples:  height * 4.7 + weight * 4.35 - age * 4.7 + 655
calories needed - sedentary: BMR * 1.2 moderate: BMR * 1.55 heavy: BMR * 1.9 */

const fitnessData = {};
// const age = clientInfo.answers[0].input.answer;
// const currentWeight = clientInfo.answers[1].input.answer;
// const height = clientInfo.answers[2].input.answer;
const gender = clientInfo.answers[4].input.answer;
const active = clientInfo.answers[5].input.answer;
const targetWeight = clientInfo.answers[3].input.answer;

// const maleBMR = (height * 12.7) + (currentWeight * 6.23) - (age * 6.8) + 66;
// const femaleBMR = (height * 4.7) + (currentWeight * 4.35) - (age * 4.7) + 655;
// const lightMale = (height * 12.7) + (currentWeight * 6.23) - (age * 6.8) + 66 * 1.2;
// const moderateMale = (height * 12.7) + (currentWeight * 6.23) - (age * 6.8) + 66 * 1.55;
// const heavyMale = (height * 12.7) + (currentWeight * 6.23) - (age * 6.8) + 66 * 1.9;
// const lightFemale = (height * 4.7) + (currentWeight * 4.35) - (age * 4.7) + 655 * 1.2;
// const moderateFemale = (height * 4.7) + (currentWeight * 4.35) - (age * 4.7) + 655 * 1.55;
// const heavyFemale = (height * 4.7) + (currentWeight * 4.35) - (age * 4.7) + 655 * 1.9;

fitnessData.dailyCalories =  targetWeight * 18;
fitnessData.dailyProtein = targetWeight;
fitnessData.dailyCarbs = targetWeight * 3;
fitnessData.dailyFats = targetWeight / 10;

if (gender == 'man' && active.match('sedentary') !== null) {
    fitnessData.programs = ["http://www.bodybuilding.com/fun/timothyf.htm", "http://www.muscleandfitness.com/workouts/workout-routines/torch-your-fat-workout-routine", "http://healthyliving.azcentral.com/work-out-five-days-per-week-weights-2692.html"]
  }
  else if(gender == 'man' && active.match('moderate') !== null){
    fitnessData.programs = ["http://www.bodybuilding.com/fun/timothyf.htm", "http://bodybuildingindex.com/3-day-split-workout-for-gaining-muscle-mass/", "http://www.muscleandfitness.com/workouts/workout-routines/torch-your-fat-workout-routine"];
  }
  else if(gender == 'man' && active == active.match('heavy') !== null){
    fitnessData.programs = ["http://www.bodybuilding.com/fun/lee-labrada-12-week-lean-body-trainer.html", "http://www.bodybuilding.com/fun/jake-wilson-project-mass-trainer.html","http://healthyliving.azcentral.com/work-out-five-days-per-week-weights-2692.html"];
  }
  else if(gender == 'female' && active.match('sedentary') !== null){
    fitnessData.programs = ["http://www.bodybuilding.com/content/ultimate-beginners-machine-workout-for-women.html","http://www.bodybuilding.com/content/awesome-abdominal-workouts-for-women.html","http://healthyliving.azcentral.com/work-out-five-days-per-week-weights-2692.html"];
  }
  else if(gender == 'female' && active.match('moderate') !== null){
    fitnessData.programs = ["http://www.bodybuilding.com/fun/3day.htm","http://www.bodybuilding.com/fun/erin-stern-elite-body-4-week-fitness-trainer.html", "http://healthyliving.azcentral.com/work-out-five-days-per-week-weights-2692.html"];
  }
  else if(gender == 'female' && active == active.match('heavy') !== null){
    fitnessData.programs = ["http://www.bodybuilding.com/fun/erin-stern-elite-body-4-week-fitness-trainer.html","http://www.bodybuilding.com/fun/built-by-science-six-week-muscle-building-trainer.html","http://healthyliving.azcentral.com/work-out-five-days-per-week-weights-2692.html"];
  }

  return fitnessData;
};