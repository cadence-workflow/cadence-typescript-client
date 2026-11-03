/**
 * Action signifying something such as a button
 */
export interface Action {
  Type: string;
  SignalName: string;
  SignalValue?: unknown;
  WorkflowID: string;
  RunID: string;
}

/**
 * A section in the workflow Query response that will be rendered
 */
export interface Block {
  Type: string;
  Format: string;
  ComponentOptions?: ComponentOptions;
  Elements?: blocks_Element[];
}

export interface ComponentOptions {
  Type: string;
  Text: string;
}

/**
 * Query response is the overall wrapper struct that will be returned to the client.
 * There's nothing special about this Go code specifically, the actual UI
 * only cares about the JSON structure returned, but this is a helpful wrapper
 */
export interface QueryResponse {
  CadenceResponseType: string;
  Format: string;
  Blocks?: Block[];
}

export interface blocks_Element {
  Type: string;
  ComponentOptions?: ComponentOptions;
  Action?: Action;
}

/**
 * New creates a new QueryResponse with the given blocks. This is the top level block.
 * and should be used to return all subsections unless you wish to create the struct manually.
 */
export function New(...blocks: Block[]): QueryResponse {
  return {
    CadenceResponseType: "formattedData",
    Format: "blocks",
    Blocks: blocks,
  };
}

/**
 * Creates a markdown block with the given text.
 */
export function NewMarkdownSection(markdownText: string): Block {
  return {
    Type: "section",
    Format: "text/markdown",
    ComponentOptions: {
      Type: "",
      Text: markdownText,
    },
  };
}

/**
 * NewDivider creates a divider in the UI.
 */
export function NewDivider(): Block {
  return {
    Type: "divider",
    Format: "",
  };
}

/**
 * Creates a set of actions for signalling the workflow.
 */
export function NewSignalActions(...elements: blocks_Element[]): Block {
  return {
    Type: "actions",
    Elements: elements,
    Format: ""
  };
}

/**
 * NewSignalButton creates a button that will signal the workflow with the given signal name and value.
 * the signal value can be nil if no value is needed.
 */
export function NewSignalButton(text: string, signalName: string, signalValue: unknown): blocks_Element {
  return {
    Type: "button",
    ComponentOptions: {
      Type: "plain_text",
      Text: text,
    },
    Action: {
      Type: "signal",
      SignalName: signalName,
      SignalValue: signalValue,
      RunID: "",
      WorkflowID: "",
    },
  };
}

/**
 * NewSignalButtonWithExternalWorkflow creates a button that will signal the workflow with the given signal name and value,
 * and will also start the external workflow with the given workflow ID and run ID.
 * 
 * The RunID should be optional and the latest workflow will be selected i it's not provided
 */
export function NewSignalButtonWithExternalWorkflow(text: string, signalName: string, signalValue: unknown, workflowID: string, runID: string): blocks_Element {
  return {
    Type: "button",
    ComponentOptions: {
      Type: "plain_text",
      Text: text,
    },
    Action: {
      Type: "signal",
      SignalName: signalName,
      SignalValue: signalValue,
      WorkflowID: workflowID,
      RunID: runID,
    },
  };
}
