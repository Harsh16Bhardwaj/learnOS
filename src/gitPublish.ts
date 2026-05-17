import { AppConfig, Topic } from "./types.js";
import { formatDay, runGit } from "./utils.js";

export function commitAndPush(args: {
  config: AppConfig;
  day: number;
  topic: Topic;
}): { committed: boolean; pushed: boolean; message: string } {
  const status = runGit(["status", "--short"]);
  if (!status) {
    return {
      committed: false,
      pushed: false,
      message: "No git changes detected."
    };
  }

  const commitMessage = args.config.git.commitTemplate
    .replace("{{day}}", formatDay(args.day))
    .replace("{{topic}}", args.topic.title);

  runGit(["add", "."]);
  runGit(["commit", "-m", commitMessage]);

  try {
    runGit(["push", "origin", "HEAD"]);
    return {
      committed: true,
      pushed: true,
      message: "Commit and push succeeded."
    };
  } catch (error) {
    return {
      committed: true,
      pushed: false,
      message: error instanceof Error ? error.message : "Commit succeeded but push failed."
    };
  }
}

