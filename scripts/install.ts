import { parseArgs } from "@std/cli";
import { resolve, join } from "@std/path";

const parsedArgs = parseArgs(Deno.args, { boolean: "help", alias: { h: "help" } });
let [arg] = parsedArgs._;
if(typeof arg === "number") {arg = arg.toString()};

const homeDir = Deno.env.get("HOME");
if(!homeDir){
    console.log("no HOME enviroment varible");
    Deno.exit();
}
const installDir = join(homeDir, "bin");

console.log(installDir);

// console.log(parsedArgs);

const type = [ "fe", "file-editor", "uo", "url-opener" ];
if(!arg || !type.includes(arg) || parsedArgs.help){
    console.log("usage: ");
}

// const _buildResult = await new Deno.Command("deno", {args: ["task", "build" ]}).spawn();
// Deno.chmodSync("dist/main.js", 0o700);
// Deno.copyFileSync();

