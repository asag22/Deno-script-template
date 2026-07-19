import * as esbuild from "esbuild";

await esbuild.build({
    entryPoints: [ "main.ts" ],
    outdir: "bundle",
    bundle: true,
    banner: { js: "#!/data/data/com.termux/files/usr/bin/env -S deno run -A --ext=js" },
})