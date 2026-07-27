import { parseArgs } from "@std/cli";
import { join, resolve } from "@std/path";
import { existsSync } from "@std/fs";

const scriptPath = "dist/main.js";

const parsedArgs = parseArgs(Deno.args, {
  boolean: ["help"],
  alias: { h: "help" },
});

let [arg] = parsedArgs._;
if (typeof arg === "number") {
  arg = arg.toString();
}

const homeDir = Deno.env.get("HOME") || Deno.env.get("USERPROFILE"); // userprofile is here because it makes it easier to test on windows
if (!homeDir) {
  console.error("Error: HOME environment variable is not set.");
  Deno.exit(1);
}

const installDir = join(homeDir, "bin");
const validTypes = ["fe", "file-editor", "uo", "url-opener"];

if (!arg || !validTypes.includes(String(arg)) || parsedArgs.help) {
  console.log("Usage: deno run main.ts [fe|file-editor|uo|url-opener]");
  Deno.exit(parsedArgs.help ? 0 : 1);
}

let scriptName = "termux-file-editor";
if (["uo", "url-opener"].includes(String(arg))) {
  scriptName = "termux-url-opener";
}

const scriptDestination = resolve(installDir, scriptName);

const { success } = await new Deno.Command("deno", { args: ["task", "build"] }).output();

if (!success) {
  console.error("Build failed.");
  Deno.exit(1);
}

if(existsSync(scriptDestination, {isFile: true})){
  const oldScriptsDir = join(installDir, "old-scripts")
  
  Deno.mkdirSync(oldScriptsDir, { recursive: true });
  Deno.copyFileSync(scriptDestination, join(oldScriptsDir, `${scriptName}-${new Date().valueOf()}`));
}

Deno.mkdirSync(installDir, { recursive: true });
Deno.copyFileSync(scriptPath, scriptDestination);
Deno.chmodSync(scriptDestination, 0o700);

console.log(`Successfully installed to ${scriptDestination}`);