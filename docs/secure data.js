let chatrooms = {
    random_guid: {
        key: "94915693-12f1-4853-b070-03aadf59553d",
        name: "chatroom-name",
        alias: "chatroom-name",
        public: "rsa-public-key",
        admin: {
            key: "abda89ac-d75e-4da6-8da9-647d6a3e515d",
            name: "john doe",
        },
        members: [{
                key: "ae7f8c0f-7b0f-459e-b3a8-4d11e642abdd",
                public: "member-rsa-public-key",
            },
            {
                key: "cf4e4029-672d-45e2-89c1-6e1a6c4db0d3",
                public: "member-rsa-public-key",
            },
            {
                key: "f4b59879-e9ff-46b5-bd2b-d7d93a39d2ce",
                public: "member-rsa-public-key",
            },
        ]
    },
}

// every body-data is encrypted per member key
let sample_chatroom = {
    _meta: {
        "ae7f8c0f-7b0f-459e-b3a8-4d11e642abdd": {
            members: [{
                    key: "ae7f8c0f-7b0f-459e-b3a8-4d11e642abdd",
                    name: "user1",
                },
                {
                    key: "cf4e4029-672d-45e2-89c1-6e1a6c4db0d3",
                    name: "user2",
                },
                {
                    key: "f4b59879-e9ff-46b5-bd2b-d7d93a39d2ce",
                    name: "user3",
                }
            ]
        },
        "cf4e4029-672d-45e2-89c1-6e1a6c4db0d3": {
            members: [{
                    key: "ae7f8c0f-7b0f-459e-b3a8-4d11e642abdd",
                    name: "user1",
                },
                {
                    key: "cf4e4029-672d-45e2-89c1-6e1a6c4db0d3",
                    name: "user2",
                },
                {
                    key: "f4b59879-e9ff-46b5-bd2b-d7d93a39d2ce",
                    name: "user3",
                }
            ]
        }
        // note that user f4b59879-e9ff-46b5-bd2b-d7d93a39d2ce is not yet added
    },
    //all docs are messages
    "b98de7c9-4bbb-42fe-a406-4e44ad147dcf": {
        "ae7f8c0f-7b0f-459e-b3a8-4d11e642abdd": {
            datetime: "2017-05-05T21:11:36Z",
            sender: "ae7f8c0f-7b0f-459e-b3a8-4d11e642abdd",
            message: "lorem ipsum dolor"
        },
        "cf4e4029-672d-45e2-89c1-6e1a6c4db0d3": {
            datetime: "2017-05-05T21:11:36Z",
            sender: "ae7f8c0f-7b0f-459e-b3a8-4d11e642abdd",
            message: "lorem ipsum dolor"
        }
    },
    "f4e4c633-07a5-4a59-b7a0-224ed30d569b": {
        //...
    },
    "c9c7050a-92e8-4668-8003-3d2538573401": {
        //...
    },
    "09087c69-64fe-4f83-83df-b71608a36c29": {
        //...
    },
    "d2fa354e-dd2c-4d1e-824e-6eb764acfa28": {
        //...
    },
}