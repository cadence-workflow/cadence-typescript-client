/**
 * LibraryVersion is a historical way to report the "library release" version,
 * prior to go modules providing a far more consistent way to do so.
 * It is sent in a header on every request.
 * 
 * deprecated: For your own library-version reporting, use the go module version
 * in your build instead, e.g. from runtime/debug.ReadBuildInfo().
 * This may drift from the module version, does not report pre-release information,
 * and should only be used as a fallback.
 * 
 * This may be removed or changed in a future version.
 */
export const LibraryVersion = "1.3.0";
