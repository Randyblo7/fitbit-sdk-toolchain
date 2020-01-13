const backSlashPattern = /[\\]/g;
const shouldNormalizeSlash = (val: string) => backSlashPattern.test(val);
export const normalizeSlash = (val: string) =>
  val.replace(backSlashPattern, '/');

const normalizedCwd = normalizeSlash(process.cwd());
export const cwdSerializer: jest.SnapshotSerializerPlugin = {
  test: (val) =>
    typeof val === 'string' && normalizeSlash(val).includes(normalizedCwd),
  print: (val, serialize) =>
    serialize(normalizeSlash(val).replace(normalizedCwd, '<cwd>')),
};

export const errorMessageSerializer: jest.SnapshotSerializerPlugin = {
  test: (val) => val instanceof Error && shouldNormalizeSlash(val.message),
  print: (val: Error, serialize) => {
    val.message = normalizeSlash(val.message);
    return serialize(val);
  },
};
