// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
export class BytesBuffer {
  private buf: Buffer;
  private off: number = 0; // read offset; Bytes()/Len() reflect buf.subarray(off)
  constructor(init?: Buffer | Uint8Array | string) {
    this.buf =
      init === undefined ? Buffer.alloc(0)
      : typeof init === "string" ? Buffer.from(init, "utf8")
      : Buffer.from(init);
  }
  Bytes(): Buffer { return this.buf.subarray(this.off); }
  String(): string { return this.buf.subarray(this.off).toString("utf8"); }
  Len(): number { return this.buf.length - this.off; }
  Reset(): void { this.buf = Buffer.alloc(0); this.off = 0; }
  WriteByte(b: number): void { this.buf = Buffer.concat([this.buf, Buffer.from([b & 0xff])]); }
  Write(p: Buffer | Uint8Array): number { const b = Buffer.from(p); this.buf = Buffer.concat([this.buf, b]); return b.length; }
  WriteString(s: string): number { const b = Buffer.from(s, "utf8"); this.buf = Buffer.concat([this.buf, b]); return b.length; }
  ReadByte(): number { if (this.off >= this.buf.length) { throw new Error("EOF"); } return this.buf[this.off++]; }
  Read(p: Buffer): number {
    const n = Math.min(p.length, this.buf.length - this.off);
    this.buf.copy(p, 0, this.off, this.off + n);
    this.off += n;
    return n;
  }
}
