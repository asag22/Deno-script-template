import * as esbuild from "esbuild";

await esbuild.build({
    entryPoints: [ "main.ts" ],
    bundle: true,
    minify: true,
    packages: "external",
    outdir: "bundle",
    format: "esm",
    target: [ `deno${Deno.version.deno}` ],
    banner: { js: "#!/data/data/com.termux/files/usr/bin/env -S deno run -A --ext=js" },
})

await esbuild.stop();