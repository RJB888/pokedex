# Pokedex

- List all the pokémon (151)
- Detail for one pokémon
- Filter by type
- Display an image of each monster
- Stretch:
  - Filter by evolutionary stage
  - Filter by location

## Landing Page

- Some kind of form (one search bar to search by name) for the user to use to search our database of pokémon information
- Sidebar
  - List all the types and when a type is clicked, show all the pokémon of that type
- A table for the search output
- Nav bar at the top:
  - About page
  - Home Page
  - All the mons
- One row per character in our table, with their ID, picture, name, and types
- Stretch goal:
  - Pagination

## Filling the database

- When a user accesses our site for the first time, a request is sent to our server that will itself send a request to the pokémon API and attempt to fill our database with data.

## Live Search

- As the user types into the search bar, filter down the listing of characters to include only those that have my search string in their name.
- Attach an event handler to my search bar
- The event I want to handle is probably the "keypress" event
- When a key is pressed, search through my array of pokémon for only those that have the current string in my search bar as a part of their name.
  - Retrieve all pokémon characters from the database
  - Store them in an array
  - Store them as objects with properties in my array.

## Ordering the list

- We want the list of characters to be ordered by ID.
- Before we render the table rows, sort the array of characters by their IDs

## Add colors to our pokemon types

- need to convert the individual "types" into some sort of HTML element that can be styled
- need to harvest (i.e. steal) all the colors from the existing pokedex site
- add those colors to CSS

## Style the table

- Increase the font size of the pokemon names -- done
- Capitalize all the pokemon names -- done
- Border on the table -- done
- Make id numbers have background of pokeball, and change their font to be readable and more childish
- Border around each row
- More readable input field
  - font size Increase
- background color on the table row
- add column headings
