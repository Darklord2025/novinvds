// A small uncompressed ZIP writer for generated text artwork; no runtime package needed.
const crcTable = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let i = 0; i < 8; i++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
const crc32 = (bytes: Uint8Array) => {
  let c = 0xffffffff;
  for (const b of bytes) c = crcTable[(c ^ b) & 255] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};
export function zipFiles(files: { name: string; text: string }[]) {
  const encoder = new TextEncoder(),
    parts: Uint8Array[] = [],
    central: Uint8Array[] = [];
  let offset = 0,
    centralSize = 0;
  const header = (size: number) => {
    const bytes = new Uint8Array(size);
    return { bytes, view: new DataView(bytes.buffer) };
  };
  for (const file of files) {
    const name = encoder.encode(file.name),
      data = encoder.encode(file.text),
      crc = crc32(data);
    const local = header(30);
    local.view.setUint32(0, 0x04034b50, true);
    local.view.setUint16(4, 20, true);
    local.view.setUint16(6, 0x800, true);
    local.view.setUint16(12, 33, true);
    local.view.setUint32(14, crc, true);
    local.view.setUint32(18, data.length, true);
    local.view.setUint32(22, data.length, true);
    local.view.setUint16(26, name.length, true);
    parts.push(local.bytes, name, data);
    const directory = header(46);
    directory.view.setUint32(0, 0x02014b50, true);
    directory.view.setUint16(4, 20, true);
    directory.view.setUint16(6, 20, true);
    directory.view.setUint16(8, 0x800, true);
    directory.view.setUint16(14, 33, true);
    directory.view.setUint32(16, crc, true);
    directory.view.setUint32(20, data.length, true);
    directory.view.setUint32(24, data.length, true);
    directory.view.setUint16(28, name.length, true);
    directory.view.setUint32(42, offset, true);
    central.push(directory.bytes, name);
    centralSize += 46 + name.length;
    offset += 30 + name.length + data.length;
  }
  const end = header(22);
  end.view.setUint32(0, 0x06054b50, true);
  end.view.setUint16(8, files.length, true);
  end.view.setUint16(10, files.length, true);
  end.view.setUint32(12, centralSize, true);
  end.view.setUint32(16, offset, true);
  const result = new Uint8Array(offset + centralSize + 22);
  let at = 0;
  for (const part of [...parts, ...central, end.bytes]) {
    result.set(part, at);
    at += part.length;
  }
  return result;
}
