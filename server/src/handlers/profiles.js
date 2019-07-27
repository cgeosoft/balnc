import { authUser, cors, createDBs, removeDBs } from "../commons/service";

export async function handler(event, context) {

  const user = await authUser(event)

  switch (event.httpMethod) {
    case "OPTIONS":
      return cors(event)
    case "GET":
      return {
        statusCode: 200,
        body: JSON.stringify({
          user: user.name,
          profiles: user.roles
        })
      }
    case "POST":
      const createBody = JSON.parse(event.body)
      return await createDBs(user.name, createBody.name)
    case "DELETE":
      if (!event.queryStringParameters.key) throw new Error("A profile key should be provided")
      return await removeDBs(user.name, event.queryStringParameters.key)
    default:
      throw new Error(`method ${event.httpMethod} not handled`)
  }
};