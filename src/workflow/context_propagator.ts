// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { internal_ContextPropagator, internal_HeaderReader, internal_HeaderWriter } from '../internal/headers.js';

/**
 * ContextPropagator determines what information from context to pass along.
 * 
 * The information passed is called Headers - a sequence of string to []byte
 * tuples of serialized data that should follow workflow and activity execution
 * around.
 * 
 * Inject* methods are used on the way from the process to persistence in
 * Cadence - thus they use HeaderWriter-s to write the metadata. Extract*
 * methods are used on the way from persisted state in Cadence to execution
 * - thus they use HeaderReader-s to read the metadata and fill it in the
 * returned context. Returning error from Extract* methods prevents the
 * successful workflow run.
 * 
 * The whole sequence of execution is:
 * 
 * Process initiating the workflow -> Inject -> Cadence -> Go Workflow Worker
 * -> ExtractToWorkflow -> Start executing a workflow -> InjectFromWorkflow ->
 * Cadence -> Go Activity Worker -> Extract -> Execute Activity
 */
export type workflow_ContextPropagator = internal_ContextPropagator;

/**
 * HeaderReader is an interface to read information from cadence headers
 */
export type workflow_HeaderReader = internal_HeaderReader;

/**
 * HeaderWriter is an interface to write information to cadence headers
 */
export type workflow_HeaderWriter = internal_HeaderWriter;
