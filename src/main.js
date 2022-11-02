#!/usr/bin/env node

"use strict";

import chalk from "chalk";
import fs from "fs";
import path from "path";
import fsExtra from "fs-extra";
import { createSpinner } from "nanospinner";
import inquirer from "inquirer";

//  ---------------------------------------------------------------
//  NAME
//  ----------------------------------------------------------------
//  main.js
//  ----------------------------------------------------------------
//  Copyright © 2022 lasse vestergaard <hello@lasse.hypll.org>
//  Permission is hereby granted, free of charge, to any person obtaining a copy

// Function runProgram
//
// Runs the program specified by the command line arguments.
//
function runProgram() {
  // Gets all the template folders
  const templateFolders = fs.readdirSync("src/templates");

  const questions = [
    {
      type: "input",
      name: "dir",
      message: "🗂 What directory do you want to have your project?",
      default: "my-website",
    },

    {
      type: "list",
      name: "template",
      message: "💅 Which template do you want to use?",
      choices: templateFolders,
    },

    {
      type: "confirm",
      name: "guide",
      message: "👉🏻 Would you like to get a guide for starting your project?",
      default: true,
    },
  ];

  // Promt the questions
  inquirer.prompt(questions).then((a) => {
    // Checks if the specified directory already exits
    if (fs.existsSync(a.dir)) {
      console.log(chalk.red(`Directory ${a.dir} already exists.`));
      process.exit(1);
    }

    // Creates the directory
    fsExtra.mkdirpSync(a.dir);

    // Copy the directory + files

    try {
      fsExtra.copySync(
        fsExtra.copySync(`./src/templates/${a.template}`, path.join(`${a.dir}`))
      );
    } catch (error) {
      return;
    }
  });
}

// Starting the loading process
const LOADING_SPINNER = createSpinner("Loading Program...").start();

setTimeout(() => {
  LOADING_SPINNER.update({
    text: "Finishing up...",
  });
}, 1000);

setTimeout(() => {
  LOADING_SPINNER.success();

  runProgram();
}, 2000);
