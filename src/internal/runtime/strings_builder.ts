// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
export class StringsBuilder {
  private parts: string[] = [];
  private len: number = 0; // UTF-8 byte length, matching Go's Len()
  String(): string { return this.parts.join(""); }
  Len(): number { return this.len; }
  Reset(): void { this.parts = []; this.len = 0; }
  WriteString(s: string): number {
    const n = Buffer.byteLength(s, "utf8");
    this.parts.push(s);
    this.len += n;
    return n;
  }
  // Go WriteRune takes a rune (int32 code point); translated bodies may pass a
  // one-character string literal instead — accept both.
  WriteRune(r: number | string): number {
    return this.WriteString(typeof r === "number" ? String.fromCodePoint(r) : r);
  }
  WriteByte(b: number): void {
    this.parts.push(String.fromCharCode(b & 0xff));
    this.len += 1;
  }
  Write(p: Buffer | Uint8Array): number {
    const s = Buffer.from(p).toString("utf8");
    this.parts.push(s);
    this.len += p.length;
    return p.length;
  }
  Grow(_n: number): void {} // capacity hint; no-op for a string-array accumulator
  Cap(): number { return this.len; }
}
