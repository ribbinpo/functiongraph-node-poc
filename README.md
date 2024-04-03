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
├── Makefile          # Makefile for building and compressing functions
└── README.md         # This file
```
## Getting Started
To deploy functions to Huawei CloudFunction using FunctionGraph, follow these steps:

Install dependencies:

```bash
npm install
```

Build and compress functions:

```bash
make build
```
Once the build process is complete, upload the generated zip files to FunctionGraph using the Huawei Cloud Console.
