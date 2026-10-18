---
pubDate: 2022-10-26
title: 'Taking Async Validators into Hyperdrive'
description: 'How to save your galaxy from unhelpful forms'
tags: ['ngrx', 'angular']
---

We love forms at HeroDevs. What do we love more than forms? StarWars. This post is about both. Specifically, how to use forkJoin in an AsyncValidator for complex inputs in your quest to save the galaxy from unhelpful forms.

tldr;
- [Stackblitz](https://stackblitz.com/github/edezekiel/RebellionMissionPlanner?file=README.md)
- [GitHub Repository](https://github.com/edezekiel/RebellionMissionPlanner)

### Rebellion Mission Planner

Let’s say you’re a scrappy Rebel leader organizing a mission to raid supplies from the Empire. Wouldn’t it be nice if you could easily confirm that your team includes a qualified pilot? Well, here’s an application that does just that: [Rebellion Mission Planner](https://stackblitz.com/github/edezekiel/RebellionMissionPlanner?file=README.md).

![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbThiczlvZm80eXdzeHlvdWtia3JjMjhnYm53YjlpazJ6Z2g1NDE0aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/nnCfYHa2wu3bpruXxH/giphy.gif)

### Mission Editor Form

The Mission Editor Form and StarWarsApi (SWAPI)
This application is a form with inputs for planning a mission. You enter the weight of the expected heist and select your rockstar team of Rebels. The ‘backend’ for this application is https://swapi.dev/.

On page load, the container component fetches all of the `/people/` from SWAPI. Next, the container creates the `missionEditor` form with an asynchronous validator `checkForQualifiedPilots`. More on that validator in a moment. Finally, each select menu is populated with people (Rebels) and the form is rendered.

### The Validator

The MissionEditorForm is built with an `AsyncValidator` that checks whether the selected pilot knows how to fly a starship capable of hauling the heist’s objective (cargo).

```typescript
  checkForQualifiedPilot(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const { cargo, rebels } = control.value;
      if (!(cargo && rebels && rebels.length)) return of(null);

      const starshipUrls = this._getStarshipUrls(rebels);

      if (!(starshipUrls.length > 0)) {
        return of({ experiencedPilotRequired: this._cargoPilotError() });
      }

      return timer(500).pipe(
        switchMap(() =>
          forkJoin(
            starshipUrls.map((url) => this._starWarsApiService.getStarship(url))
          ).pipe(
            map((results) => {
              const maxCargo = this._getMaxCargo(results);
              return maxCargo < cargo
                ? { experiencedPilotRequired: this._cargoPilotError(maxCargo) }
                : null;
            })
          )
        )
      );
    };
  }
```

As you select your team of Rebels and edit the cargo field, the checkForQualifiedPilot async validator forkJoins an array of http requests to retrieve starships. The requests are debounced thanks to the timer. Instead of requesting starships on every keystroke, the validator waits 500 milliseconds before making another request.

Given the starship data and cargo input, the validator determines whether you have a qualified pilot. If so, congratulations! You’re ready to dispatch your Rebels and carry out the heist.

### Conclusion

`forkJoin` is just one of a variety of [higher-order observables](https://blogs.msmvps.com/deborahk/higher-order-observable/) that could be used in an async validator for all kinds of use cases. I hope you enjoyed this article and good luck on your next mission!

### Resources

Here are some articles I found helpful in writing this post:

- [Powering up your forms with Custom Validators](https://blog.herodevs.com/powering-up-your-forms-with-custom-validators-f44e544d9f0) by Andres Villanueva
- [How to write async form validators with Angular?](https://blog.angulartraining.com/how-to-write-async-form-validators-with-angular-df99d016066c) by Alain Chautard
- [Angular: Custom Async Validators](https://medium.com/@rinciarijoc/angular-custom-async-validators-13a648d688d8) by Jon Rinciari
- [Angular Cross Field Validation](https://medium.com/@realTomaszKula/angular-cross-field-validation-d94e0d063b61) by Tomasz Kula
