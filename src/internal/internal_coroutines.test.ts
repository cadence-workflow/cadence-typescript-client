// Suite module for internal_coroutines_test.ts. Registration is kept out of the declaration module so that a sibling
// test module importing it for a helper does not also register this suite.
import { describe, it } from 'vitest';
import {
  TestDispatcher,
  TestNonBlockingChildren,
  TestNonbufferedChannel,
  TestNonbufferedChannelBlockedReceive,
  TestBufferedChannelPut,
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
  TestFutureFail,
  TestFutureSet,
  TestFutureChain,
  TestSelectFuture,
  TestSelectDecodeFuture,
  TestDecodeFutureChain,
  TestSelectFuture_WithBatchSets,
  TestChainedFuture,
} from './internal_coroutines_test.js';

describe("internal_coroutines", () => {
  it("TestDispatcher", TestDispatcher);
  it("TestNonBlockingChildren", TestNonBlockingChildren);
  it("TestNonbufferedChannel", TestNonbufferedChannel);
  it("TestNonbufferedChannelBlockedReceive", TestNonbufferedChannelBlockedReceive);
  it("TestBufferedChannelPut", TestBufferedChannelPut);
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
  it("TestFutureFail", TestFutureFail);
  it("TestFutureSet", TestFutureSet);
  it("TestFutureChain", TestFutureChain);
  it("TestSelectFuture", TestSelectFuture);
  it("TestSelectDecodeFuture", TestSelectDecodeFuture);
  it("TestDecodeFutureChain", TestDecodeFutureChain);
  it("TestSelectFuture_WithBatchSets", TestSelectFuture_WithBatchSets);
  it("TestChainedFuture", TestChainedFuture);
});
