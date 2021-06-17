# Workflow Engine API

This repo is a workflow engine API implementation using Express.js and MongoDB


# Examples of requests

## (dev) List all machines

`GET /api/machine`

Response: `[{machine1}, {machine2}, ....]`


## Send change

`POST /api/machine/{id}/change`

Request body:

```json
{
  "fields": [
    {
      "fieldName": "stayingTime",
      "newValue": 61
    }
  ]
}
```

## Get current state

`GET /api/machine/{id}/state`

Response:

```json
{
    "id": 1,
    "name": "RUNNING"
}
```


## Send event

`POST /api/machine/{id}/event`

Request json-body:

```json
{
    "name": "HUNTER"
}
```

## Create machine
`POST /api/machine/{id}`:

Request json-body:

```json
{
    "availableStates": [
        {
            "id": 0,
            "name": "STAYING"
        },
        {
            "id": 1,
            "name": "RUNNING"
        }
    ],
    "availableTransitions": [
        {
            "previous": {
                "id": 0,
                "name": "STAYING"
            },
            "next": {
                "id": 1,
                "name": "RUNNING"
            }
        },
        {
            "previous": {
                "id": 1,
                "name": "RUNNING"
            },
            "next": {
                "id": 0,
                "name": "STAYING"
            }
        }
    ],
    "conditionalTriggers": [
        {
            "fieldName": "stayingTime",
            "conditionOperator": ">",
            "compareTo": 60,
            "nextStateId": 1
        }
    ],
    "eventTriggers": [
        {
            "name": "TIGER",
            "nextStateId": 1
        },
        {
            "name": "HUNTER",
            "nextStateId": 0
        }
    ],
    "object": {
        "fields": [
            {
                "name": "stayingTime",
                "type": "int",
                "value": 30
            }
        ]
    },
    "initialStateId": 0
}
```
