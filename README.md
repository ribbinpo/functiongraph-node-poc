# Huawei CloudFunction POC with FunctionGraph
This repository contains a Proof of Concept (POC) for implementing cloud functions in Huawei Cloud using the FunctionGraph feature.
The project is structured with Node.js, Express.js, and TypeScript. Each function is developed separately within the `functions/` directory,
while shared code, configurations, and adapters reside in the `shares/` directory. Additionally, a Makefile is provided to facilitate building cloud function, followed by compressing them into a zip file for upload to FunctionGraph.

## Project Structure
```bash
.
├── functions/        # Directory for individual cloud functions
│   ├── function1/    # Function 1
│   ├── function2/    # Function 2
│   └── ...           # Other functions
├── shares/           # Shared code, config, adapter
├── index.ts          # Run every module to the monolith
├── Makefile          # Makefile for building and compressing functions
└── README.md         # This file
```
## Getting Started
To deploy functions to Huawei CloudFunction using FunctionGraph, follow these steps:

Install dependencies:

```sh
npm install
```

Init new module

```sh
make init [function_name]
```
Create a new module to `functions/` using `templates/` module to a template. (so you can modify your template in this module)

Build and compress functions:

```sh
make build [function_name]
```
Once the build process is complete, upload the generated zip files to FunctionGraph using the Huawei Cloud Console.

```sh
make build-all
```
It similar with `make build` but this command will build every module in `functions/` and zip to `out/` folder.