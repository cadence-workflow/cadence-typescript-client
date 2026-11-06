// THIS IS A GENERATED FILE DON'T EDIT MANUALLY
// Credits: github.com/condorance
import { internal_Context, WithCancel } from './context.js';
import { Minute } from './runtime/time.js';
import { expect } from 'vitest';
import { newDispatcher, newDecodeFuture, newWorkflowContext, newWorkflowInterceptors, getState } from './internal_workflow.js';
import { NewBufferedChannel, Await, Go, NewChannel, NewSelector, GoNamed, NewNamedChannel, internal_Future, internal_Settable, NewFuture, internal_Channel, ExecuteActivity, WithActivityOptions, NewNamedSelector } from './workflow.js';
import { internal_CanceledError, workflowPanicError } from './error.js';
import { newTestWorkflowEnv } from './test_helpers_test.js';
import { internal_ActivityOptions } from './activity.js';

export async function createRootTestContext(): Promise<internal_Context> {
  const env = newTestWorkflowEnv();
  const [interceptors, envInterceptor] = newWorkflowInterceptors(
    env.impl!,
    env.impl!.workflowInterceptors,
  );
  return await newWorkflowContext(env.impl!, interceptors, envInterceptor);
}

export async function TestDispatcher(): Promise<void> {
  let value = "foo";
  const rootCtx = await createRootTestContext();
  const [d] = await newDispatcher(rootCtx, (ctx: internal_Context) => {
    value = "bar";
  });
  expect(value).toEqual("foo");
  await d.ExecuteUntilAllBlocked();
  expect(d.IsDone()).toBe(true);
  expect(value).toEqual("bar");
}

export async function TestNonBlockingChildren(): Promise<void> {
  const history: string[] = [];
  const rootCtx = await createRootTestContext();
  const [d, ctx] = await newDispatcher(rootCtx, (ctx: internal_Context) => {
    for (let i = 0; i < 10; i++) {
      const ii = i;
      Go(ctx, (_ctx: internal_Context) => {
        history.push(`child-${ii}`);
      }).catch((e) => {
        if (!(e instanceof Error)) throw e;
      });
    }
    history.push("root");
  });

  expect(history.length).toEqual(0);

  await d.ExecuteUntilAllBlocked();
  expect(d.IsDone()).toBe(true);
  expect(history.length).toEqual(11);
}

export async function TestNonbufferedChannel(): Promise<void> {
  let history: string[] = [];
  const rootCtx = await createRootTestContext();
  const [d] = await newDispatcher(rootCtx, async (ctx) => {
    const c1 = NewChannel(ctx);
    void Go(ctx, async (ctx) => {
      history.push("child-start");
      const vBox: { value: string } = { value: "" };
      const more = await c1.Receive(ctx, vBox);
      expect(more).toBe(true);
      history.push(`child-end-${vBox.value}`);
    });
    history.push("root-before-channel-put");
    await c1.Send(ctx, "value1");
    history.push("root-after-channel-put");
  });

  expect(history.length).toEqual(0);
  await d.ExecuteUntilAllBlocked();
  expect(d.IsDone()).toBe(true);

  const expected = [
    "root-before-channel-put",
    "child-start",
    "child-end-value1",
    "root-after-channel-put",
  ];
  expect(history).toEqual(expected);
}

export async function TestNonbufferedChannelBlockedReceive(): Promise<void> {
  const history: string[] = [];
  let c2!: internal_Channel;

  const rootCtx = await createRootTestContext();
  const [d] = await newDispatcher(rootCtx, async (ctx: internal_Context) => {
    const c1 = NewChannel(ctx);
    c2 = NewChannel(ctx);

    try {
      await Go(ctx, async (ctx: internal_Context) => {
        const vBox: { value: string } = { value: '' };
        let more = await c1.Receive(ctx, vBox);
        expect(more).toBe(true);
        history.push(`child1-end1-${vBox.value}`);

        more = await c1.Receive(ctx, vBox);
        expect(more).toBe(true);
        history.push(`child1-end2-${vBox.value}`);
      });
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }

    try {
      await Go(ctx, async (ctx: internal_Context) => {
        const vBox: { value: string } = { value: '' };
        history.push('child2-start');

        let more = await c2.Receive(ctx, vBox);
        expect(more).toBe(true);
        history.push(`child2-end1-${vBox.value}`);

        more = await c2.Receive(ctx, vBox);
        expect(more).toBe(true);
        history.push(`child2-end2-${vBox.value}`);
      });
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }

    history.push('root-before-channel-put');

    try {
      await c1.Send(ctx, 'value11');
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }

    try {
      await c1.Send(ctx, 'value12');
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }

    history.push('root-after-channel-put');
  });

  expect(history.length).toEqual(0);
  await d.ExecuteUntilAllBlocked();

  c2.SendAsync('value21');
  await d.ExecuteUntilAllBlocked();

  c2.SendAsync('value22');
  await d.ExecuteUntilAllBlocked();

  await d.StackTrace();
  expect(d.IsDone()).toBe(true);
}

export async function TestBufferedChannelPut(): Promise<void> {
    let history: string[] = [];
    const rootCtx = await createRootTestContext();
    const [d, ctx] = await newDispatcher(rootCtx, async (ctx: internal_Context) => {
        const c1 = NewBufferedChannel(ctx, 1);
        void Go(ctx, async (ctx: internal_Context) => {
            history.push("child-start");
            const v1: { value: string } = { value: "" };
            const v2: { value: string } = { value: "" };
            const more = await c1.Receive(ctx, v1);
            expect(more).toBe(true);
            history.push(`child-end-${v1.value}`);
            await c1.Receive(ctx, v2);
            history.push(`child-end-${v2.value}`);
        }).catch((e) => {
            if (!(e instanceof Error)) {
                throw e;
            }
        });
        history.push("root-before-channel-put");
        await c1.Send(ctx, "value1");
        history.push("root-after-channel-put1");
        await c1.Send(ctx, "value2");
        history.push("root-after-channel-put2");
    });
    expect(history.length).toEqual(0);
    await d.ExecuteUntilAllBlocked();
    expect(d.IsDone()).toBe(true);
    const expected = [
        "root-before-channel-put",
        "root-after-channel-put1",
        "child-start",
        "child-end-value1",
        "child-end-value2",
        "root-after-channel-put2",
    ];
    expect(history).toEqual(expected);
}

export async function TestBufferedChannelGet(): Promise<void> {
  let history: string[] = [];
  const [d, _dispatcherCtx] = await newDispatcher(
    await createRootTestContext(),
    async (ctx) => {
      const c1 = NewChannel(ctx);
      const c2 = NewBufferedChannel(ctx, 2);

      try {
        await Go(ctx, async (ctx) => {
          history.push("child1-start");
          try {
            await c2.Send(ctx, "bar1");
          } catch (err) {
            if (!(err instanceof Error)) throw err;
          }
          history.push("child1-get");
          const v1: { value: string } = { value: "" };
          const more = await c1.Receive(ctx, v1);
          expect(more).toBe(true);
          history.push(`child1-end-${v1.value}`);
        });
      } catch (err) {
        if (!(err instanceof Error)) throw err;
      }

      try {
        await Go(ctx, async (ctx) => {
          history.push("child2-start");
          try {
            await c2.Send(ctx, "bar2");
          } catch (err) {
            if (!(err instanceof Error)) throw err;
          }
          history.push("child2-get");
          const v1: { value: string } = { value: "" };
          const more = await c1.Receive(ctx, v1);
          expect(more).toBe(true);
          history.push(`child2-end-${v1.value}`);
        });
      } catch (err) {
        if (!(err instanceof Error)) throw err;
      }

      history.push("root-before-channel-get1");
      await c2.Receive(ctx, null);
      history.push("root-before-channel-get2");
      await c2.Receive(ctx, null);
      history.push("root-before-channel-put");
      try {
        await c1.Send(ctx, "value1");
      } catch (err) {
        if (!(err instanceof Error)) throw err;
      }
      history.push("root-after-channel-put1");
      try {
        await c1.Send(ctx, "value2");
      } catch (err) {
        if (!(err instanceof Error)) throw err;
      }
      history.push("root-after-channel-put2");
    },
  );

  expect(history.length).toBe(0);
  await d.ExecuteUntilAllBlocked();
  const isDone = d.IsDone();
  await d.StackTrace();
  expect(isDone).toBe(true);

  const expected = [
    "root-before-channel-get1",
    "child1-start",
    "child1-get",
    "child2-start",
    "child2-get",
    "root-before-channel-get2",
    "root-before-channel-put",
    "root-after-channel-put1",
    "root-after-channel-put2",
    "child1-end-value1",
    "child2-end-value2",
  ];
  expect(history).toEqual(expected);
}

export async function TestNotBlockingSelect(): Promise<void> {
	const history: string[] = [];
	const rootCtx = await createRootTestContext();
	const [d, ctx] = await newDispatcher(rootCtx, async (ctx) => {
		const c1 = NewBufferedChannel(ctx, 1);
		const c2 = NewBufferedChannel(ctx, 1);
		const s = NewSelector(ctx);

		s
			.AddReceive(c1, async (c: internal_Channel, more: boolean) => {
				expect(more).toBe(true);
				const vBox: { value: string } = { value: '' };
				await c.Receive(ctx, vBox);
				history.push(`c1-${vBox.value}`);
			})
			.AddReceive(c2, async (c: internal_Channel, more: boolean) => {
				expect(more).toBe(true);
				const vBox: { value: string } = { value: '' };
				await c.Receive(ctx, vBox);
				history.push(`c2-${vBox.value}`);
			})
			.AddDefault(() => {
				history.push('default');
			});

		await c1.Send(ctx, 'one');
		await s.Select(ctx);
		await c2.Send(ctx, 'two');
		await s.Select(ctx);
		await s.Select(ctx);
	});

	await d.ExecuteUntilAllBlocked();
	expect(d.IsDone()).toBe(true);

	const expected = ['c1-one', 'c2-two', 'default'];
	expect(history).toEqual(expected);
}

export async function TestBlockingSelect(): Promise<void> {
  const history: string[] = [];
  const rootCtx = await createRootTestContext();
  const [d] = await newDispatcher(rootCtx, async (ctx) => {
    const c1 = NewChannel(ctx);
    const c2 = NewChannel(ctx);

    void Go(ctx, async (ctx) => {
      history.push("add-one");
      await c1.Send(ctx, "one");
      history.push("add-one-done");
    });

    void Go(ctx, async (ctx) => {
      history.push("add-two");
      await c2.Send(ctx, "two");
      history.push("add-two-done");
    });

    const s = NewSelector(ctx);
    s
      .AddReceive(c1, async (c: internal_Channel, more: boolean) => {
        expect(more).toBe(true);
        const vBox: { value: string } = { value: "" };
        await c.Receive(ctx, vBox);
        history.push(`c1-${vBox.value}`);
      })
      .AddReceive(c2, async (c: internal_Channel, more: boolean) => {
        const vBox: { value: string } = { value: "" };
        await c.Receive(ctx, vBox);
        history.push(`c2-${vBox.value}`);
      });

    history.push("select1");
    await s.Select(ctx);
    history.push("select2");
    await s.Select(ctx);
    history.push("done");
  });

  await d.ExecuteUntilAllBlocked();
  expect(d.IsDone()).toBe(true);

  const expected = [
    "select1",
    "add-one",
    "add-one-done",
    "add-two",
    "c1-one",
    "select2",
    "c2-two",
    "done",
    "add-two-done",
  ];
  expect(history).toEqual(expected);
}

export async function TestBlockingSelectAsyncSend(): Promise<void> {
    const history: string[] = [];
    const [d, dispatcherContext] = await newDispatcher(await createRootTestContext(), async (ctx) => {
        const c1 = NewChannel(ctx);
        const s = NewSelector(ctx);
        s.AddReceive(c1, async (c, more) => {
            expect(more).toBe(true);
            const vBox: { value: number } = { value: 0 };
            await c.Receive(ctx, vBox);
            history.push(`c1-${vBox.value}`);
        });
        for (let i = 0; i < 3; i++) {
            const ii = i;
            await Go(ctx, async (ctx) => {
                history.push(`add-${ii}`);
                c1.SendAsync(ii);
            });
            history.push(`select-${ii}`);
            await s.Select(ctx);
        }
        history.push("done");
    });
    await d.ExecuteUntilAllBlocked();
    expect(d.IsDone()).toBe(true);

    const expected = [
        "select-0",
        "add-0",
        "c1-0",
        "select-1",
        "add-1",
        "c1-1",
        "select-2",
        "add-2",
        "c1-2",
        "done",
    ];
    expect(history).toEqual(expected);
}

export async function TestSelectOnClosedChannel(): Promise<void> {
  let history: string[] = [];
  const rootCtx = await createRootTestContext();
  const [d, dispatcherCtx] = await newDispatcher(rootCtx, async (ctx: internal_Context) => {
    const c = NewBufferedChannel(ctx, 1);
    try {
      await c.Send(ctx, 5);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }
    c.Close();

    const selector = NewNamedSelector(ctx, "waiting for channel");

    selector.AddReceive(c, async (f: internal_Channel, more: boolean) => {
      const nBox: { value: number } = { value: 0 };

      if (!more) {
        history.push("more from function is false");
        return;
      }

      more = await f.Receive(ctx, nBox);
      if (!more) {
        history.push("more from receive is false");
        return;
      }
      history.push(`got message on channel: ${nBox.value}`);
    });

    try {
      await selector.Select(ctx);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }
    try {
      await selector.Select(ctx);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }
    try {
      await selector.Select(ctx);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }
    try {
      await selector.Select(ctx);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }
  });

  await d.ExecuteUntilAllBlocked();
  expect(d.IsDone()).toBe(true);

  const expected = [
    "got message on channel: 5",
    "more from function is false",
    "more from function is false",
    "more from function is false",
  ];
  expect(history).toEqual(expected);
}

export async function TestBlockingSelectAsyncSend2(): Promise<void> {
    const history: string[] = [];
    const rootCtx = await createRootTestContext();
    const [d, _dispatcherContext] = await newDispatcher(rootCtx, async (ctx) => {
        const c1 = NewBufferedChannel(ctx, 100);
        const c2 = NewBufferedChannel(ctx, 100);
        const s = NewSelector(ctx);

        s
            .AddReceive(c1, async (c, more) => {
                expect(more).toBe(true);
                const vBox: { value: string } = { value: '' };
                try {
                    await c.Receive(ctx, vBox);
                } catch (err) {
                    if (!(err instanceof Error)) throw err;
                }
                history.push(`c1-${vBox.value}`);
            })
            .AddReceive(c2, async (c, more) => {
                expect(more).toBe(true);
                const vBox: { value: string } = { value: '' };
                try {
                    await c.Receive(ctx, vBox);
                } catch (err) {
                    if (!(err instanceof Error)) throw err;
                }
                history.push(`c2-${vBox.value}`);
            });

        history.push('send-s2');
        c2.SendAsync('s2');
        history.push('select-0');
        try {
            await s.Select(ctx);
        } catch (err) {
            if (!(err instanceof Error)) throw err;
        }
        history.push('send-s1');
        c1.SendAsync('s1');
        history.push('select-1');
        try {
            await s.Select(ctx);
        } catch (err) {
            if (!(err instanceof Error)) throw err;
        }
        history.push('done');
    });

    await d.ExecuteUntilAllBlocked();
    expect(d.IsDone()).toBe(true);

    const expected = [
        'send-s2',
        'select-0',
        'c2-s2',
        'send-s1',
        'select-1',
        'c1-s1',
        'done',
    ];
    expect(history).toEqual(expected);
}

export async function TestSendSelect(): Promise<void> {
  const history: string[] = [];
  const rootCtx = await createRootTestContext();
  const [d, ctx] = await newDispatcher(rootCtx, async (ctx) => {
    const c1 = NewChannel(ctx);
    const c2 = NewChannel(ctx);

    await Go(ctx, async (ctx) => {
      history.push("receiver");
      const v = { value: "" };
      let more = await c2.Receive(ctx, v);
      expect(more).toBe(true);
      history.push(`c2-${v.value}`);
      more = await c1.Receive(ctx, v);
      expect(more).toBe(true);
      history.push(`c1-${v.value}`);
    });

    const s = NewSelector(ctx);
    s
      .AddSend(c1, "one", () => {
        history.push("send1");
      })
      .AddSend(c2, "two", () => {
        history.push("send2");
      });

    history.push("select1");
    await s.Select(ctx);
    history.push("select2");
    await s.Select(ctx);
    history.push("done");
  });

  await d.ExecuteUntilAllBlocked();
  expect(d.IsDone()).toBe(true);

  const expected = [
    "select1",
    "receiver",
    "c2-two",
    "send2",
    "select2",
    "send1",
    "done",
    "c1-one",
  ];
  expect(history).toEqual(expected);
}

export async function TestSendSelectWithAsyncReceive(): Promise<void> {
    const history: string[] = [];
    const rootCtx = await createRootTestContext();
    const [d, ctx] = await newDispatcher(rootCtx, async (ctx) => {
        const c1 = NewChannel(ctx);
        const c2 = NewChannel(ctx);

        Go(ctx, async (ctx) => {
            history.push("receiver");
            const vBox: { value: string } = { value: "" };
            let [ok, more] = c2.ReceiveAsyncWithMoreFlag(vBox);
            expect(ok).toBe(true);
            expect(more).toBe(true);
            history.push(`c2-${vBox.value}`);
            more = await c1.Receive(ctx, vBox);

            expect(more).toBe(true);
            history.push(`c1-${vBox.value}`);
        });

        const s = NewSelector(ctx);
        s.AddSend(c1, "one", () => {
            history.push("send1");
        }).AddSend(c2, "two", () => {
            history.push("send2");
        });
        history.push("select1");
        await s.Select(ctx);
        history.push("select2");
        await s.Select(ctx);
        history.push("done");
    });

    await d.ExecuteUntilAllBlocked();
    expect(d.IsDone()).toBe(true);

    const expected = [
        "select1",
        "receiver",
        "c2-two",
        "send2",
        "select2",
        "send1",
        "done",
        "c1-one",
    ];
    expect(history).toEqual(expected);
}

export async function TestChannelClose(): Promise<void> {
    const history: string[] = [];
    const rootCtx = await createRootTestContext();
    const [d, dispatcherCtx] = await newDispatcher(rootCtx, async (ctx: internal_Context) => {
        const jobs = NewBufferedChannel(ctx, 5);
        const done = NewNamedChannel(ctx, "done");

        await GoNamed(ctx, "receiver", async (ctx: internal_Context) => {
            for (;;) {
                const jBox: { value: number } = { value: 0 };
                const more = await jobs.Receive(ctx, jBox);
                if (more) {
                    history.push(`received job ${jBox.value}`);
                } else {
                    history.push("received all jobs");
                    await done.Send(ctx, true);
                    return;
                }
            }
        });

        for (let j = 1; j <= 3; j++) {
            await jobs.Send(ctx, j);
            history.push(`sent job ${j}`);
        }

        jobs.Close();
        history.push("sent all jobs");
        await done.Receive(ctx, undefined);
        history.push("done");
    });

    expect(history.length).toEqual(0);
    await d.ExecuteUntilAllBlocked();
    expect(d.IsDone()).toBe(true);

    const expected = [
        "sent job 1",
        "sent job 2",
        "sent job 3",
        "sent all jobs",
        "received job 1",
        "received job 2",
        "received job 3",
        "received all jobs",
        "done",
    ];
    expect(history).toEqual(expected);
}

export async function TestSendClosedChannel(): Promise<void> {
  const [d] = await newDispatcher(
    await createRootTestContext(),
    async (ctx: internal_Context) => {
      let recovered: unknown = null;
      try {
        const c = NewChannel(ctx);
        try {
          await Go(ctx, (ctx: internal_Context) => {
            c.Close();
          });
        } catch (err) {
          if (!(err instanceof Error)) throw err;
        }
        await c.Send(ctx, "baz");
      } catch (err) {
        recovered = err;
      }
      expect(recovered).not.toBeNull();
    },
  );
  await d.ExecuteUntilAllBlocked();
  expect(d.IsDone()).toBe(true);
}

export async function TestBlockedSendClosedChannel(): Promise<void> {
  const rootCtx = await createRootTestContext();
  const [d] = await newDispatcher(rootCtx, async (ctx: internal_Context) => {
    try {
      const c = NewBufferedChannel(ctx, 5);
      await c.Send(ctx, "bar");
      c.Close();
      await c.Send(ctx, "baz");
    } catch (err) {
      expect(err).not.toBeNull();
    }
  });
  await d.ExecuteUntilAllBlocked();
  expect(d.IsDone()).toBe(true);
}

export async function TestAsyncSendClosedChannel(): Promise<void> {
    const rootCtx = await createRootTestContext();
    const [d, dispatcherCtx] = await newDispatcher(rootCtx, async (ctx: internal_Context) => {
        let recovered: unknown = null;
        try {
            const c = NewBufferedChannel(ctx, 5);
            await c.Send(ctx, "bar");
            c.Close();
            c.SendAsync("baz");
        } catch (err) {
            recovered = err;
        }
        expect(recovered).not.toBeNull();
    });
    await d.ExecuteUntilAllBlocked();
    expect(d.IsDone()).toBe(true);
}

export async function TestDispatchClose(): Promise<void> {
  // @go-unlowerable: goroutine stack-frame lines and runtime goroutine count — TypeScript has no faithful equivalent for Go stack rendering or runtime.NumGoroutine().
  let history: string[] = [];
  const rootCtx = await createRootTestContext();
  const [d] = await newDispatcher(rootCtx, async (ctx) => {
    const c = NewNamedChannel(ctx, "forever_blocked");
    for (let i = 0; i < 10; i++) {
      const ii = i;
      void GoNamed(ctx, `c-${i}`, async (childCtx) => {
        try {
          await c.Receive(childCtx, undefined);
          history.push(`child-${ii}`);
        } finally {
          getState(childCtx);
        }
      }).catch((e) => {
        if (!(e instanceof Error)) throw e;
      });
    }
    history.push("root");
    await c.Receive(ctx, undefined);
  });

  expect(history).toHaveLength(0);
  await d.ExecuteUntilAllBlocked();
  expect(d.IsDone()).toBe(false);

  const stack = await d.StackTrace();
  // @go-weakened: exact Go stack rendering and line count are not representable in TypeScript.
  expect(stack.length).toBeGreaterThan(0);

  await d.Close();
  await new Promise<void>((resolve) => {
    globalThis.setTimeout(resolve, 100);
  });

  // @go-weakened: runtime.NumGoroutine() has no faithful TypeScript equivalent; dispatcher closure is the semantic core.
  expect(d.IsDone()).toBe(true);
  const expected = ["root"];
  expect(history).toEqual(expected);

  for (const c of d.coroutines) {
    expect(c.panicError).toBeUndefined();
  }
}

export async function TestPanic(): Promise<void> {
  let history: string[] = [];
  const [d] = await newDispatcher(await createRootTestContext(), async (ctx) => {
    const c = NewNamedChannel(ctx, "forever_blocked");
    for (let i = 0; i < 10; i++) {
      const ii = i;
      await GoNamed(ctx, `c-${i}`, async (ctx) => {
        if (ii === 9) {
          throw "simulated failure";
        }
        await c.Receive(ctx, undefined);
        history.push(`child-${ii}`);
      });
    }
    history.push("root");
    await c.Receive(ctx, undefined);
  });

  expect(history).toHaveLength(0);

  let err: Error | null = null;
  try {
    await d.ExecuteUntilAllBlocked();
  } catch (e) {
    if (!(e instanceof Error)) throw e;
    err = e;
  }

  expect(err).not.toBeNull();
  const value = err!.message;
  expect(value).toEqual("simulated failure");
  expect(err!.message).toEqual("simulated failure");
  expect(err instanceof workflowPanicError).toBe(true);
  const panicError = err as workflowPanicError;
  // @go-weakened: Go goroutine stack-frame content cannot be reproduced in TypeScript.
  expect(typeof panicError.StackTrace()).toBe("string");
}

export async function TestAwait(): Promise<void> {
  let flag = false;
  const rootCtx = await createRootTestContext();
  const [d] = await newDispatcher(rootCtx, async (ctx: internal_Context) => {
    try {
      await Await(ctx, () => flag);
    } catch (err) {
      if (!(err instanceof Error)) throw err;
    }
  });
  await d.ExecuteUntilAllBlocked();
  expect(d.IsDone()).toBe(false);
  await d.ExecuteUntilAllBlocked();
  expect(d.IsDone()).toBe(false);
  flag = true;
  await d.ExecuteUntilAllBlocked();
  expect(d.IsDone()).toBe(true);
}

export async function TestAwaitCancellation(): Promise<void> {
  let awaitError: Error | null = null;
  const rootCtx = await createRootTestContext();
  const [ctx, cancelHandler] = await WithCancel(rootCtx);
  const [d] = await newDispatcher(ctx, (ctx: internal_Context) =>
    Await(ctx, () => false).catch((err) => {
      if (!(err instanceof Error)) throw err;
      awaitError = err;
    }),
  );
  await d.ExecuteUntilAllBlocked();
  expect(d.IsDone()).toBe(false);
  await cancelHandler();
  await d.ExecuteUntilAllBlocked();
  expect(d.IsDone()).toBe(true);
  expect(awaitError).not.toBeNull();
  expect(awaitError instanceof internal_CanceledError).toBe(true);
}

export async function TestFutureSetValue(): Promise<void> {
    const history: string[] = [];
    let f!: internal_Future;
    let s!: internal_Settable;

    const rootCtx = await createRootTestContext();
    const [d] = await newDispatcher(rootCtx, async (ctx: internal_Context) => {
        [f, s] = NewFuture(ctx);

        try {
            await Go(ctx, async (ctx: internal_Context) => {
                history.push("child-start");
                expect(f.IsReady()).toBe(false);

                const vBox: { value: string } = { value: "" };
                await f.Get(ctx, vBox);
                const v = vBox.value;

                expect(f.IsReady()).toBe(true);
                history.push(`future-get-${v}`);

                await f.Get(ctx, vBox);
                const v2 = vBox.value;
                expect(f.IsReady()).toBe(true);
                history.push(`child-end-${v2}`);
            });
        } catch (err) {
            if (!(err instanceof Error)) {
                throw err;
            }
        }

        history.push("root-end");
    });

    expect(history.length).toEqual(0);
    await d.ExecuteUntilAllBlocked();
    await d.StackTrace();
    expect(d.IsDone()).toBe(false);

    history.push("future-set");
    expect(f.IsReady()).toBe(false);
    s.SetValue("value1");
    expect(f.IsReady()).toBe(true);

    await d.ExecuteUntilAllBlocked();
    expect(d.IsDone()).toBe(true);

    const expected = [
        "root-end",
        "child-start",
        "future-set",
        "future-get-value1",
        "child-end-value1",
    ];
    expect(history).toEqual(expected);
}

export async function TestFutureFail(): Promise<void> {
  let history: string[] = [];
  let f!: internal_Future;
  let s!: internal_Settable;

  const rootCtx = await createRootTestContext();
  const [d] = await newDispatcher(rootCtx, (ctx: internal_Context) => {
    [f, s] = NewFuture(ctx);
    void Go(ctx, async (ctx: internal_Context) => {
      history.push("child-start");
      expect(f.IsReady()).toBe(false);

      const v: { value: string } = { value: "" };
      let err: Error | null = null;
      try {
        await f.Get(ctx, v);
      } catch (e) {
        if (!(e instanceof Error)) throw e;
        err = e;
      }
      expect(err).not.toBeNull();
      expect(f.IsReady()).toBe(true);
      history.push(`future-get-${err instanceof Error ? err.message : globalThis.String(err)}`);

      err = null;
      try {
        await f.Get(ctx, v);
      } catch (e) {
        if (!(e instanceof Error)) throw e;
        err = e;
      }
      expect(err).not.toBeNull();
      expect(f.IsReady()).toBe(true);
      history.push(`child-end-${err instanceof Error ? err.message : globalThis.String(err)}`);
    }).catch((e) => {
      if (!(e instanceof Error)) throw e;
    });
    history.push("root-end");
  });

  expect(history.length).toEqual(0);
  await d.ExecuteUntilAllBlocked();
  const isDone = d.IsDone();
  await d.StackTrace();
  expect(isDone).toBe(false);

  history.push("future-set");
  expect(f.IsReady()).toBe(false);
  s.SetError(new Error("value1"));
  expect(f.IsReady()).toBe(true);

  await d.ExecuteUntilAllBlocked();
  expect(d.IsDone()).toBe(true);

  const expected = [
    "root-end",
    "child-start",
    "future-set",
    "future-get-value1",
    "child-end-value1",
  ];
  expect(history).toEqual(expected);
}

export async function TestFutureSet(): Promise<void> {
  let history: string[] = [];
  let f1!: internal_Future;
  let f2!: internal_Future;
  let s1!: internal_Settable;
  let s2!: internal_Settable;

  const rootCtx = await createRootTestContext();
  const [d, ctx] = await newDispatcher(rootCtx, (ctx) => {
    [f1, s1] = NewFuture(ctx);
    [f2, s2] = NewFuture(ctx);

    void Go(ctx, async (ctx) => {
      history.push("child-start");
      expect(f1.IsReady()).toBe(false);

      const v: { value: string } = { value: "" };
      let err: Error | null;
      try {
        await f1.Get(ctx, v);
        err = null;
      } catch (caught) {
        if (!(caught instanceof Error)) throw caught;
        err = caught;
      }
      expect(err).not.toBeNull();
      expect(v.value).not.toBeNull();
      expect(f1.IsReady()).toBe(true);
      history.push(`f1-get-${v.value}-${err instanceof Error ? err.message : "<nil>"}`);

      try {
        await f1.Get(ctx, v);
        err = null;
      } catch (caught) {
        if (!(caught instanceof Error)) throw caught;
        err = caught;
      }
      expect(err).not.toBeNull();
      expect(f1.IsReady()).toBe(true);
      history.push(`f1-get2-${v.value}-${err instanceof Error ? err.message : "<nil>"}`);

      try {
        await f2.Get(ctx, v);
        err = null;
      } catch (caught) {
        if (!(caught instanceof Error)) throw caught;
        err = caught;
      }
      expect(err).toBeNull();
      expect(f2.IsReady()).toBe(true);
      history.push(`f2-get-${v.value}-${err === null ? "<nil>" : err.message}`);

      try {
        await f2.Get(ctx, v);
        err = null;
      } catch (caught) {
        if (!(caught instanceof Error)) throw caught;
        err = caught;
      }
      expect(err).toBeNull();
      expect(f1.IsReady()).toBe(true);
      history.push(`f2-get2-${v.value}-${err === null ? "<nil>" : err.message}`);

      history.push("child-end");
    });

    history.push("root-end");
  });

  expect(history.length).toBe(0);
  await d.ExecuteUntilAllBlocked();
  expect(d.IsDone()).toBe(false);

  history.push("f1-set");
  expect(f1.IsReady()).toBe(false);
  s1.Set("value-will-be-ignored", new Error("error1"));
  expect(f1.IsReady()).toBe(true);
  await d.ExecuteUntilAllBlocked();

  expect(d.IsDone()).toBe(false);
  history.push("f2-set");
  expect(f2.IsReady()).toBe(false);
  s2.Set("value2", null);
  expect(f2.IsReady()).toBe(true);
  await d.ExecuteUntilAllBlocked();
  expect(d.IsDone()).toBe(true);

  const expected = [
    "root-end",
    "child-start",
    "f1-set",
    "f1-get--error1",
    "f1-get2--error1",
    "f2-set",
    "f2-get-value2-<nil>",
    "f2-get2-value2-<nil>",
    "child-end",
  ];
  expect(history).toEqual(expected);
}

export async function TestFutureChain(): Promise<void> {
  let history: string[] = [];
  let f1!: internal_Future;
  let cf1!: internal_Future;
  let f2!: internal_Future;
  let cf2!: internal_Future;
  let s1!: internal_Settable;
  let cs1!: internal_Settable;
  let s2!: internal_Settable;
  let cs2!: internal_Settable;

  const rootCtx = await createRootTestContext();
  const [d, ctx] = await newDispatcher(rootCtx, async (ctx) => {
    [f1, s1] = NewFuture(ctx);
    [cf1, cs1] = NewFuture(ctx);
    s1.Chain(cf1);
    [f2, s2] = NewFuture(ctx);
    [cf2, cs2] = NewFuture(ctx);
    s2.Chain(cf2);

    try {
      await Go(ctx, async (ctx) => {
        history.push("child-start");
        expect(f1.IsReady()).toBe(false);

        const vBox: { value: string } = { value: "" };
        let err: Error | null = null;
        try {
          await f1.Get(ctx, vBox);
        } catch (caught) {
          if (!(caught instanceof Error)) throw caught;
          err = caught;
        }
        expect(err).not.toBeNull();
        expect(f1.IsReady()).toBe(true);
        history.push(`f1-get-${vBox.value}-${err === null ? "<nil>" : err.message}`);

        err = null;
        try {
          await f1.Get(ctx, vBox);
        } catch (caught) {
          if (!(caught instanceof Error)) throw caught;
          err = caught;
        }
        expect(err).not.toBeNull();
        expect(f1.IsReady()).toBe(true);
        history.push(`f1-get2-${vBox.value}-${err === null ? "<nil>" : err.message}`);

        err = null;
        try {
          await f2.Get(ctx, vBox);
        } catch (caught) {
          if (!(caught instanceof Error)) throw caught;
          err = caught;
        }
        expect(err).toBeNull();
        expect(vBox.value).toEqual("value2");
        expect(f2.IsReady()).toBe(true);
        history.push(`f2-get-${vBox.value}-${err === null ? "<nil>" : err.message}`);

        err = null;
        try {
          await f2.Get(ctx, vBox);
        } catch (caught) {
          if (!(caught instanceof Error)) throw caught;
          err = caught;
        }
        expect(err).toBeNull();
        expect(vBox.value).toEqual("value2");
        expect(f2.IsReady()).toBe(true);
        history.push(`f2-get2-${vBox.value}-${err === null ? "<nil>" : err.message}`);
      });
    } catch (caught) {
      if (!(caught instanceof Error)) throw caught;
    }

    history.push("root-end");
  });

  expect(history.length).toEqual(0);
  await d.ExecuteUntilAllBlocked();
  expect(d.IsDone()).toBe(false);
  await d.StackTrace();

  history.push("f1-set");
  expect(f1.IsReady()).toBe(false);
  cs1.Set("value1-will-be-ignored", new Error("error1"));
  expect(f1.IsReady()).toBe(true);
  await d.ExecuteUntilAllBlocked();

  expect(d.IsDone()).toBe(false);
  await d.StackTrace();

  history.push("f2-set");
  expect(f2.IsReady()).toBe(false);
  cs2.Set("value2", null);
  expect(f2.IsReady()).toBe(true);
  await d.ExecuteUntilAllBlocked();

  expect(d.IsDone()).toBe(true);

  const expected = [
    "root-end",
    "child-start",
    "f1-set",
    "f1-get--error1",
    "f1-get2--error1",
    "f2-set",
    "f2-get-value2-<nil>",
    "f2-get2-value2-<nil>",
  ];
  expect(history).toEqual(expected);
}

export async function TestSelectFuture(): Promise<void> {
  const rootCtx = await createRootTestContext();
  const [d] = await newDispatcher(rootCtx, async (ctx: internal_Context) => {
    let history: string[] = [];
    const [future1, settable1] = NewFuture(ctx);
    const [future2, settable2] = NewFuture(ctx);

    Go(ctx, async (_ctx: internal_Context) => {
      history.push("add-one");
      settable1.SetValue("one");
    });

    Go(ctx, async (_ctx: internal_Context) => {
      history.push("add-two");
      settable2.SetValue("two");
    });

    const s = NewSelector(ctx);
    s
      .AddFuture(future1, async (f: internal_Future) => {
        const vBox: { value: string } = { value: "" };
        await f.Get(ctx, vBox);
        const v = vBox.value;
        history.push(`c1-${v}`);
      })
      .AddFuture(future2, async (f: internal_Future) => {
        const vBox: { value: string } = { value: "" };
        await f.Get(ctx, vBox);
        const v = vBox.value;
        history.push(`c2-${v}`);
      });

    history.push("select1");
    await s.Select(ctx);
    history.push("select2");
    await s.Select(ctx);
    history.push("done");

    expect(history).toEqual([
      "select1",
      "add-one",
      "add-two",
      "c1-one",
      "select2",
      "c2-two",
      "done",
    ]);
  });

  await d.ExecuteUntilAllBlocked();
  expect(d.IsDone()).toBe(true);
}

export async function TestSelectDecodeFuture(): Promise<void> {
	const history: string[] = [];
	const rootCtx = await createRootTestContext();
	const [d] = await newDispatcher(rootCtx, async (ctx: internal_Context) => {
		const [future1, settable1] = newDecodeFuture(ctx, "testFn1");
		const [future2, settable2] = newDecodeFuture(ctx, "testFn2");

		void Go(ctx, async (ctx: internal_Context) => {
			history.push("add-one");
			settable1.SetValue(Buffer.from("one"));
		}).catch((err) => {
			if (!(err instanceof Error)) throw err;
		});

		void Go(ctx, async (ctx: internal_Context) => {
			history.push("add-two");
			settable2.SetValue(Buffer.from("two"));
		}).catch((err) => {
			if (!(err instanceof Error)) throw err;
		});

		const s = NewSelector(ctx);
		s
			.AddFuture(future1, async (f: internal_Future) => {
				const vBox: { value: Buffer } = { value: Buffer.alloc(0) };
				await f.Get(ctx, vBox);
				history.push(`c1-${vBox.value.toString()}`);
			})
			.AddFuture(future2, async (f: internal_Future) => {
				const vBox: { value: Buffer } = { value: Buffer.alloc(0) };
				await f.Get(ctx, vBox);
				history.push(`c2-${vBox.value.toString()}`);
			});

		history.push("select1");
		await s.Select(ctx);
		history.push("select2");
		await s.Select(ctx);
		history.push("done");
	});

	await d.ExecuteUntilAllBlocked();
	expect(d.IsDone()).toBe(true);

	const expected = [
		"select1",
		"add-one",
		"add-two",
		"c1-one",
		"select2",
		"c2-two",
		"done",
	];
	expect(history).toEqual(expected);
}

export async function TestDecodeFutureChain(): Promise<void> {
    const history: string[] = [];
    let f1!: internal_Future;
    let cf1!: internal_Future;
    let f2!: internal_Future;
    let cf2!: internal_Future;
    let s1!: internal_Settable;
    let cs1!: internal_Settable;
    let s2!: internal_Settable;
    let cs2!: internal_Settable;

    const rootCtx = await createRootTestContext();
    const [d] = await newDispatcher(rootCtx, async (ctx) => {
        [f1, s1] = newDecodeFuture(ctx, "testFn");
        [cf1, cs1] = newDecodeFuture(ctx, "testFun");
        [f2, s2] = newDecodeFuture(ctx, "testFn");
        [cf2, cs2] = newDecodeFuture(ctx, "testFun");

        s1.Chain(cf1);
        s2.Chain(cf2);

        await Go(ctx, async (ctx) => {
            history.push("child-start");
            expect(f1.IsReady()).toBe(false);

            const vBox: { value: Buffer } = { value: Buffer.alloc(0) };
            let err: Error | null = null;
            try {
                await f1.Get(ctx, vBox);
            } catch (caught) {
                if (!(caught instanceof Error)) throw caught;
                err = caught;
            }
            expect(err).not.toBeNull();
            expect(vBox.value).toEqual(Buffer.alloc(0));
            expect(f1.IsReady()).toBe(true);
            history.push(`f1-get-${vBox.value.toString()}-${err === null ? "<nil>" : err.message}`);

            err = null;
            try {
                await f1.Get(ctx, vBox);
            } catch (caught) {
                if (!(caught instanceof Error)) throw caught;
                err = caught;
            }
            expect(err).not.toBeNull();
            expect(vBox.value).toEqual(Buffer.alloc(0));
            expect(f1.IsReady()).toBe(true);
            history.push(`f1-get2-${vBox.value.toString()}-${err === null ? "<nil>" : err.message}`);

            err = null;
            try {
                await f2.Get(ctx, vBox);
            } catch (caught) {
                if (!(caught instanceof Error)) throw caught;
                err = caught;
            }
            expect(err).toBeNull();
            expect(vBox.value).not.toBeNull();
            expect(f1.IsReady()).toBe(true);
            history.push(`f2-get-${vBox.value.toString()}-${err === null ? "<nil>" : err.message}`);

            err = null;
            try {
                await f2.Get(ctx, vBox);
            } catch (caught) {
                if (!(caught instanceof Error)) throw caught;
                err = caught;
            }
            expect(err).toBeNull();
            expect(vBox.value).not.toBeNull();
            expect(f2.IsReady()).toBe(true);
            history.push(`f2-get2-${vBox.value.toString()}-${err === null ? "<nil>" : err.message}`);
        });

        history.push("root-end");
    });

    expect(history.length).toEqual(0);
    await d.ExecuteUntilAllBlocked();

    expect(d.IsDone()).toBe(false);
    await d.StackTrace();
    history.push("f1-set");
    expect(f1.IsReady()).toBe(false);
    cs1.Set(Buffer.from("value-will-be-ignored"), new Error("error1"));
    expect(f1.IsReady()).toBe(true);
    await d.ExecuteUntilAllBlocked();

    expect(d.IsDone()).toBe(false);
    await d.StackTrace();
    history.push("f2-set");
    expect(f2.IsReady()).toBe(false);
    cs2.Set(Buffer.from("value2"), null);
    expect(f2.IsReady()).toBe(true);
    await d.ExecuteUntilAllBlocked();

    expect(d.IsDone()).toBe(true);

    const expected = [
        "root-end",
        "child-start",
        "f1-set",
        "f1-get--error1",
        "f1-get2--error1",
        "f2-set",
        "f2-get-value2-<nil>",
        "f2-get2-value2-<nil>",
    ];
    expect(history).toEqual(expected);
}

export async function TestSelectFuture_WithBatchSets(): Promise<void> {
	const history: string[] = [];
	const rootCtx = await createRootTestContext();
	const [d] = await newDispatcher(rootCtx, async (ctx) => {
		const [future1, settable1] = NewFuture(ctx);
		const [future2, settable2] = NewFuture(ctx);
		const [future3, settable3] = NewFuture(ctx);

		const s = NewSelector(ctx);
		s
			.AddFuture(future1, async (f) => {
				const vBox: { value: string } = { value: '' };
				await f.Get(ctx, vBox);
				history.push(`c1-${vBox.value}`);
			})
			.AddFuture(future2, async (f) => {
				const vBox: { value: string } = { value: '' };
				await f.Get(ctx, vBox);
				history.push(`c2-${vBox.value}`);
			})
			.AddFuture(future3, async (f) => {
				const vBox: { value: string } = { value: '' };
				await f.Get(ctx, vBox);
				history.push(`c3-${vBox.value}`);
			});

		settable2.Set("two", null);
		await s.Select(ctx);
		settable3.Set("three", null);
		settable1.Set("one", null);
		await s.Select(ctx);
		await s.Select(ctx);
	});

	await d.ExecuteUntilAllBlocked();
	expect(d.IsDone()).toBe(true);

	const expected = ["c2-two", "c1-one", "c3-three"];
	expect(history).toEqual(expected);
}

export async function TestChainedFuture(): Promise<void> {
  const activityFn = (arg: number): number => {
    return arg;
  };

  const workflowFn = async (ctx: internal_Context): Promise<number> => {
    ctx = WithActivityOptions(
      ctx,
      new internal_ActivityOptions({
        ActivityID: "",
        HeartbeatTimeout: 0,
        ScheduleToCloseTimeout: 0,
        ScheduleToStartTimeout: Minute,
        StartToCloseTimeout: Minute,
        TaskList: "",
        WaitForCancellation: false,
      }),
    );

    const f = await ExecuteActivity(ctx, activityFn, 5);
    const [fut, set] = NewFuture(ctx);
    set.Chain(f);

    const out = { value: 0 };
    await fut.Get(ctx, out);
    return out.value;
  };

  const env = newTestWorkflowEnv();
  await env.RegisterWorkflow(workflowFn);
  await env.RegisterActivity(activityFn);

  await env.ExecuteWorkflow(workflowFn);
  const err = env.GetWorkflowError();
  expect(err).toBeNull();

  const out = { value: 0 };
  env.GetWorkflowResult(out);
  expect(out.value).toEqual(5);
}
