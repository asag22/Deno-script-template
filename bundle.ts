import * as esbuild from "esbuild";

await esbuild.build({
    entryPoints: [ "src/main.ts" ],
    bundle: true,
    packages: "external",
    outfile: "dist/app.js",
    format: "esm",
    target: [ `deno${Deno.version.deno}` ],
    banner: { js: "#!/data/data/com.termux/files/usr/bin/env -S deno run -A --ext=js" },
});

console.log(" src/main.ts bundled");

await esbuild.stop();
