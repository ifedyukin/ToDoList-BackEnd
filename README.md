# ToDoList Backend
Simple server for ToDoList applications.

## Requirements
* Git;
* MongoDB;
* NodeJS, npm.

## Run server
* Run `mongod`
* Install and run server
```bash
git clone https://github.com/ifedyukin/ToDoList-BackEnd
cd ToDoList-BackEnd
npm install
npm start
```

## Item schema
* `value` - String item description;
* `isCompleted` - Boolean mark of item status.

## Support filters
* all - all items;
* active - all not completed items;
* completed - all completed items.

## API
| Request Type | URL | Description |
| ------------- | ------------- | ------------- |
| GET | `/:filter` | Return filtered array of items. |
| POST | `/` | Send `value` parameter to create item. Return new item. |
| PATCH | `/:id` | Send `{ value, isCompleted }` object to update item by `id`. Return updated item. |
| DELETE | `/:id` | Delete object by `id`. Return `true` in success case. |
| PUT | `/complete/:filter` | Mark all items as copleted. Return filtered array of items. |
| PUT | `/clean/:filter` | Remove all completed items. Return filtered array of items. |
