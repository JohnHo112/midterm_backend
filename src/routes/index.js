import express from "express";
import glob from "glob";

const rootRouter = express.Router();

function changestring (arrs){
  const convertedPaths = arrs.map(arr => arr.replace(/\\/g, '/'));
  return convertedPaths;
}


async function autoloadRoutes() {
  const jsfileso = await glob("**/index.js", {
    cwd: "src/routes",
    ignore: "index.js",
  });
  const jsfiles = await changestring(jsfileso)
  console.log(jsfiles)
  const importTasks = jsfiles.map(async (path) => {
    const module = await import(`./${path}`);
    if (module.default === undefined) return;
    //console.log(`/${path.slice(0, -9)}`);
    rootRouter.use(`/${path.slice(0, -9)}`, module.default);
  });
  return Promise.all(importTasks);
}
await autoloadRoutes();

export default rootRouter;
