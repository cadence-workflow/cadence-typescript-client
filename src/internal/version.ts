/**
 * FeatureVersion is a semver that informs the server of what high-level behaviors
 * this client supports.
 * This is sent in a header on every request.
 * 
 * If you wish to tie new behavior to a client release, rather than a feature
 * flag, increment the major/minor/patch as seems appropriate here.
 * 
 * It can in principle be inferred from the release version in nearly all
 * "normal" scenarios, but release versions are not always available
 * (debug.BuildInfo is not guaranteed) and non-released versions do not have any
 * way to safely infer behavior.  So it is a hard-coded string instead.
 */
export const FeatureVersion = "1.7.0";

/**
 * LibraryVersion is a historical way to report the "library release" version,
 * prior to go modules providing a far more consistent way to do so.
 * It is sent in a header on every request.
 * 
 * deprecated: This cannot accurately report pre-release version information,
 * and it is easy for it to drift from the release version (especially if an old
 * commit is tagged, to avoid branching, as this behaves poorly with go modules).
 * 
 * Ideally it would be replaced by runtime/debug.ReadBuildInfo()... but that is
 * not guaranteed to exist, and even if this is a fallback it still needs to be
 * maintained and may be inherently out of date at any time.
 * 
 * Due to all of this unreliability, this should be used as strictly informational
 * metadata, e.g. for caller version monitoring, never behavioral (use
 * FeatureVersion or feature flags instead).
 */
export const LibraryVersion = "1.3.0";
