# Lost and Found
This website was created to aid in search and recovery for lost items during Hack Club Events.

## How to use?
Set `AIRTABLE_BASE_ID` and `AIRTABLE_API_KEY` as environment variables (locally, create an `.env.local` file). Then run `npm run dev` to start the server.

Your Airtable needs to following columns:
- item (short text)
- picture (attachment)
- claimed (checkbox)
- name (short text)
- address (long text)
- paid (checkbox)
- shipped (checkbox)

This web app is built using Next.js and Tailwind CSS.

&copy; 2023 Sarthak Mohanty. Licensed under the [MIT License](LICENSE).
