---
pubDate: 2023-04-11
title: 'Unit Testing in Angular 15 Without TestBed'
description: 'Bridging the gap between constructor-based DI and inject-based DI testing without TestBed'
tags: ['angular', 'testing']
---

Angular 14 introduced the ability to use the [inject](https://angular.io/api/core/inject#inject) function in classes like components, directives, and pipes. Library authors have [embraced this feature](https://github.com/ngrx/platform/discussions/3796) and many have dropped constructor-based Dependency Injection (’DI’). It also inspired a reusable functions called [DI Functions](https://netbasal.com/unleash-the-power-of-di-functions-in-angular-2eb9f2697d66).

There are [lots of approaches using TestBed](https://dev.to/this-is-angular/testing-and-faking-angular-dependencies-p9i) that allow to you test and even mock dependencies provided by the Inject function.

However, what if you don’t want to use TestBed? Maybe because of [performance concerns](https://dev.to/angular/unit-testing-in-angular-to-testbed-or-not-to-testbed-3g3b), maybe you prefer [isolating](https://martinfowler.com/articles/practical-test-pyramid.html#SociableAndSolitary) unit tests from the DOM by default, or maybe you’ve noticed that Angular is [introducing utilities](https://github.com/angular/angular/pull/49396/files) to make it easier to run functions in an injection context with providers.

**tl;dr:**

- run `npm i @ngx-unit-test/inject-mocks -D` to install utility functions to unit test any Angular class or function without TestBed.

There are [simple approaches](https://gist.github.com/edezekiel/4b4865cba619e20c86a399e91fbff98c) to mocking providers using constructor-based DI without TestBed but no clear guide bridging the gap between constructor-based DI and inject-based DI testing without TestBed.

This article (1) summarizes a Component that needs Unit Testing, (2) demonstrates how to test that Component in Angular 15+ without TestBed, and (3) shows how to test a DI Function without TestBed.

## 1. The Setup: A Component That Needs Unit Testing

Here is a simple HomeComponent written in Angular 15 that uses the inject function:

```typescript
import { Component, inject, OnInit } from '@angular/core';
import { WidgetsFacade } from '@ngx-demo/widgets/data-access';

@Component({
  selector: 'ngx-demo-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private readonly _widgetsFacade: WidgetsFacade = inject(WidgetsFacade);

  loaded$ = this._widgetsFacade.loaded$;
  widgets$ = this._widgetsFacade.allWidgets$;

  ngOnInit() {
    this._widgetsFacade.init();
  }
}
```

The component injects a WidgetsFacade, accesses some observables exposed by that facade, and triggers a facade method during `ngOnInit`.

## 2. Providing Mock Dependencies

So, how could you mock the injected WidgetsFacade without using TestBed?

If you just run the spec without TestBed you get this error:

![Error NG0203 thrown when testing a Component without providing dependencies](..//2023-04-11-injection-context-error.png)

In order to provide the service and mock its functions there are two steps:

First, create a utility method that wraps the `@angular/core` Injector:

```typescript

import { Type, StaticProvider, Injector } from '@angular/core';

export const classWithProviders = <T>(config: {
  token: Type<T>;
  providers: StaticProvider[];
}): T => {
  const { providers, token } = config;
  const injector = Injector.create({
    providers: [...providers, { provide: token }],
  });
  return injector.get(token);
};
```

This utility leverages Angular’s built-in `Injector` class to automatically provide dependencies to a given class. You may notice the name is `classWithProviders` and not `componentWithProviders`. That is because the utility works with Components, Services, Directives, and Pipes!

Second, use `classWithProviders` in a spec file:

```typescript
import { WidgetsFacade } from '@ngx-demo/widgets/data-access';
import { classWithProviders } from './class-with-providers.util';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let facadeMock: Partial<WidgetsFacade>; // 1. Partial<T> for type safety

  beforeEach(() => {
    facadeMock = { init: jest.fn() }; // 2. Assign mock object
    component = classWithProviders({ // 3. Get Component with mocked dependencies
      token: HomeComponent,
      providers: [{ provide: WidgetsFacade, useValue: facadeMock }],
    });
  });

  it('component should create', () => {
    expect(component).toBeTruthy();
  });
  it('ngOnInit() should invoke facade.init', () => {
    component.ngOnInit();
    expect(facadeMock.init).toBeCalled();
  });
});
```

Let’s walk through each step in the spec file:

1. **Declare a variable** `facadeMock` typed as `Partial<WidgetsFacade>`. Use Partial to get type inference in the next step.
1. **Assign mock object**: create a JavaScript object and assign `jest.fn()` to the method you need to mock.
1. **Get Component with Injection Context**: Thanks to the `classWithProviders` util, the returned component has the mocked provider!

![FacadeMock is provided to HomeComponent as the WidgetsFacade](..//2023-04-11-widgets-facade.png)

## 3. Testing DI Functions Without TestBed

One limitation of `classWithProviders` is that it does not work with Dependency Injection Functions (DI Functions). The current solution for [testing DI Functions](https://netbasal.com/testing-di-functions-in-angular-37a5e7ed75f9) involves `TestBed.runInInjectionContext`, which was released in [Angular 15.1.0](https://github.com/angular/angular/blob/main/CHANGELOG.md#1510-2023-01-10).

Building on TestBed’s example, it is possible to create a standalone utility that provides a similar solution for testing DI Functions with mocked providers:

```typescript
import { HttpClient } from '@angular/common/http';
import {
  createEnvironmentInjector,
  EnvironmentInjector,
  inject,
  Injector,
  Provider
} from '@angular/core';

const getPerson = (id: number) => {
  return inject(HttpClient).get(`https://swapi.dev/api/people/${id}/`);
};

const runFnInContext = (providers: Provider[]) => {
  const injector = createEnvironmentInjector(
    providers,
    Injector.create({ providers: [] }) as EnvironmentInjector
  );
  return injector.runInContext.bind(injector);
};

describe('getPerson()', () => {
  it('should invoke HttpClient.get', () => {
    // Arrange
    const id = 1;
    const httpMock: Partial<HttpClient> = { get: jest.fn() };
    const providers = [{ provide: HttpClient, useValue: httpMock }];
    // Act
    runFnInContext(providers)(() => getPerson(id));
    // Assert
    expect(httpMock.get).toBeCalled();
    expect(httpMock.get).toBeCalledWith(`https://swapi.dev/api/people/${id}/`);
  });
});
```

In fact, the Angular team is already working on a new runInInjectionContext [utility](https://github.com/angular/angular/pull/49396/files) that replaces and extends the runInContext method.

## Conclusion

The `classWithProviders` and `runFnInContext` utilities were inspired by code from the Angular.io [source code](https://angular.io/). I’ve taken the extra step of bundling these utilities into an [npm package](https://www.npmjs.com/package/@ngx-unit-test/inject-mocks). Thanks to [Josh Van Allen](https://twitter.com/JVAsays) and [Rafael Mestre](https://twitter.com/mestre_dev) for their insight and help developing these utilities.
