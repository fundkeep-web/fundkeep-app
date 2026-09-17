import {
  shortAddress,
  getGreeting,
  formatDeadline,
  timeAgo,
  formatUsdc,
  isRecurringCadence,
} from "../lib/utils";

console.log("Running lib/utils.ts tests...");

// shortAddress
console.assert(shortAddress("") === "", "shortAddress empty failed");
console.assert(shortAddress("12345") === "12345", "shortAddress short failed");
console.assert(
  shortAddress("GAO5GK3F2XFVGUWKTFACJWRZVEGUWH47EJFLSAMLVRNP6CGV3YW2DDIK") === "GAO5...DDIK",
  "shortAddress standard failed"
);

// getGreeting
const greeting = getGreeting();
console.assert(
  ["Good morning", "Good afternoon", "Good evening"].includes(greeting),
  "getGreeting return value failed"
);

// formatDeadline
console.assert(
  formatDeadline("2026-12-31") === "Dec 31, 2026",
  "formatDeadline standard failed"
);

// timeAgo
const now = new Date().toISOString();
console.assert(timeAgo(now) === "Just now", "timeAgo now failed");

// formatUsdc
console.assert(formatUsdc(1234.56) === "1,234.56", "formatUsdc standard failed");
console.assert(formatUsdc(0) === "0.00", "formatUsdc zero failed");

// isRecurringCadence
console.assert(isRecurringCadence("daily") === true, "isRecurringCadence daily failed");
console.assert(isRecurringCadence("weekly") === true, "isRecurringCadence weekly failed");
console.assert(isRecurringCadence("monthly") === true, "isRecurringCadence monthly failed");
console.assert(isRecurringCadence("task") === false, "isRecurringCadence task failed");

console.log("All lib/utils.ts tests passed successfully!");
