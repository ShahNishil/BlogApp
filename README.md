### BlogApp
This app involves the backend for a blog platform that supports a community of users. On this platform, users can share their insights by creating blog posts, each potentially associated with a variety of tags to categorize the content. It's important that the system allows for many users who can each contribute any number of posts, and each post can be linked with one or more tags. Likewise, tags can be connected to numerous posts, creating an interactive mesh of topics.

### Installation
1. Clone the repository: git clone https://github.com/yourusername/yourproject.git
2. Install dependencies: npm install
3. Execute Sql Script(blogDb.sql) in your MySql Server or GUI like MySql Workbench
4. Configure environment variables: set environment variable in dotenv(.env) file appropriately like :- user, password, database.
   
### Usage

1. Start the server: npm run dev
2. Open your Api Testing Tools such as Postman, Thunder client and navigate to http://localhost:8000

### Endpoints

## POST /users 
  - Description: Register a new user.
  - Parameters:
      -> `first_name, last_name, username, email, password` (Body Parameter): The email of the user who want to register. Must be unique email and username.
  - Response: As shown in screenshot(screenshot/register.png).
    
## POST /userAuthentication
  - Description: User Login.
  - Parameters:
      -> `email, password` (Body Parameter): The email and password of the user who want to login. Must be a valid email and password.
  - Response: As shown in screenshot(screenshot/login.png).
    
## POST /posts
  - Description: Create a new post associated it with the user and any tags.
  - Requirement: Must set "token" that obtain during login in header before sending request in key name "Authorization" as shown in screenshot(screenshot/setToken.png).
  - Parameters:
      -> `user_id, title, content, tags` (Body Parameter): The user_id of the user who will create post. Must be a valid user_id.
  - Response: As shown in screenshot(screenshot/addPost.png).
      
## GET /posts
  - Description: Retrieve a list of all posts for any user. This should also return associated tags for each post.
  - Requirement: Must set "token" that obtain during login in header before sending request in key name "Authorization" as shown in screenshot(screenshot/setToken.png).
  - Parameters:
      -> `user_id` (Body Parameter): The ID of the user whose every post to be fetch. Must be a valid user_id.
  - Response: As shown in screenshot(screenshot/getAllPosts.png).
    
## GET /posts/:id
  - Description: Retrieve a single post by its ID.
  - Requirement: Must set "token" that obtain during login in header before sending request in key name "Authorization" as shown in screenshot(screenshot/setToken.png).
  - Parameters:
      -> `id` (URL Path Parameter): The ID of the post to be fetch. Must be a valid post ID.
  - Response: As shown in screenshot(screenshot/getPostById.png).
      
## PUT /posts/:id
  - Description: Update a post by its ID.
  - Requirement: Must set "token" that obtain during login in header before sending request in key name "Authorization" as shown in screenshot(screenshot/setToken.png).
  - Parameters:
      -> `id` (URL Path Parameter): The ID of the post to be updated. Must be a valid post ID.
      -> `title, content, tags` (Body Parameter).
  - Response: As shown in screenshot(screenshot/updatePost.png).
    
## DELETE /posts/:id
  - Description:  Delete a post by its ID.
  - Requirement: Must set "token" that obtain during login in header before sending request in key name "Authorization" as shown in screenshot(screenshot/setToken.png).
  - Parameters:
      -> `id` (URL Path Parameter): The ID of the post to be deleted. Must be a valid post ID.
  - Response: As shown in screenshot(screenshot/deletePost.png).
    
## GET /tags
  - Description: Retrieve a list of all tags (predefined tag list: e.g. Technology, Health and Wellness, Finance, Travel and Tourism, Food, Fashion, Sports, Fitness, History, etc).
  - Requirement: Must set "token" that obtain during login in header before sending request in key name "Authorization" as shown in screenshot(screenshot/setToken.png).
  - Parameters: None
  - Response: As shown in screenshot(screenshot/getTags.png).


### Credits

- Nishil Shah (Contributor)

  
