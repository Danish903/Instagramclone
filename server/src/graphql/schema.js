export default `
    scalar Date

    type Auth {
        token: String!
    }

    type Photo {
        _id: ID!
        image_url: String
        caption: String
        user: User
        photoLikes: Int
        isLiked: Boolean
    }

    type User {
        _id: ID!
        username: String
        email: String!
        first_name: String
        last_name: String
        avatar: String
        createdAt: Date!
        updatedAt: Date!
    }

    type Query {
        getPhotos: [Photo]
        getPhoto(_id: ID!): Photo
        getUserPost: [Photo]
        me: User
    }
    type Mutation {
        signup(email: String!, fullName: String!, password: String!, avatar: String, username: String): Auth
        login(email: String!, password: String!): Auth
        signin(token: String!): Auth
        createPost(image_url: String!, caption: String): Photo
        photoLikes(_id: ID!): Photo
    }
    type Subscription {
        photoLikes: Photo
    }
    schema {
        query: Query
        mutation: Mutation
    }

`;
