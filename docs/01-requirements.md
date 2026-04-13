# Requirements

## Problem Statement
Remote professionals frequently need to schedule meetings with participants spread across multiple time zones. Mentally converting times is error-prone, especially with daylight saving transitions, and existing tools are often heavyweight or require account creation. Users need a fast, stateless web tool that lets them pick a meeting time in one city and instantly see what that time looks like in up to 10 other cities — with a clear visual signal of whether the time is reasonable for everyone.

## Target Outcomes
- O1: Users can assess meeting time feasibility across multiple time zones in under 30 seconds.
- O2: Zero friction — no sign-up, no downloads, works on any modern browser (desktop or mobile).
- O3: Shareable results — users can send a link encoding their time comparison to colleagues.

## Scope
### In scope
- S1: City autocomplete search for location selection.
- S2: Date-and-time picker for specifying the proposed meeting time.
- S3: Support for 1 "home" location + up to 10 additional comparison locations.
- S4: Color-coded time cards (green / yellow / red) indicating business-hours suitability.
- S5: Auto-detection of user's current location/timezone via browser geolocation or IP.
- S6: Shareable URL with meeting details encoded (stateless — no server storage).
- S7: Mobile-responsive layout.
- S8: DST-aware time zone conversions.

### Out of scope
- OS1: User accounts, authentication, or server-side data persistence.
- OS2: Calendar integration (Google Calendar, Outlook, iCal, etc.).
- OS3: Meeting invitations, email, or notification features.
- OS4: Native mobile apps (iOS / Android).
- OS5: Historical time zone conversions (past dates before current IANA tz data).

## Functional Requirements

### FR1: Location selection (autocomplete)
- User types a city name and sees matching suggestions in a dropdown.
- Suggestions include city name and country for disambiguation (e.g., "Portland, US" vs "Portland, AU").
- Selecting a suggestion populates the location and resolves its IANA time zone.

### FR2: Auto-detect user location
- On first load, the app attempts to detect the user's current city/timezone using browser geolocation or IP-based lookup.
- If detection succeeds, the "home" location is pre-filled (user can override).
- If detection fails or is denied, the home location field remains empty with no error — the user picks manually.

### FR3: Meeting time input
- User selects a date and time via a combined date-and-time picker.
- Default value: today's date, next nearest half-hour.
- Time is interpreted in the home location's time zone.

### FR4: Add comparison locations
- User can add up to 10 additional locations using the same autocomplete control (FR1).
- Each added location appears as a card showing the converted local time.
- User can remove any added location.

### FR5: Color-coded time cards
- Each location card displays the converted meeting time with a color-coded background:
  - **Green**: time falls within 08:00–18:00 local (business hours).
  - **Yellow**: time falls within 06:00–08:00 or 18:00–22:00 local (early/late but possibly acceptable).
  - **Red**: time falls within 22:00–06:00 local (overnight — likely unreasonable).
- Cards also display the city name, country, and UTC offset.

### FR6: Shareable URL
- A "Share" button generates a URL encoding the home location, meeting date/time, and all comparison locations.
- Opening the URL reconstructs the full comparison view without any server round-trip.
- URL parameters should be human-readable where practical.

### FR7: Real-time updates
- Changing the meeting time or adding/removing locations updates all cards immediately (no page reload or submit button).

## Non-Functional Requirements
- NFR1 (security): All user input (city names) must be sanitized before rendering to prevent XSS. No data is sent to a server for storage.
- NFR2 (reliability): Time zone conversions must correctly handle DST transitions using the IANA tz database. The app should function fully offline after initial load (if no external API is required).
- NFR3 (performance): Initial page load under 3 seconds on a 4G connection. Time conversion updates must feel instant (< 100ms).
- NFR4 (usability): The UI must be usable on screens as small as 320px wide. Color coding must be supplemented with text labels for accessibility (color-blind users).
- NFR5 (accessibility): Minimum WCAG 2.1 AA compliance for contrast ratios and keyboard navigation.

## Acceptance Criteria (testable)

### Location & Time Input
- AC1: Given the app loads, when the browser provides geolocation, then the home location is auto-filled with the detected city and timezone.
- AC2: Given the user types "Lon" in the city field, then a dropdown appears with suggestions including "London, GB" within 300ms.
- AC3: Given the user selects a city from autocomplete, then the IANA timezone is resolved and displayed (e.g., "Europe/London").

### Time Comparison
- AC4: Given a home location of "New York" at 2026-03-15 14:00, when "London" is added, then the London card shows 18:00 (GMT) on the same date.
- AC5: Given a home location of "New York" at 2026-03-15 14:00, when "Tokyo" is added, then the Tokyo card shows 03:00 on 2026-03-16 (next day) with a red background.
- AC6: Given 10 comparison locations are added, when the user tries to add an 11th, then the add control is disabled with a message indicating the limit.

### Color Coding
- AC7: A card showing a local time of 10:00 displays a green background.
- AC8: A card showing a local time of 07:00 displays a yellow background.
- AC9: A card showing a local time of 23:00 displays a red background.

### Sharing
- AC10: Given a configured comparison, when the user clicks "Share," then a URL is generated and copied to clipboard.
- AC11: Given a valid share URL is opened in a new browser, then the full comparison (home, time, all locations) is reconstructed.

### Responsiveness
- AC12: Given a 320px-wide viewport, then all cards stack vertically and remain fully readable.

### DST Handling
- AC13: Given a meeting on 2026-03-08 (US spring-forward), when comparing "New York" to "London" (which has not yet changed clocks), then the offset is correctly shown as 5 hours (not the usual 5 during EST or 4 during EDT overlap).

## Open Questions
- Q1: Which city/timezone data source to use — bundled dataset (e.g., from the IANA tz database) or a third-party API? To be decided during architecture phase.
- Q2: Should the shareable URL support a "suggested meeting title" field, or keep it strictly time/location only?
- Q3: Should the app support 12-hour and 24-hour time format preferences?