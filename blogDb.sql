CREATE DATABASE blog;
USE blog;

CREATE TABLE user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(25) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL,
    first_name VARCHAR(45) NOT NULL,
    last_name VARCHAR(45) NOT NULL
);

CREATE TABLE posts (
    post_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE tags (
    tag_id INT AUTO_INCREMENT PRIMARY KEY,
    tag_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE post_tags (
    post_tag_id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT,
    tag_id INT,
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(tag_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX idx_user_id ON posts (user_id);
CREATE INDEX idx_post_id ON post_tags (post_id);
CREATE INDEX idx_tag_id ON post_tags (tag_id);

INSERT INTO `blog`.`tags` (`tag_name`) VALUES ('Technology');
INSERT INTO `blog`.`tags` (`tag_name`) VALUES ('Health');
INSERT INTO `blog`.`tags` (`tag_name`) VALUES ('Wellness');
INSERT INTO `blog`.`tags` (`tag_name`) VALUES ('Finance');
INSERT INTO `blog`.`tags` (`tag_name`) VALUES ('Travel and Tourism');
INSERT INTO `blog`.`tags` (`tag_name`) VALUES ('Food');
INSERT INTO `blog`.`tags` (`tag_name`) VALUES ('Fashion');
INSERT INTO `blog`.`tags` (`tag_name`) VALUES ('Sports');
INSERT INTO `blog`.`tags` (`tag_name`) VALUES ('Fitness');
INSERT INTO `blog`.`tags` (`tag_name`) VALUES ('History');
INSERT INTO `blog`.`tags` (`tag_name`) VALUES ('Politics');