#!/usr/bin/env node

import path from "node:path";
import { fileURLToPath } from "node:url";
import { execa } from "execa";
import fs from "fs-extra";
import { Command } from "commander";

const program = new Command();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cwd = process.cwd();
const postsSourceDir = path.resolve(cwd, "posts");
const publicSourceDir = path.resolve(cwd, "public");
const configSourcePath = path.resolve(cwd, "blog.config.ts");
const postsTargetDir = path.resolve(__dirname, "../src/posts");
const publicTargetDir = path.resolve(__dirname, "../public");
const configTargetPath = path.resolve(__dirname, "../src/config.ts");
const nextSrcDir = path.resolve(__dirname, "..");

const copyConfig = () => {
  if (!fs.existsSync(configSourcePath)) return;
  fs.copySync(configSourcePath, configTargetPath);
  console.log("👌 Config copied");
};

const watchConfig = () => {
  if (!fs.existsSync(configSourcePath)) return;
  copyConfig();
  fs.watch(configSourcePath, () => copyConfig());
};

const copyPosts = () => {
  if (!fs.existsSync(postsSourceDir)) return;
  fs.copySync(postsSourceDir, postsTargetDir);
  console.log("👌 Posts copied");
};

const watchPosts = () => {
  if (!fs.existsSync(postsSourceDir)) return;
  copyPosts();
  fs.watch(postsSourceDir, () => copyPosts());
};

const copyPublic = () => {
  if (!fs.existsSync(publicSourceDir)) return;
  fs.copySync(publicSourceDir, publicTargetDir);
  console.log("👌 Public assets copied");
};

const watchPublic = () => {
  if (!fs.existsSync(publicSourceDir)) return;
  copyPosts();
  fs.watch(publicSourceDir, () => copyPublic());
};

program
  .name("reshaped-blog")
  .description("CLI to start and build your blog website");

program
  .command("dev")
  .description("Start your website in development mode")
  .action(async () => {
    watchConfig();
    watchPosts();
    watchPublic();

    await execa("next", ["dev", nextSrcDir], {
      cwd: nextSrcDir,
      stdio: "inherit",
      preferLocal: true,
    });
  });

program
  .command("build")
  .description("Build your website")
  .action(async () => {
    copyConfig();
    copyPosts();
    copyPublic();

    await execa("next", ["build", nextSrcDir], {
      cwd: nextSrcDir,
      stdio: "inherit",
      preferLocal: true,
    });
  });

program
  .command("start")
  .description("Start your website in production mode based on the build")
  .action(async () => {
    copyConfig();
    copyPosts();
    copyPublic();

    await execa("next", ["start"], {
      cwd: nextSrcDir,
      stdio: "inherit",
      preferLocal: true,
    });
  });

program.parse();
