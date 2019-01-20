# Notes - `@balnc/notes`

With notes module simple but rich notepads can be created. Notepads are a collection of lines and every line is a document!

````json
// Example of line doc
{
  "_id": "...",
  "_rev": "...",
  "pad": "group01/pad01",
  "type": "TEXT",
  "sort": 0.1,
  "text": "lorem ipsum",
  "editorNow": "user01",
  "editorLast": "user01",
  "createdAt": "user01",
  "editedAt": "user01",
}
````

## Main features

- Every line is a doc
- Every note can be edited from multiple users
- Tree of notepads