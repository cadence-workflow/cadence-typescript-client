// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import type { WorkflowServiceClientLike } from '../../runtime/workflow_service_client_like.js';
import { GoTestifySuite } from '../../runtime/testify_suite.js';
import { GoMockController } from '../../runtime/gomock.js';

export interface serviceWrapperSuite extends GoTestifySuite {
  Service?: WorkflowServiceClientLike;
  controller?: GoMockController;
}
