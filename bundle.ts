import * as esbuild from "esbuild";

const entryPoint = Deno.args[0] || "src/main.ts";

await esbuild.build({
    entryPoints: [ entryPoint ],
    bundle: true,
    packages: "external",
    outdir: "dist",
    format: "esm",
    target: [ `deno${Deno.version.deno}` ],
    banner: { js: "#!/data/data/com.termux/files/usr/bin/env -S deno run -A --ext=js" },
});

console.log(`${entryPoint} bundled`);

await esbuild.stop();
