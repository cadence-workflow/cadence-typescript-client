// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { internal_DataConverter, internal_Value, internal_Values, DefaultDataConverter } from '../internal/encoded.js';

/**
 * DataConverter is used by the framework to serialize/deserialize input and output of activity/workflow
 * that need to be sent over the wire.
 * To encode/decode workflow arguments, one should set DataConverter in two places:
 *   1. Workflow worker, through worker.Options
 *   2. Client, through client.Options
 * To encode/decode Activity/ChildWorkflow arguments, one should set DataConverter in two places:
 *   1. Inside workflow code, use workflow.WithDataConverter to create new Context,
 * and pass that context to ExecuteActivity/ExecuteChildWorkflow calls.
 * Cadence support using different DataConverters for different activity/childWorkflow in same workflow.
 *   2. Activity/Workflow worker that run these activity/childWorkflow, through worker.Options.
 */
export type encoded_DataConverter = internal_DataConverter;

/**
 * Value is used to encapsulate/extract encoded value from workflow/activity.
 */
export type encoded_Value = internal_Value;

/**
 * Values is used to encapsulate/extract encoded one or more values from workflow/activity.
 */
export type encoded_Values = internal_Values;

/**
 * GetDefaultDataConverter return default data converter used by Cadence worker
 */
export function GetDefaultDataConverter(): encoded_DataConverter {
  return DefaultDataConverter;
}
