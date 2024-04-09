---
date: 2022-07-20
title: 'Testing NgRx Effects with Async/Await'
slug: 2022-07-20-Testing-NgRx-Effects-With-Async-Await
description:
published: false
tags: ['javascript', 'angular']
---

This post explains a delightful approach to testing NgRx Effects that could help simplify your code.

tl;dr:

- Test Effects as Observables , but use async / await and firstValueFrom instead of .subscribe().
- Here is [source code](https://github.com/edezekiel/nx-test-ngrx) for a demo application with example specs.

## 1. Common Syntax for Testing Effects

The [NgRx documentation](https://ngrx.io/guide/effects/testing) explains a few ways to test Effects. To summarize, the approaches either use marble diagram syntax or use subscribe().

### A. Marble Diagrams and Test Scheduler

Marble diagrams have such a steep learning curve that I’ve never worked with someone who adamantly recommends them. Test Scheduler also uses marble diagram syntax so I’ve generally avoided it for the same reason.

### B. Testing Effects Using subscribe()

Whether you test your Effect with an Observable or a ReplaySubject, the NgRx docs provide examples using subscribe() to obtain the value returned from the tested effect.

### C. Testing Effects using async / await Syntax

This post introduces a pattern for testing Effects with Observables using async / await instead of subscribe().

I personally find async / await easier to read and understand than using .subscribe(). There’s a simple pattern for arranging data, performing actions involving Effects, resolving those actions, and making assertions based on those results.

One added benefit of this approach is that you don’t need to worry about cleaning up subscriptions in your spec. firstValueFrom automatically unsubscribes for you.

## 2. The Demo Application, Jest, and Test Setup

In this section, I’ll review the setup for our tests. If you just want to see the testing code you can skip to the next section or jump to the [widgets.effects.spec](https://github.com/edezekiel/nx-test-ngrx/blob/main/libs/widgets/data-access/src/lib/%2Bstate/widgets.effects.spec.ts) file in the example repository.

### A. The init$ Effect

Our application has a home page that displays a list of widgets retrieved from a mocked server. We have an init$ Effect that is triggered whenever the initWidgets Action is dispatched from the home page. The init$ Effect will be the focus of our tests:

```typescript
init$ = createEffect(() =>
  this.actions$.pipe(
    ofType(WidgetsActions.initWidgets),
    fetch({
      run: (action) =>
        this._widgetsService
          .all()
          .pipe(
            map((widgets: WidgetsEntity[]) =>
              WidgetsActions.loadWidgetsSuccess({ widgets })
            )
          ),
      onError: (action, error) => {
        return WidgetsActions.loadWidgetsFailure({ error });
      },
    })
  )
);
```

The `init$` Effect
If the http service successfully retrieves widgets, the init$ effect returns loadWidgetsSuccess. If the service returns an error, the effect returns loadWidgetsFailure.

### B. Setting Up the Tests

Now that we’ve created an effect, we need to set up providers and spies in the beforeEach method:

```typescript
describe('WidgetsEffects', () => {
  let actions: Observable<Action>;
  let effects: WidgetsEffects;
  let allWidgetsSpy: jest.Mock<any, any>;

  beforeEach(() => {
    allWidgetsSpy = jest.fn();

    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        WidgetsEffects,
        { provide: WidgetsDataService, useValue: { all: allWidgetsSpy } },
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(WidgetsEffects);
  });
```

We know that init$ relies on a http service to get the widgets. However, in order to keep our tests thin we’ll avoid injecting the full service into TestBed. Instead, we create a spy using jest.fn() and use that spy in a mock provider defined simply as { all: allWidgetsSpy } }.

Our providers also include provideMockActions(() => actions). This provider allows us to effectively dispatch an Action in our tests and trigger the corresponding Effect.

## 3. Testing Using Await/Async

Finally, let’s write some specs. We’ll write one test for when we expect init$ to return loadWidgetsSuccess, and a second spec for loadWidgetsFailure.

### A. The loadWidgetsSuccess Test

Here is the unit test for the init$ Effect that expects a return value of loadWidgetsSuccess:

```typescript
it('should return loadWidgetsSuccess', async () => {
  // Arrange
  const widgets = [{ id: 1, name: 'Widget 01' }];
  allWidgetsSpy.mockReturnValue(of(widgets));
  const expected = WidgetsActions.loadWidgetsSuccess({ widgets });

  // Act
  actions = of(WidgetsActions.initWidgets());

  // Await
  const result = await firstValueFrom(effects.init$);

  // Assert
  expect(allWidgetsSpy).toBeCalled();
  expect(result).toEqual(expected);
});
```

This test is divided into four steps: Arrange, Act, Await, and Assert. Let’s review each step line-by-line.

**Arrange**: On line 1 we see that the spec’s callback is an async function. Lines 3 and 4 create a mock widget, and set the spy’s return value as an Observable containing the mocked widget. Line 5 defines the expected result of the init$ Effect in this test. Here, we expect the loadWidgetsSuccess action with a payload containing our mock widgets.

**Act**: Line 8 makes use of the provideMockActions provider, setting actions to the Action that triggers the init$ Effect.

**Await**: Line 11 is where we finally see our await. We grab the result of the init$ Effect by awaiting the firstValueFrom the init$ Effect. firstValueFrom is a rxjs operator introduced in Version 7 that converts and Observable source into a Promise. Once the Observable has been converted to a Promise we can easily await the result in our test.

**Assert**: Finally, Lines 14 and 15 contain our expects validating that our spy was called and our result equals what was expected.

## B. The loadWidgetsFailure Test

For completeness’ sake, here is an example of a spec testing when the init$ method should return loadWidgetsFailure:

```typescript
it('should return loadWidgetsFailure', async () => {
  // Arrange
  const error = 'Failed to load widgets';
  allWidgetsSpy.mockReturnValue(throwError(() => error));
  const expected = WidgetsActions.loadWidgetsFailure({ error });

  // Act
  actions = of(WidgetsActions.initWidgets());

  // Await
  const result = await firstValueFrom(effects.init$);

  // Assert
  expect(allWidgetsSpy).toBeCalled();
  expect(result).toEqual(expected);
});
```

## 4. Final Thoughts

Here are two quick tips about implementing the async / await approach.

### A. Old RxJS Version

The rxjs operator [firstValueFrom](https://rxjs.dev/api/index/function/firstValueFrom) was released in [RxJS version 7](https://rxjs.dev/6-to-7-change-summary). If your project’s RxJS version is older than version 7 you’ll have to use the .toPromise() method instead. See the widgets.effects.spec in the demo repository for an example using .toPromise().

### B. Does This Approach Work With Jasmine?

Yes! Although the example repository in this post uses Jest, you can still use the async / await testing syntax if your application uses Jasmine. You’ll just need to mock providers and spies without using jest.fn().

### C. Conclusion

If you’ve made it this far thank you for reading this post! Thanks to my awesome colleague Rafael for introducing me to this testing syntax for Effects.
