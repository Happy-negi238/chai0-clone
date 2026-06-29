import { Template, waitForURL } from "e2b";

export const template = Template()
  .fromNodeImage("22")
  .setWorkdir("/home/user/nextjs-app")
  .runCmd("npx create-next-app@latest . --app --ts --tailwind --yes")
  .runCmd("npx shadcn@latest init -d -y")
  .runCmd("npx shadcn@latest add -a -y")
  .runCmd(
    "mv /home/user/nextjs-app/* /home/user/ && rm -rf /home/user/nextjs-app",
  )
  .setWorkdir("/home/user")
  .setStartCmd(
    "npm run dev -- --turbopack",
    waitForURL("http://localhost:3000"),
  );
