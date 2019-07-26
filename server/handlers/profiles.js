import { cors, createDBs, getUser, removeDBs } from "../service";

export async function handler(event, context) {
  if (event.httpMethod === 'OPTIONS') {
    return cors(event)
  }

  const body = JSON.parse(event.body)
  const user = await getUser(body.username, body.password)

  switch (event.httpMethod) {
    case "POST":
      return await createDBs(user.name)
      break;
    case "DELETE":
      return await removeDBs(user.name, body.prefix)
      break;
  }
};