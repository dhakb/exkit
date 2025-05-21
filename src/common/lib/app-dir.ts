import path from 'node:path';

export const getAppDir = () => {
  if (!global.appRoot) {
    return path.dirname(require?.main?.filename ?? __dirname);
  }

  return global.appRoot;
};

export const getRootDir = () => {
  return process.cwd();
};
