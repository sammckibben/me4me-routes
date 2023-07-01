export const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  enum Frequency {
    ONCE
    DAILY
    WEEKLY
    MONTHLY
  }

  scalar DateTimeISO

  type Schedule {
      startTime: DateTimeISO
      occurance: Frequency
  }

  type Reminder {
    id: ID!
    message: String
    createdAt: DateTimeISO
    schedule: Schedule
  }

  query GetReminder($id: ID!) {
    getReminder(id: $id) {
      id
      message
    }
  }
  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    getReminder(id: ID!): Reminder
  }
`;
