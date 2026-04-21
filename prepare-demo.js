
var fs = require("fs");
const fse = require("fs-extra");
const child_process = require("child_process");

if (fs.existsSync("./demo/static")) {
  fs.rmdirSync("./demo/static", { recursive: true });
}

fse.copySync("./dist/extensions", "./demo/static/extensions");
fse.copySync("./dist/node_modules", "./demo/static/node_modules");
fse.copySync("./dist/out", "./demo/static/out");

child_process.execSync('cd wasm-risc-v && npx webpack --mode production', {stdio: 'inherit'});

child_process.execSync('gzip -9 -c wasm-risc-v/linux/rootfs.img > wasm-risc-v/linux/rootfs.img.gz', {stdio: 'inherit'});
child_process.execSync('gzip -9 -c wasm-risc-v/linux/opensbi/fw_payload.elf > wasm-risc-v/linux/opensbi/fw_payload.elf.gz', {stdio: 'inherit'});


fse.copySync("./wasm-risc-v/dist", "./demo/static/extensions/wasm-risc-v");
fse.copySync("./wasm-risc-v/pako", "./demo/static/extensions/wasm-risc-v/pako");
fse.copySync("./wasm-risc-v/App.js", "./demo/static/extensions/wasm-risc-v/App.js");
fse.copySync("./wasm-risc-v/index.html", "./demo/static/extensions/wasm-risc-v/index.html");
fse.copySync("./wasm-risc-v/riscv_emu_rust_wasm.js", "./demo/static/extensions/wasm-risc-v/riscv_emu_rust_wasm.js");
fse.copySync("./wasm-risc-v/riscv_emu_rust_wasm_bg.wasm", "./demo/static/extensions/wasm-risc-v/riscv_emu_rust_wasm_bg.wasm");
fse.copySync("./wasm-risc-v/package.json", "./demo/static/extensions/wasm-risc-v/package.json");
fse.copySync("./wasm-risc-v/package.nls.json", "./demo/static/extensions/wasm-risc-v/package.nls.json");
fse.copySync("./wasm-risc-v/xtermjs", "./demo/static/extensions/wasm-risc-v/xtermjs");
fse.ensureDirSync("./demo/static/extensions/wasm-risc-v/linux/opensbi");
fse.copyFileSync("./wasm-risc-v/linux/opensbi/fw_payload.elf.gz", "./demo/static/extensions/wasm-risc-v/linux/opensbi/fw_payload.elf.gz");
fse.copyFileSync("./wasm-risc-v/linux/rootfs.img.gz", "./demo/static/extensions/wasm-risc-v/linux/rootfs.img.gz");

const webPlaygroundPath = './demo/static/extensions/vscode-web-playground';

child_process.execSync(`git clone https://github.com/microsoft/vscode-web-playground.git  ${webPlaygroundPath}`, {stdio: 'inherit'});


fse.copyFileSync("./custom-images/code-512.png", "./demo/code-512.png");
fse.copyFileSync("./custom-images/code-192.png", "./demo/code-192.png");
fse.copyFileSync("./custom-images/favicon.ico", "./demo/favicon.ico");

