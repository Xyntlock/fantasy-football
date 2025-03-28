import { type ClientSchema, a, defineData } from '@aws-amplify/backend'
import { initSquad } from '../functions/init-squad/resource'
import { updatePlayers } from '../jobs/update-players/resource'

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a
  .schema({
    Squads: a
      .model({
        pk: a.string().required(), // player#playerId or userid#userId-squad#squadId or userid#userId-squad#squadId-player#playerId

        // squad & player shared fields
        name: a.string(),

        // squad player & player shared fields
        position: a.string(), // Goalkeeper, Defender, Midfielder or Attacker for player entry. gk, lcb, rcb etc. for squad player entry

        // player fields
        firstName: a.string(),
        lastName: a.string(),
        age: a.integer(),
        nationality: a.string(),
        height: a.string(),
        weight: a.string(),
        photo: a.url(),
        statistics: a.json(),
        price: a.float(),

        // squad fields
        wins: a.integer().default(0),
        losses: a.integer().default(0),
        draws: a.integer().default(0),
      })
      .identifier(['pk'])
      .authorization((allow) => [allow.publicApiKey()]),

    initSquad: a
      .mutation()
      .authorization((allow) => [allow.publicApiKey()])
      .returns(a.json())
      .handler(a.handler.function(initSquad)),

    updatePlayers: a
      .mutation()
      .authorization((allow) => [allow.publicApiKey()])
      .returns(a.boolean())
      .handler(a.handler.function(updatePlayers)),
  })
  .authorization((allow) => [
    allow.resource(initSquad).to(['mutate', 'query']),
    allow.resource(updatePlayers).to(['mutate', 'query']),
  ])

export type Schema = ClientSchema<typeof schema>

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
})

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
