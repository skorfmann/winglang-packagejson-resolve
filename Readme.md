This file layout works on macOS (haven't tried root folder though, only project relative paths) but seems to fail on Linux.

Issue seems to be either the root `package.json` file or `node_modules` folder.

```
.
├── Dockerfile
├── Readme.md
├── foo.mjs
├── node_modules
│   ├── camel-case
...
├── package-lock.json
├── package.json
└── with-cdktf
    ├── node_modules
    │   ├── cdktf
    ...
    ├── main.w
    ├── package-lock.json
    └── package.json
```

here's the full output

```
docker build -t foo-wing . && docker run -it foo-wing
[+] Building 22.9s (9/9) FINISHED
 => [internal] load build definition from Dockerfile                                                                                                                                                                                                                                                                                                                 0.0s
 => => transferring dockerfile: 36B                                                                                                                                                                                                                                                                                                                                  0.0s
 => [internal] load .dockerignore                                                                                                                                                                                                                                                                                                                                    0.0s
 => => transferring context: 2B                                                                                                                                                                                                                                                                                                                                      0.0s
 => [internal] load metadata for docker.io/library/node:18-slim                                                                                                                                                                                                                                                                                                      0.0s
 => [internal] load build context                                                                                                                                                                                                                                                                                                                                    0.0s
 => => transferring context: 576B                                                                                                                                                                                                                                                                                                                                    0.0s
 => CACHED [1/4] FROM docker.io/library/node:18-slim                                                                                                                                                                                                                                                                                                                 0.0s
 => [2/4] COPY . .                                                                                                                                                                                                                                                                                                                                                   0.0s
 => [3/4] RUN npm install -g winglang@0.21.5                                                                                                                                                                                                                                                                                                                        19.8s
 => [4/4] RUN npm ci                                                                                                                                                                                                                                                                                                                                                 1.2s
 => exporting to image                                                                                                                                                                                                                                                                                                                                               1.8s
 => => exporting layers                                                                                                                                                                                                                                                                                                                                              1.8s
 => => writing image sha256:8885929d930a9000bdeb939b35a74e9b41b5aa792317e917bb83ad97dbdb23b7                                                                                                                                                                                                                                                                         0.0s
 => => naming to docker.io/library/foo-wing                                                                                                                                                                                                                                                                                                                          0.0s

Use 'docker scan' to run Snyk tests against images to find vulnerabilities and learn how to fix them

added 2 packages, and audited 57 packages in 935ms

7 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

Error: error: Cannot find module "cdktf" in source directory: Unable to load "cdktf": Module not found in ""
  --> main.w:2:1
  |
2 | bring "cdktf" as cdktf;
  | ^^^^^^^^^^^^^^^^^^^^^^^ Cannot find module "cdktf" in source directory: Unable to load "cdktf": Module not found in ""


error: Unknown symbol "cdktf"
  --> main.w:4:18
  |
4 | let output = new cdktf.TerraformOutput(
  |                  ^^^^^ Unknown symbol "cdktf"


    at compile (/usr/local/lib/node_modules/winglang/dist/commands/compile.js:87:19)
node:internal/errors:867
  const err = new Error(message);
              ^

Error: Command failed: wing compile --debug -t tf-aws main.w
Error: error: Cannot find module "cdktf" in source directory: Unable to load "cdktf": Module not found in ""
  --> main.w:2:1
  |
2 | bring "cdktf" as cdktf;
  | ^^^^^^^^^^^^^^^^^^^^^^^ Cannot find module "cdktf" in source directory: Unable to load "cdktf": Module not found in ""


error: Unknown symbol "cdktf"
  --> main.w:4:18
  |
4 | let output = new cdktf.TerraformOutput(
  |                  ^^^^^ Unknown symbol "cdktf"


    at compile (/usr/local/lib/node_modules/winglang/dist/commands/compile.js:87:19)

    at checkExecSyncError (node:child_process:885:11)
    at Module.execSync (node:child_process:957:15)
    at file:///foo.mjs:10:15
    at ModuleJob.run (node:internal/modules/esm/module_job:194:25) {
  status: 1,
  signal: null,
  output: [
    null,
    Buffer(0) [Uint8Array] [],
    Buffer(516) [Uint8Array] [
       69, 114, 114, 111, 114,  58,  32, 101, 114, 114, 111, 114,
       58,  32,  67,  97, 110, 110, 111, 116,  32, 102, 105, 110,
      100,  32, 109, 111, 100, 117, 108, 101,  32,  34,  99, 100,
      107, 116, 102,  34,  32, 105, 110,  32, 115, 111, 117, 114,
       99, 101,  32, 100, 105, 114, 101,  99, 116, 111, 114, 121,
       58,  32,  85, 110,  97,  98, 108, 101,  32, 116, 111,  32,
      108, 111,  97, 100,  32,  34,  99, 100, 107, 116, 102,  34,
       58,  32,  77, 111, 100, 117, 108, 101,  32, 110, 111, 116,
       32, 102, 111, 117,
      ... 416 more items
    ]
  ],
  pid: 30,
  stdout: Buffer(0) [Uint8Array] [],
  stderr: Buffer(516) [Uint8Array] [
     69, 114, 114, 111, 114,  58,  32, 101, 114, 114, 111, 114,
     58,  32,  67,  97, 110, 110, 111, 116,  32, 102, 105, 110,
    100,  32, 109, 111, 100, 117, 108, 101,  32,  34,  99, 100,
    107, 116, 102,  34,  32, 105, 110,  32, 115, 111, 117, 114,
     99, 101,  32, 100, 105, 114, 101,  99, 116, 111, 114, 121,
     58,  32,  85, 110,  97,  98, 108, 101,  32, 116, 111,  32,
    108, 111,  97, 100,  32,  34,  99, 100, 107, 116, 102,  34,
     58,  32,  77, 111, 100, 117, 108, 101,  32, 110, 111, 116,
     32, 102, 111, 117,
    ... 416 more items
  ]
}

Node.js v18.16.0
```