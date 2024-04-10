---
pubDate: 2023-02-08
title: 'Web Fundamentals: Avoid These JavaScript Date Object Pitfalls'
description: 'Date quirks and modern alternatives to squash them'
tags: ['javascript', 'typescript']
---

The JavaScript `Date` object is notoriously broken. Until it is replaced with a [modern alternative](https://tc39.es/proposal-temporal/docs/), frontend developers have to deal with its quirks. This post explains two quirks that every frontend developer should know **even if** you are using `TypeScript` and a date utility library like `date-fns`, `zod`, or`Day.js`.

**tldr;**

- `new Date(null)` returns the Unix epoch `1970-01-01T00:00:00.000Z`;
- When parsing a value to a date, consider manually checking whether `value === null` before passing the value to library like `date-fns` or `zod`
- Here is a [repo](https://github.com/edezekiel/safe-date-parse) with safe parse examples in (i) plain TypeScript, (ii) date-fns, and (iii) zod
- Avoid one gotcha when using zod to parse ISO 8601 Date strings

## 1. new Date(null) Unexpectedly Returns a Valid Date

In JavaScript, creating a Date by passing null to the constructor generates the Unix epoch zoned to your local timezone:

```javascript
new Date(null);
// Wed Dec 31 1969 18:00:00 GMT-0600
```

This result is unexpected and could easily cause frontend bugs. By definition, `null` means a value that is empty or doesn’t exist. If an api returns `{ lastModified: null }`, I’d bet that no backend developer expects the client to set lastModified to the Unix epoch.

Here’s one way this bug can sneak into your code: let’s say you’re using a date utility library like `date-fns` and you’re trying to ensure that something is a valid date. The `new Date(null)` issue would still slip through the cracks because `new Date(null)` returns a **valid date**:

```javascript
import { isValid } from 'date-fns';

const data = { lastModified: null };

isValid(new Date(data.lastModified)) // true??
```

You might think to yourself, “I’m not worried about this because I use TypeScript!” And to an extent you’d be right. If you’re using TypeScript with *“strict” set to true* you’ll get a compilation error when creating a date with `new Date(null)`.

```javascript
/* tsconfig.json
  "compilerOptions": {
    "strict": true
  }
*/
const date = new Date(null);
```

However, there’s *still* a lingering problem. Because `new Date(null)` returns a valid date, libraries like zod coerce it to a Date even if your project uses TypeScript:

```javascript
z.coerce.date().safeParse(null);
/*
  {
    success: true,
    date: '1970-01-01T00:00:00.000Z
  }
*/
```

### i. The Solution

So what is a frontend developer to do?

One solution is to filter null values before they get to date utilities. Here’s an example that wraps zod’s parsing method and filters null and undefined:

```typescript
export const zodSaferDateParse = (
  value: string | number | null | Date | undefined
): Date | undefined => {
  if (value === null || value === undefined) {
    return undefined;
  }

  const maybeDate = value instanceof Date
    ? z.date().safeParse(value)
    : z.coerce.date().safeParse(value);

  return maybeDate.success
    ? maybeDate.data
    : undefined;
}
```

This is a [repository](https://github.com/edezekiel/safe-date-parse) I created with similar date parsing examples using plain `TypeScript` and `date-fns`. The repo also includes a Jest test suite if you want to check your own date parse methods.

### 2. Bonus: Watch Out For ‘YYYY-MM-DD’ Date Strings When Using Zod

Below is a short example showing one ‘gotcha’ when using zod to parse date strings:

```javascript
// 2023-01-01T00:00:00.000Z // NOT zoned
new Date('2023-01-01');
z.coerce.date().safeParse('2023-01-01'); // zod

// 2023-01-01T06:00:00.000Z // zoned to local timezone
parseISO('2023-01-01'); // date-fns
new Date('2023/01/01');
```

The gotcha is that, unlike the date-fns `parseISO` method, zod does not automatically parse ISO Dates to local timezones.

The ECMAScript standard for parsing ISO 8601 Date strings (’2023-01-01’) is flawed:

- The ECMAScript standard provides that such strings default to UTC.
- However, the actual ISO 8601 standard specifies that absent a timezone such strings should default to local timezone.

Why does ECMAScript work this way? The t39 committee’s [original specification was flawed](https://maggiepint.com/2017/04/11/fixing-javascript-date-web-compatibility-and-reality/) and they couldn’t revise it before it became a ‘Web Reality’.

This issue is [well known](https://css-tricks.com/everything-you-need-to-know-about-date-in-javascript/) and date utility libraries like `date-fns` provide utility methods that automatically parse ISO Date strings to your local timezone. If you’re used to this convenience from your date utility library, just be warned that zod does not currently take care of this for you.

Finally, here is a cheat sheet for Date strings in JavaScript:

```javascript
// ISO 8601 without time: defaults to midnight UTC time
const withHyphen = new Date('2023-01-01') // Sat Dec 31 2022 18:00:00 GMT-0600 (Central Standard Time)
withHyphens.getTime() // 1672531200000

// ISO 8601 set to UTC timezone (same as not providing time)
const noOffset = new Date('2023-01-01T00:00:00.000Z') // Sat Dec 31 2022 18:00:00 GMT-0600 (Central Standard Time)
noOffset.getTime() // 1672531200000

// ISO 8601 set to Local Timezone
const withLocalOffset = new Date('2023-01-01T06:00:00.000Z') // Sun Jan 01 2023 00:00:00 GMT-0600 (Central Standard Time)
withHyphens.getTime() // 1672552800000

// Well Recognized String Format - Defaults to Local Timezone
const withSlashes = new Date('2023/01/01') // Sun Jan 01 2023 00:00:00 GMT-0600 (Central Standard Time)
withSlashes.getTime() // 1672552800000

// Number Arguments - Defaults to Local Timezone
const withArgs = new Date(2023, 0, 1) // Sun Jan 01 2023 00:00:00 GMT-0600 (Central Standard Time)
withArgs.getTime() // 1672552800000
```

## Conclusion

Thank you for reading my post about Dates in JavaScript. To recap, watch out for null constructor values when dealing with Dates and pay special attention to date strings in this format: ‘YYYY-MM-DD’. Date utility libraries and schema validators are excellent tools, but there are still rough edges that warrant special attention.
