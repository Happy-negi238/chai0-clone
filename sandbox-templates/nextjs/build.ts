import { Template, defaultBuildLogger } from "e2b";
import { template as nextJSTemplate } from "./templates";
import dotenv from "dotenv";
dotenv.config();

Template.build(nextJSTemplate, "c0-build", {
  cpuCount: 4,
  memoryMB: 4096,
  onBuildLogs: defaultBuildLogger(),
  apiKey: "e2b_d2a53b8624f8e32a0a2bd36205a82475d6d644f3",
});
