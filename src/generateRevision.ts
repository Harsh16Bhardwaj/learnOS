import { RevisionTarget, Topic } from "./types.js";
import { toRevisionLevel } from "./referenceMemory.js";

export function computeRevisionTargets(
  day: number,
  completedDays: number[],
  topics: Topic[],
  readTimesRevised: (topic: Topic) => number
): RevisionTarget[] {
  const candidates: Array<{ offset: number; reason: string }> = [
    { offset: 1, reason: "Previous day reinforcement" },
    { offset: 3, reason: "Three-day spaced recall" }
  ];

  if (day % 5 === 0) {
    candidates.push({ offset: 5, reason: "Five-day spaced recall" });
  }

  if (day % 12 === 0) {
    candidates.push({ offset: 12, reason: "Twelve-day spaced recall" });
  }

  if (day % 25 === 0) {
    candidates.push({ offset: 25, reason: "Twenty-five-day spaced recall" });
  }

  const uniqueDays = new Set<number>();
  const targets: RevisionTarget[] = [];

  for (const candidate of candidates) {
    const revisionDay = day - candidate.offset;
    if (revisionDay <= 0 || uniqueDays.has(revisionDay) || !completedDays.includes(revisionDay)) {
      continue;
    }
    const topic = topics.find((entry) => entry.day === revisionDay);
    if (!topic) {
      continue;
    }
    uniqueDays.add(revisionDay);
    const timesRevised = readTimesRevised(topic);
    targets.push({
      day: revisionDay,
      title: topic.title,
      reason: candidate.reason,
      timesRevised,
      revisionLevel: toRevisionLevel(timesRevised)
    });
  }

  return targets.sort((left, right) => right.day - left.day);
}
