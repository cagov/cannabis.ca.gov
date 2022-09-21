
import { test, expect } from "@playwright/test";

test("/", async ({ page }) => {
  await page.goto("/");
  // console.log();
  // return true;
});

// test.describe.serial("linkCheck", () => {



// });


// const slugs = [
//   "",
//   "applicants/how-to-apply-renew",
//   "applicants/license-types",
//   "applicants/application-license-fees",
//   "applicants/equity-fee-waivers/apply-for-an-equity-fee-waiver",
//   "404"
// ];

// class Link {
//   constructor(url, slug, list) {
//     this.url = url;
//     this.slug = slug;
//     this.status = "";
//     this.list = list;
//   }
//   validateURL = () => {
//     const url = this.url;
//     const list = this.list.items;

//     if (
//       url.includes("#") ||
//       url.includes("ca.gov") ||
//       url.includes("tel:") ||
//       url.includes("http") ||
//       list.includes(url)
//     ) {
//       this.status = null;
//     } else {
//       list.push(url);
//       this.status = "check it";
//     }
//     return this.status;
//   };
// }

// class Entry {
//   constructor(slug) {
//     this.page = `${slug}/`;
//   }
// }

// class List {
//   constructor() {
//     this.items = [];
//   }
// }

// test.describe.serial("linkCheck", () => {
//   console.log("running link check");
//   const list = new List();

//   slugs.forEach((slug) => {
//     const entry = new Entry(slug);

//     test(slug, async ({ page }) => {
//       console.log(page);
//       await page.goto("/");

//       const onPageLinks = page.locator("a >> visible=true");
//       const count = await onPageLinks.count();

//       for (let i = 1; i < count; ++i) {
//         const url = await onPageLinks.nth(i).getAttribute("href");

//         const linkToTry = new Link(url, slug, list);

//         if (linkToTry.validateURL() == "check it") {
//           const response = await page.request.get(url);

//           if (!response.ok()) {
//             console.log("----" + slug);
//             console.log("----------------------------------");

//             const message = `${response.status()} - ${response.statusText()} - ${url}`;
//             const color = response.ok()
//               ? "\x1b[36m%s\x1b[0m"
//               : "\x1b[35m%s\x1b[0m";
//             console.log(color, message.toString());
//           }
//         }
//       }
//     });
//   });
// });
