// Suite module for internal_coroutines_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it } from 'vitest';
import {
  TestDispatcher,
  TestNonbufferedChannel,
  TestNonbufferedChannelBlockedReceive,
  TestBufferedChannelGet,
  TestNotBlockingSelect,
  TestBlockingSelect,
  TestBlockingSelectAsyncSend,
  TestSelectOnClosedChannel,
  TestBlockingSelectAsyncSend2,
  TestSendSelect,
  TestSendSelectWithAsyncReceive,
  TestChannelClose,
  TestSendClosedChannel,
  TestBlockedSendClosedChannel,
  TestAsyncSendClosedChannel,
  TestDispatchClose,
  TestPanic,
  TestAwait,
  TestAwaitCancellation,
  TestFutureSetValue,
  TestFutureSet,
  TestFutureChain,
  TestSelectFuture,
  TestDecodeFutureChain,
  TestSelectFuture_WithBatchSets,
} from './internal_coroutines_test.js';
describe("internal_coroutines", () => {
  it("TestDispatcher", TestDispatcher);
  it("TestNonbufferedChannel", TestNonbufferedChannel);
  it("TestNonbufferedChannelBlockedReceive", TestNonbufferedChannelBlockedReceive);
  it("TestBufferedChannelGet", TestBufferedChannelGet);
  it("TestNotBlockingSelect", TestNotBlockingSelect);
  it("TestBlockingSelect", TestBlockingSelect);
  it("TestBlockingSelectAsyncSend", TestBlockingSelectAsyncSend);
  it("TestSelectOnClosedChannel", TestSelectOnClosedChannel);
  it("TestBlockingSelectAsyncSend2", TestBlockingSelectAsyncSend2);
  it("TestSendSelect", TestSendSelect);
  it("TestSendSelectWithAsyncReceive", TestSendSelectWithAsyncReceive);
  it("TestChannelClose", TestChannelClose);
  it("TestSendClosedChannel", TestSendClosedChannel);
  it("TestBlockedSendClosedChannel", TestBlockedSendClosedChannel);
  it("TestAsyncSendClosedChannel", TestAsyncSendClosedChannel);
  it.skip("TestDispatchClose", TestDispatchClose);
  it("TestPanic", TestPanic);
  it("TestAwait", TestAwait);
  it("TestAwaitCancellation", TestAwaitCancellation);
  it("TestFutureSetValue", TestFutureSetValue);
  it("TestFutureSet", TestFutureSet);
  it("TestFutureChain", TestFutureChain);
  it("TestSelectFuture", TestSelectFuture);
  it("TestDecodeFutureChain", TestDecodeFutureChain);
  it("TestSelectFuture_WithBatchSets", TestSelectFuture_WithBatchSets);
});
